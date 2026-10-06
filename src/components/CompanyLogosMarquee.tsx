import React from 'react';
import {
  TcsLogo,
  InfosysLogo,
  AccentureLogo,
  WiproLogo,
  DeloitteLogo,
  CognizantLogo,
  HclTechLogo,
  CapgeminiLogo,
  AmazonLogo,
  MicrosoftLogo,
  IbmLogo,
} from './CompanyLogos';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export interface CompanyShowcaseItem {
  id: string;
  name: string;
  shortCode: string;
  role: string;
  ctc: string;
  readiness: number;
  logo: React.ReactNode;
}

export const COMPANY_SHOWCASE_LIST: CompanyShowcaseItem[] = [
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    shortCode: 'TCS',
    role: 'Ninja & Digital Developer',
    ctc: '₹3.36 - ₹7.2 LPA',
    readiness: 85,
    logo: <TcsLogo className="h-8 w-auto" />,
  },
  {
    id: 'infosys',
    name: 'Infosys',
    shortCode: 'INFY',
    role: 'Specialist Programmer (SP) & DSE',
    ctc: '₹6.5 - ₹9.5 LPA',
    readiness: 82,
    logo: <InfosysLogo className="h-8 w-auto" />,
  },
  {
    id: 'accenture',
    name: 'Accenture',
    shortCode: 'ACN',
    role: 'Advanced ASE & Packaged App',
    ctc: '₹4.5 - ₹6.5 LPA',
    readiness: 88,
    logo: <AccentureLogo className="h-7 w-auto" />,
  },
  {
    id: 'wipro',
    name: 'Wipro',
    shortCode: 'WIPRO',
    role: 'Turbo & Elite National Talent',
    ctc: '₹3.5 - ₹6.5 LPA',
    readiness: 80,
    logo: <WiproLogo className="h-7 w-auto" />,
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    shortCode: 'DELOITTE',
    role: 'Analyst & Consultant Trainee',
    ctc: '₹7.6 - ₹11.5 LPA',
    readiness: 78,
    logo: <DeloitteLogo className="h-7 w-auto" />,
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    shortCode: 'CTS',
    role: 'GenC Next & Elevate Engineer',
    ctc: '₹4.0 - ₹6.75 LPA',
    readiness: 84,
    logo: <CognizantLogo className="h-7 w-auto" />,
  },
  {
    id: 'hcltech',
    name: 'HCLTech',
    shortCode: 'HCL',
    role: 'Graduate Engineer Trainee',
    ctc: '₹4.25 - ₹6.5 LPA',
    readiness: 74,
    logo: <HclTechLogo className="h-7 w-auto" />,
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    shortCode: 'CAPGEMINI',
    role: 'Analyst & Senior Analyst',
    ctc: '₹4.25 - ₹7.5 LPA',
    readiness: 76,
    logo: <CapgeminiLogo className="h-7 w-auto" />,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    shortCode: 'AMZN',
    role: 'Software Development Engineer (SDE)',
    ctc: '₹18.0 - ₹28.0 LPA',
    readiness: 70,
    logo: <AmazonLogo className="h-7 w-auto" />,
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    shortCode: 'MSFT',
    role: 'Software Engineer Trainee',
    ctc: '₹22.0 - ₹44.0 LPA',
    readiness: 68,
    logo: <MicrosoftLogo className="h-7 w-auto" />,
  },
  {
    id: 'ibm',
    name: 'IBM',
    shortCode: 'IBM',
    role: 'Associate System Engineer',
    ctc: '₹4.5 - ₹7.0 LPA',
    readiness: 75,
    logo: <IbmLogo className="h-7 w-auto" />,
  },
];

interface CompanyLogosMarqueeProps {
  onSelectCompany: (companyId: string) => void;
}

