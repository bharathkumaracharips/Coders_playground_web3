import React, { useState } from "react";
import { calendar as Calendar } from "./progress-calendar-comp";
import { Copy, Check, User as UserIcon, Settings } from "lucide-react";

interface ProfileCompProps {
  walletId?: string;
}

const CYCLES = [
  { label: "Easy", value: 5, total: 25, color: ["#10b981", "#a7f3d0"] },
  { label: "Medium", value: 3, total: 15, color: ["#3b82f6", "#a5b4fc"] },
  { label: "Hard", value: 1, total: 10, color: ["#f59e0b", "#fde68a"] },
  { label: "Very Hard", value: 0, total: 5, color: ["#ef4444", "#fecaca"] },
];

// Avatar, Wallet, and Settings
const ProfileHeader: React.FC<{ walletId?: string }> = ({ walletId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (walletId) {
      await navigator.clipboard.writeText(walletId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="flex flex-col items-center relative mb-6">
      <div className="absolute top-0 left-0">
        <Settings className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
      </div>
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2 mt-2 shadow">
        <UserIcon className="w-12 h-12 text-gray-500" />
      </div>
      {walletId && (
        <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-1 font-mono text-xs text-gray-800 mb-1 shadow">
          <span className="truncate max-w-[160px]" title={walletId}>{walletId}</span>
          <button onClick={handleCopy} className="ml-1 p-1 hover:bg-gray-200 rounded transition">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
          </button>
          {copied && <span className="text-green-500 text-xs ml-1">Copied!</span>}
        </div>
      )}
    </div>
  );
};

// Progress Circles
const ProgressStats: React.FC = () => (
  <div className="flex flex-wrap gap-8 justify-center mb-8">
    {CYCLES.map((cycle) => {
      const percent = (cycle.value / cycle.total) * 100;
      return (
        <div className="flex flex-col items-center" key={cycle.label}>
          <svg width={80} height={80}>
            <defs>
              <linearGradient id={`grad-${cycle.label}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={cycle.color[0]} />
                <stop offset="100%" stopColor={cycle.color[1]} />
              </linearGradient>
            </defs>
            <circle cx={40} cy={40} r={36} stroke="#e5e7eb" strokeWidth={6} fill="none" />
            <circle
              cx={40}
              cy={40}
              r={36}
              stroke={`url(#grad-${cycle.label})`}
              strokeWidth={6}
              fill="none"
              strokeDasharray={2 * Math.PI * 36}
              strokeDashoffset={2 * Math.PI * 36 * (1 - percent / 100)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.6s' }}
            />
          </svg>
          <span className="mt-2 text-sm font-medium">{cycle.label}</span>
          <span className="text-xs text-gray-500">Solved {cycle.value}/{cycle.total} {cycle.label} problems</span>
        </div>
      );
    })}
  </div>
);

// Calendar Section
const ProfileCalendar: React.FC = () => (
  <div className="rounded-xl bg-black p-6 shadow-lg">
    <Calendar />
  </div>
);

const ProfileComp: React.FC<ProfileCompProps> = ({ walletId }) => (
  <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
    <ProfileHeader walletId={walletId} />
    <ProgressStats />
    <ProfileCalendar />
  </div>
);

export default ProfileComp;