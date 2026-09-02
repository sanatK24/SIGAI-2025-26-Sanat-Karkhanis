import jsPDF from 'jspdf';
import QRCode from 'qrcode';
// For SHA256
async function sha256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Client-side PDF generation for browser download
export async function generateRegistrationPDFClient(
  registrationData: RegistrationData,
  registrationId: string
): Promise<void> {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Colors
    const accent: [number, number, number] = [59, 130, 246]; // Blue
    const white: [number, number, number] = [255, 255, 255];
    const gray: [number, number, number] = [200, 200, 200];
    const stubBg: [number, number, number] = [243, 244, 246]; // Light gray

  // Ticket dimensions (3 panels) - INCREASED SIZE
  const ticketWidth = 300;
  const ticketHeight = 140;
  const ticketX = (pageWidth - ticketWidth) / 2;
  const ticketY = (pageHeight - ticketHeight) / 2;
  const leftPanelWidth = 110;
  const centerPanelWidth = 90;
  const rightPanelWidth = 100;
  const leftPanelX = ticketX;
  const centerPanelX = ticketX + leftPanelWidth;
  const rightPanelX = ticketX + leftPanelWidth + centerPanelWidth;

    // Black background for entire page
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Left panel (info)
    doc.setFillColor(20, 20, 20);
    doc.roundedRect(leftPanelX, ticketY, leftPanelWidth, ticketHeight, 4, 4, 'F');

    // Center panel (event image)
    doc.setFillColor(30, 30, 30);
    doc.roundedRect(centerPanelX, ticketY, centerPanelWidth, ticketHeight, 4, 4, 'F');

    // Right panel (stub)
    doc.setFillColor(...stubBg);
    doc.roundedRect(rightPanelX, ticketY, rightPanelWidth, ticketHeight, 4, 4, 'F');

    // Accent lines
    doc.setFillColor(...accent);
    doc.rect(leftPanelX, ticketY, 4, ticketHeight, 'F');
    doc.rect(ticketX + ticketWidth - 4, ticketY, 4, ticketHeight, 'F');

    // Left panel content
    doc.setFontSize(16);
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
  doc.text(registrationData.eventTitle, leftPanelX + 10, ticketY + 24, { maxWidth: leftPanelWidth - 20 });

    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${registrationData.eventDate || ''}`, leftPanelX + 10, ticketY + 40);
  doc.text(`Time: ${registrationData.eventTime || ''}`, leftPanelX + 10, ticketY + 50);
  doc.text(`Location: ${registrationData.eventLocation || ''}`, leftPanelX + 10, ticketY + 60);

    doc.setFontSize(11);
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
  doc.text('Attendee:', leftPanelX + 10, ticketY + 80);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${registrationData.firstName} ${registrationData.lastName}`, leftPanelX + 10, ticketY + 92);
  doc.text(`Roll No: ${registrationData.rollNumber}`, leftPanelX + 10, ticketY + 104);
  doc.text(`Branch: ${registrationData.branch} | Year: ${registrationData.year} | Div: ${registrationData.division}`, leftPanelX + 10, ticketY + 116, { maxWidth: leftPanelWidth - 20 });

    // Center panel: event image
    if (registrationData.eventImage) {
      // Load image as base64 and draw
      const img = await loadImageAsBase64(registrationData.eventImage);
      doc.addImage(img, 'JPEG', centerPanelX + 8, ticketY + 14, centerPanelWidth - 16, ticketHeight - 28, undefined, 'FAST');
    } else {
      // Placeholder if no image
      doc.setFontSize(14);
      doc.setTextColor(...gray);
      doc.text('No Image', centerPanelX + centerPanelWidth / 2, ticketY + ticketHeight / 2, { align: 'center' });
    }


  // Right panel (stub) content
  // Right panel (stub) content - left aligned
  const rightPanelContentX = rightPanelX + 10;
  doc.setFontSize(12);
  doc.setTextColor(...accent);
  doc.setFont('helvetica', 'bold');
  doc.text('RAIT ACM SIGAI', rightPanelContentX, ticketY + 18, { align: 'left' });
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.text('REGISTRATION ID', rightPanelContentX, ticketY + 32, { align: 'left' });
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.text(registrationId, rightPanelContentX, ticketY + 42, { align: 'left' });

  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.text('TXN', rightPanelContentX, ticketY + 54, { align: 'left' });
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.text(registrationData.transactionId, rightPanelContentX, ticketY + 62, { align: 'left' });

  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.text('Fee', rightPanelContentX, ticketY + 74, { align: 'left' });
  doc.setFontSize(11);
  doc.setTextColor(...accent);
  doc.setFont('helvetica', 'bold');
  doc.text(`₹${registrationData.feeAmount}`, rightPanelContentX, ticketY + 82, { align: 'left' });

  // SHA256 QR code for attendance
  const hashInput = `${registrationId}|${registrationData.eventId || ''}|${registrationData.rollNumber || ''}`;
  const hash = await sha256(hashInput);
  const qrDataUrl = await QRCode.toDataURL(hash, { width: 80, margin: 1 });
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  // Move QR and label up by 12mm for better vertical balance
  doc.text('Attendance QR', rightPanelContentX, ticketY + 88, { align: 'left' });
  doc.addImage(qrDataUrl, 'PNG', rightPanelContentX, ticketY + 92, 40, 40);


  // SIGAI logo in top right corner of right panel
  let logoY = ticketY + 6;
  try {
    // Use PNG for transparency support in jsPDF
    const logoUrl = 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927077/sigai-logo-transparent_pe6wup.webp';
    const logoBase64 = await loadImageAsBase64(logoUrl);
    // Convert WEBP to PNG if needed
    let pngBase64 = logoBase64;
    if (logoBase64.startsWith('data:image/webp')) {
      // Convert to PNG using an offscreen canvas
      const img = new window.Image();
      img.src = logoBase64;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        pngBase64 = canvas.toDataURL('image/png');
      }
    }
    // Place logo in top right corner, with a small margin
    // Maintain aspect ratio: set width, compute height from image
    const logoWidth = 18;
    let logoHeight = 10;
    // Calculate height from image aspect ratio
    const tempImg = new window.Image();
    tempImg.src = pngBase64;
    await new Promise((resolve, reject) => {
      tempImg.onload = resolve;
      tempImg.onerror = reject;
    });
    if (tempImg.naturalWidth && tempImg.naturalHeight) {
      logoHeight = logoWidth * (tempImg.naturalHeight / tempImg.naturalWidth);
    }
    const logoX = rightPanelX + rightPanelWidth - logoWidth - 6;
    doc.addImage(pngBase64, 'PNG', logoX, logoY, logoWidth, logoHeight);
  } catch (e) {
    // Logo is optional, ignore errors
  }
  // For note placement below QR, keep logoY as before
  logoY = ticketY + 134;

  // Professional note for alternative attendance (adjacent to QR)
  doc.setFontSize(6.5);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'italic');
  // Place to the right of the QR code, vertically aligned with QR
  const noteX = rightPanelContentX + 42; // QR is at rightPanelContentX, width 40
  const noteY = ticketY + 92 + 6; // QR top + small margin
  doc.text(
    'If required, attendance may also be recorded manually at the venue.',
    noteX,
    noteY,
    { align: 'left', maxWidth: rightPanelWidth - (noteX - rightPanelX) - 4 }
  );

    // Download
    const cleanTitle = registrationData.eventTitle.replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`SIGAI_Ticket_${cleanTitle}_${registrationId}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

// Helper to load image as base64
async function loadImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject('Failed to load image');
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export interface RegistrationData {
  eventId: string | number;
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventImage?: string; // NEW: event image URL for center panel
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  branch: string;
  year: string;
  division: string;
  isAcmMember: boolean;
  membershipId: string | null;
  transactionId: string;
  feeAmount: number;
  registrationDate: string;
}

// All server-side PDF code removed. Only client-side function and types remain above.
