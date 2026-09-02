import React from 'react';

// Static country code and flag data (SVG or PNG URLs)
const countryCodes = [
  { code: 'IN', dial: '+91', name: 'India', flag: '/img/flags/in.svg' },
  { code: 'US', dial: '+1', name: 'United States', flag: '/img/flags/us.svg' },
  { code: 'GB', dial: '+44', name: 'United Kingdom', flag: '/img/flags/gb.svg' },
  { code: 'CA', dial: '+1', name: 'Canada', flag: '/img/flags/ca.svg' },
  { code: 'AU', dial: '+61', name: 'Australia', flag: '/img/flags/au.svg' },
  // ...add more countries as needed
];

export default function CountryCodeSelect({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <select
      name="countryCode"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white backdrop-blur-sm"
      required
    >
      <option value="" className="bg-gray-900">Select</option>
      {countryCodes.map(({ code, dial }) => {
        // Emoji flag from country code
        const flagEmoji = code.length === 2
          ? code.toUpperCase().replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)))
          : '';
        return (
          <option key={code} value={dial} className="bg-gray-900">
            {`${flagEmoji}${dial} (${code})`}
          </option>
        );
      })}
    </select>
  );
}