export const CompanyLogosMarquee: React.FC<CompanyLogosMarqueeProps> = ({
  onSelectCompany,
}) => {
  // Split into two balanced sets for the two scrolling rows
  const row1Companies = [
    COMPANY_SHOWCASE_LIST[0], // TCS
    COMPANY_SHOWCASE_LIST[1], // Infosys
    COMPANY_SHOWCASE_LIST[2], // Accenture
    COMPANY_SHOWCASE_LIST[3], // Wipro
    COMPANY_SHOWCASE_LIST[8], // Amazon
    COMPANY_SHOWCASE_LIST[9], // Microsoft
  ];

  const row2Companies = [
    COMPANY_SHOWCASE_LIST[4], // Deloitte
    COMPANY_SHOWCASE_LIST[5], // Cognizant
    COMPANY_SHOWCASE_LIST[6], // HCLTech
    COMPANY_SHOWCASE_LIST[7], // Capgemini
    COMPANY_SHOWCASE_LIST[10], // IBM
    COMPANY_SHOWCASE_LIST[0], // TCS
  ];

  // Render a single company logo card with hover effects
  const renderCard = (company: CompanyShowcaseItem, idx: number, prefix: string) => (
    <button
      key={`${prefix}-${company.id}-${idx}`}
      type="button"
      onClick={() => onSelectCompany(company.id)}
      className="group relative shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-indigo-900/60 bg-[#0e1732] p-5 text-left shadow-lg transition-all duration-300 hover:scale-[1.04] hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer select-none"
    >
      {/* Top row: Official vector logo and readiness target badge */}
      <div className="flex items-center justify-between">
        <div className="flex h-11 items-center justify-start px-3 py-1 rounded-xl bg-white shadow-xs">
          {company.logo}
        </div>
        <span className="rounded-full bg-blue-950/80 border border-blue-500/40 px-2.5 py-0.5 text-[11px] font-extrabold text-blue-300 shadow-xs">
          {company.readiness}% Target
        </span>
      </div>

      {/* Middle row: Role & CTC package */}
      <div className="mt-3.5 space-y-1">
        <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
          {company.role}
        </p>
        <p className="text-xs font-black text-blue-400">
          {company.ctc}
        </p>
      </div>

      {/* Bottom row: Interactive "Prepare Now →" callout */}
      <div className="mt-4 pt-3 border-t border-indigo-900/60 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-300 transition-colors">
          Campus Pattern & Past Qs
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-400 group-hover:text-blue-200 group-hover:translate-x-1 transition-all">
          <span>Prepare Now</span>
          <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
        </span>
      </div>

      {/* Subtle royal blue highlight border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-blue-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_18px_rgba(37,99,235,0.4)]" />
    </button>
  );

  return (
    <div className="relative w-full overflow-hidden py-4 group">
      {/* Left and Right Fade Gradient Masks for Smooth Infinite Look */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-28 bg-gradient-to-r from-[#0c1136] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-28 bg-gradient-to-l from-[#0c1136] to-transparent" />

      {/* Row 1: Leftward Smooth Auto-Scrolling Marquee */}
      <div className="flex gap-5 py-3 overflow-hidden">
        <div className="flex gap-5 animate-marquee-left group-hover:[animation-play-state:paused]">
          {row1Companies.map((c, i) => renderCard(c, i, 'r1-a'))}
          {row1Companies.map((c, i) => renderCard(c, i, 'r1-b'))}
          {row1Companies.map((c, i) => renderCard(c, i, 'r1-c'))}
        </div>
      </div>

      {/* Row 2: Rightward Smooth Auto-Scrolling Marquee (Opposite Direction) */}
      <div className="flex gap-5 py-3 overflow-hidden">
        <div className="flex gap-5 animate-marquee-right group-hover:[animation-play-state:paused]">
          {row2Companies.map((c, i) => renderCard(c, i, 'r2-a'))}
          {row2Companies.map((c, i) => renderCard(c, i, 'r2-b'))}
          {row2Companies.map((c, i) => renderCard(c, i, 'r2-c'))}
        </div>
      </div>

      {/* Inline Keyframes styling for smooth continuous 60fps marquee */}
      <style>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 38s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 38s linear infinite;
        }
      `}</style>
    </div>
  );
};
