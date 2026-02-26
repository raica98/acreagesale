import React from 'react';
import { Link } from 'react-router-dom';

export function AcreageSaleLogo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rounded square background with blue gradient */}
        <rect width="60" height="60" rx="14" fill="url(#bgGradient)"/>

        {/* Green ground/land area */}
        <path
          d="M10 35 Q15 32 20 34 Q25 36 30 33 Q35 30 40 33 Q45 36 50 34 L50 50 L10 50 Z"
          fill="#10B981"
        />

        {/* Location marker pin */}
        <circle cx="30" cy="15" r="3" fill="white"/>

        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA"/>
            <stop offset="1" stopColor="#2563EB"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="text-2xl font-bold text-gray-900">
        Acreage<span className="text-blue-600"> Sale</span>
      </div>
    </Link>
  );
}
