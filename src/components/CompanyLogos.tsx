import React from 'react';

interface CompanyLogoProps {
  className?: string;
}

// 1. Tata Consultancy Services (TCS) Official Branding
export const TcsLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 170 42" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TCS Logo">
    {/* Tata Iconic Oval Monogram */}
    <g transform="translate(4, 3)">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#003B73" strokeWidth="2.5" fill="#003B73" fillOpacity="0.04" />
      <path d="M9 13.5H27M18 13.5V25" stroke="#003B73" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M12.5 17.5L18 25L23.5 17.5" stroke="#003B73" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    {/* TCS Wordmark */}
    <text x="46" y="27" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="23" fill="#0F172A" letterSpacing="1.2">
      TCS
    </text>
    {/* Tata Consultancy Services sub-brand */}
    <text x="47" y="36" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="700" fontSize="7" fill="#003B73" letterSpacing="0.8">
      TATA CONSULTANCY SERVICES
    </text>
  </svg>
);

// 2. Infosys Official Wordmark in Infosys Blue #007CC3
export const InfosysLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 145 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Infosys Logo">
    <text x="4" y="27" fontFamily="'Georgia', 'Times New Roman', serif" fontWeight="700" fontSize="25" fill="#007CC3" letterSpacing="-0.5">
      Infosys
    </text>
    <text x="7" y="37" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="600" fontSize="6.5" fill="#64748B" letterSpacing="0.6">
      Navigate your next
    </text>
  </svg>
);

// 3. Accenture Official Logo with Signature Purple Caret '>'
export const AccentureLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 155 42" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Accenture Logo">
    {/* Wordmark lowercase */}
    <text x="4" y="28" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="22" fill="#111827" letterSpacing="-0.6">
      accenture
    </text>
    {/* Iconic Purple Greater-than caret above 't' (position x ~ 74) */}
    <path d="M72 10L78 14.5L72 19" stroke="#A100FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 4. Wipro Official Modern Dots & Lowercase Wordmark
export const WiproLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 150 42" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Wipro Logo">
    {/* Circular multi-colored dots ring */}
    <g transform="translate(6, 7)">
      <circle cx="14" cy="5" r="3.2" fill="#E11D48" />
      <circle cx="23" cy="14" r="3.2" fill="#3B82F6" />
      <circle cx="14" cy="23" r="3.2" fill="#10B981" />
      <circle cx="5" cy="14" r="3.2" fill="#F59E0B" />
      <circle cx="20" cy="8" r="2.2" fill="#8B5CF6" />
      <circle cx="20" cy="20" r="2.2" fill="#06B6D4" />
      <circle cx="8" cy="20" r="2.2" fill="#84CC16" />
      <circle cx="8" cy="8" r="2.2" fill="#EC4899" />
    </g>
    <text x="42" y="28" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="22" fill="#111827" letterSpacing="-0.4">
      wipro
    </text>
  </svg>
);

// 5. Deloitte Official Bold Typography with Signature Lime Green Dot '.'
export const DeloitteLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 145 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Deloitte Logo">
    <text x="4" y="27" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="23" fill="#111827" letterSpacing="-0.8">
      Deloitte
    </text>
    {/* Signature Green Dot */}
    <circle cx="98" cy="25.5" r="3.6" fill="#86BC25" />
  </svg>
);

// 6. Cognizant Official Brand with Curved Blue 'C' Emblem
export const CognizantLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 165 42" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cognizant Logo">
    {/* Blue Ribbon 'C' Monogram */}
    <g transform="translate(4, 8)">
      <path
        d="M20 5C13 5 7 10 7 16C7 22 13 27 20 27C23 27 25 26 26.5 24.5"
        stroke="#0033A0"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="5" r="2" fill="#00D2D2" />
      <circle cx="26.5" cy="24.5" r="2" fill="#0033A0" />
    </g>
    <text x="38" y="28" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="20" fill="#0A192F" letterSpacing="-0.3">
      Cognizant
    </text>
  </svg>
);

// 7. HCLTech Official Brand with Distinctive Geometric Wordmark
export const HclTechLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 155 42" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="HCLTech Logo">
    <g transform="translate(4, 9)">
      <text x="0" y="20" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="24" fill="#20113B" letterSpacing="-0.8">
        HCL
      </text>
      <text x="56" y="20" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="23" fill="#00BCD4" letterSpacing="-0.3">
        Tech
      </text>
      <circle cx="114" cy="18" r="2.8" fill="#7C3AED" />
    </g>
  </svg>
);

// 8. Capgemini Official Brand with Iconic Ace of Spades Symbol
export const CapgeminiLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 170 42" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Capgemini Logo">
    {/* Capgemini Ace of Spades Emblem */}
    <g transform="translate(6, 6)">
      <path
        d="M14 4C11 9 4 14 4 19C4 23 7 26 11 26C13 26 14 25 14 25C14 25 15 26 17 26C21 26 24 23 24 19C24 14 17 9 14 4Z"
        fill="#0070AD"
      />
      <path d="M12 24L9 28H19L16 24H12Z" fill="#0070AD" />
    </g>
    <text x="36" y="28" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="20" fill="#002D54" letterSpacing="-0.3">
      Capgemini
    </text>
  </svg>
);

// Additional marquee recruiters
export const AmazonLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 135 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Amazon Logo">
    <text x="4" y="24" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="21" fill="#111827" letterSpacing="-0.4">
      amazon
    </text>
    <path d="M12 28C32 35 60 34 78 28" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M74 25L80 28.5L76 32" fill="#FF9900" />
  </svg>
);

export const MicrosoftLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 155 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft Logo">
    <g transform="translate(4, 11)">
      <rect x="0" y="0" width="8.5" height="8.5" fill="#F25022" />
      <rect x="10.5" y="0" width="8.5" height="8.5" fill="#7FBA00" />
      <rect x="0" y="10.5" width="8.5" height="8.5" fill="#00A4EF" />
      <rect x="10.5" y="10.5" width="8.5" height="8.5" fill="#FFB900" />
    </g>
    <text x="32" y="26" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="700" fontSize="19" fill="#5E5E5E" letterSpacing="-0.2">
      Microsoft
    </text>
  </svg>
);

export const IbmLogo: React.FC<CompanyLogoProps> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 110 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="IBM Logo">
    <text x="4" y="27" fontFamily="'Courier New', monospace" fontWeight="900" fontSize="26" fill="#054ADA" letterSpacing="4">
      IBM
    </text>
  </svg>
);
