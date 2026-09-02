"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './header';
import MobileFooter from './mobile-footer';
import FooterSection from './sections/footer-section';
import ScrollToTop from './ScrollToTop';

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  // Show header but hide footer on latest-issue page
  const isLatestIssuePage = pathname === "/latest-issue" || pathname === "/latest-issue/";
  const hideFooter = isLatestIssuePage;

  return (
    <div className={`min-h-screen flex flex-col ${isHomePage ? 'relative' : 'relative'}`}>
      <Header />
      <main className={`flex-1 ${isLatestIssuePage ? 'p-0' : 'pb-16 md:pb-0'}`}>
        {children}
      </main>
      {/* Always show FooterSection except on /latest-issue */}
      {!hideFooter && <>
        <MobileFooter />
        <FooterSection />
      </>}
      <ScrollToTop />
    </div>
  );
};

export default LayoutWrapper;
