import React from 'react';

interface SeminaryLogoProps {
  variant?: 'primary' | 'crest' | 'simple' | 'full';
  className?: string;
}

export default function SeminaryLogo({ variant = 'primary', className = 'w-12 h-12' }: SeminaryLogoProps) {
  // 1. CREST VARIANT: Blue Circular Crest with Silver Trim, Pointed Gold Starburst, Red Tilted Cross, and Golden Crown
  if (variant === 'crest') {
    return (
      <svg
        id="seminary-crest-seal"
        className={className}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer White / Silver Trim Ring */}
        <circle cx="100" cy="100" r="97" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="92" fill="#1351A5" stroke="#94A3B8" strokeWidth="5" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        
        {/* 16 Pointed Gold Starburst / Sunburst (Filled triangles) */}
        <g id="crest-sunburst">
          {Array.from({ length: 16 }).map((_, i) => {
            const isLong = i % 2 === 0;
            const peakY = isLong ? 24 : 40;
            const baseW = isLong ? 7 : 4.5;
            return (
              <polygon
                key={i}
                points={`${100 - baseW},100 100,${peakY} ${100 + baseW},100`}
                fill="#EAB308"
                stroke="#CA8A04"
                strokeWidth="0.5"
                transform={`rotate(${(i * 360) / 16} 100 100)`}
              />
            );
          })}
        </g>

        {/* Red Latin Cross, Tilted Clockwise by 30 Degrees with thick White Border and Navy Outline */}
        <g id="crest-cross" transform="rotate(30 100 100)">
          {/* Navy outer boundary */}
          <path 
            d="M 91,15 L 109,15 L 109,55 L 175,55 L 175,73 L 109,73 L 109,185 L 91,185 L 91,73 L 25,73 L 25,55 L 91,55 Z" 
            fill="#0F172A" 
          />
          {/* White outline */}
          <path 
            d="M 93,17 L 107,17 L 107,57 L 173,57 L 173,71 L 107,71 L 107,183 L 93,183 L 93,71 L 27,71 L 27,57 L 93,57 Z" 
            fill="#FFFFFF" 
          />
          {/* Red fill */}
          <path 
            d="M 95,19 L 105,19 L 105,59 L 171,59 L 171,69 L 105,69 L 105,181 L 95,181 L 95,69 L 29,69 L 29,59 L 95,59 Z" 
            fill="#EF4444" 
          />
        </g>
        
        {/* Golden Crown with 5 Points, topped with White Pearls and lined with Red Diamond Jewels */}
        <g id="crest-crown">
          {/* 5 Points / Peaks of the Crown */}
          <path 
            d="M 50,130 L 58,92 L 78,114 L 100,80 L 122,114 L 142,92 L 150,130 Z" 
            fill="#FBBF24" 
            stroke="#B45309" 
            strokeWidth="1.5" 
          />
          
          {/* Headband base curve */}
          <path 
            d="M 50,140 Q 100,152 150,140 L 150,130 Q 100,142 50,130 Z" 
            fill="#EAB308" 
            stroke="#CA8A04" 
            strokeWidth="1.5" 
          />
          {/* Inner silver/white headband strip */}
          <path 
            d="M 52,132 Q 100,144 148,132 L 148,136 Q 100,148 52,136 Z" 
            fill="#FFFFFF" 
            opacity="0.85" 
          />

          {/* Pearls on top of each Peak */}
          <circle cx="58" cy="92" r="3.5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />
          <circle cx="78" cy="114" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />
          <circle cx="100" cy="80" r="4.5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />
          <circle cx="122" cy="114" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />
          <circle cx="142" cy="92" r="3.5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

          {/* Red Diamond Jewels and White Pearls on Headband */}
          <polygon points="75,131 78,134 75,137 72,134" fill="#DC2626" />
          <polygon points="100,134 103,137 100,140 97,137" fill="#DC2626" />
          <polygon points="125,131 128,134 125,137 122,134" fill="#DC2626" />
          <circle cx="87" cy="135" r="1.75" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="0.5" />
          <circle cx="113" cy="135" r="1.75" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="0.5" />
        </g>
      </svg>
    );
  }

  // 2. SIMPLE VARIANT: Clean Outline Logo
  if (variant === 'simple') {
    return (
      <svg
        id="seminary-logo-simple"
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" />
        <path d="M50,15 L50,85 M25,40 L75,40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M30,70 Q50,85 70,70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. PRIMARY SEAL EMBLEM: Gold Dual-Circles, Silhouette of Africa, Beveled Gold 3D-Like Cross, Open gold-line Bible, and Connecting Strings
  const renderPrimarySeal = () => (
    <svg
      id="seminary-seal-primary"
      className="w-full h-full"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dual Gold Circles */}
      <circle cx="100" cy="100" r="92" stroke="#EAB308" strokeWidth="1.25" />
      <circle cx="100" cy="100" r="88" stroke="#FBBF24" strokeWidth="0.5" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="84" stroke="#EAB308" strokeWidth="1" />

      {/* Silhouette Map of Africa in the background */}
      <path
        d="M75,54 C80,50 90,48 94,54 C100,60 112,62 118,65 C124,68 128,78 124,84 C120,90 114,94 112,102 C110,110 104,118 100,126 C96,134 92,142 88,145 C86,140 85,135 84,130 C82,122 80,118 78,114 C76,110 74,106 73,102 C72,98 68,96 66,92 C64,88 62,84 62,80 C62,76 66,72 68,68 C70,64 71,60 75,54 Z"
        fill="#142F24"
        opacity="0.9"
        stroke="#2D5B46"
        strokeWidth="0.75"
      />

      {/* Beveled Tilted Gold 3D-Like Cross */}
      <g transform="translate(100, 74) rotate(-22) scale(0.9)">
        {/* Back dark gold shadow */}
        <rect x="-6.5" y="-36.5" width="13" height="63" rx="1.5" fill="#78350F" />
        <rect x="-24.5" y="-19.5" width="49" height="13" rx="1.5" fill="#78350F" />

        {/* Main Gold Plate */}
        <rect x="-5" y="-35" width="10" height="60" rx="1" fill="#FBBF24" />
        <rect x="-23" y="-18" width="46" height="10" rx="1" fill="#FBBF24" />

        {/* Inner Light Highlight */}
        <rect x="-3.5" y="-33.5" width="7" height="57" rx="0.5" fill="#FDE047" />
        <rect x="-21.5" y="-16.5" width="43" height="7" rx="0.5" fill="#FDE047" />

        {/* Center line dividing the bevel */}
        <line x1="0" y1="-33.5" x2="0" y2="23.5" stroke="#EAB308" strokeWidth="0.75" />
        <line x1="-21.5" y1="-13" x2="21.5" y2="-13" stroke="#EAB308" strokeWidth="0.75" />
      </g>

      {/* Wireframe Gold Open Bible at bottom */}
      <g transform="translate(100, 138) scale(0.95)">
        {/* Left page */}
        <path
          d="M 0,10 Q -18,2 -36,6 L -36,-10 Q -18,-14 0,-6 Z"
          fill="#111827"
          stroke="#FBBF24"
          strokeWidth="1"
        />
        {/* Right page */}
        <path
          d="M 0,10 Q 18,2 36,6 L 36,-10 Q 18,-14 0,-6 Z"
          fill="#111827"
          stroke="#FBBF24"
          strokeWidth="1"
        />
        {/* Open page lines (gold) */}
        <path d="M -30,-5 Q -18,-9 -6,-2" stroke="#EAB308" strokeWidth="0.5" opacity="0.6" />
        <path d="M -30,0 Q -18,-4 -6,3" stroke="#EAB308" strokeWidth="0.5" opacity="0.6" />
        <path d="M -30,5 Q -18,1 -6,8" stroke="#EAB308" strokeWidth="0.5" opacity="0.6" />
        
        <path d="M 30,-5 Q 18,-9 6,-2" stroke="#EAB308" strokeWidth="0.5" opacity="0.6" />
        <path d="M 30,0 Q 18,-4 6,3" stroke="#EAB308" strokeWidth="0.5" opacity="0.6" />
        <path d="M 30,5 Q 18,1 6,8" stroke="#EAB308" strokeWidth="0.5" opacity="0.6" />

        {/* Center binding line */}
        <line x1="0" y1="-6" x2="0" y2="10" stroke="#FBBF24" strokeWidth="1.5" />
      </g>

      {/* Connecting Strings from Cross down to the Open Bible */}
      <line x1="100" y1="74" x2="66" y2="134" stroke="#FBBF24" strokeWidth="0.5" opacity="0.7" />
      <line x1="100" y1="74" x2="86" y2="135" stroke="#FBBF24" strokeWidth="0.5" opacity="0.7" />
      <line x1="100" y1="74" x2="114" y2="135" stroke="#FBBF24" strokeWidth="0.5" opacity="0.7" />
      <line x1="100" y1="74" x2="134" y2="134" stroke="#FBBF24" strokeWidth="0.5" opacity="0.7" />
    </svg>
  );

  // If "primary" is selected, return the seal with the beautiful purple-maroon background gradient
  if (variant === 'primary') {
    return (
      <div className={`relative flex items-center justify-center p-1 rounded-full bg-gradient-to-tr from-[#0F0C20] via-[#2F1132] to-[#400B1A] border border-[#521c2e] shadow-lg ${className}`}>
        {renderPrimarySeal()}
      </div>
    );
  }

  // 4. FULL BRANDING VARIANT: The full square banner with deep purple/red gradient, seal emblem, and beautiful serif title below
  return (
    <div className="w-full flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-gradient-to-tr from-[#0F0C20] via-[#2F1132] to-[#400B1A] border border-[#521c2e] shadow-xl text-center space-y-5">
      {/* Centered Circular Seal Emblem */}
      <div className="w-28 h-28 sm:w-32 sm:h-32">
        {renderPrimarySeal()}
      </div>

      {/* Text Group with elegant display serif typography matching the logo banner */}
      <div className="space-y-1.5 select-none">
        <h2 className="text-xl sm:text-2xl font-serif font-semibold tracking-[0.22em] text-white leading-none">
          LIVING WATERS
        </h2>
        <p className="text-[10px] sm:text-xs font-serif tracking-[0.3em] text-[#EAB308] font-medium leading-none">
          THEOLOGICAL SEMINARY
        </p>
      </div>
    </div>
  );
}

