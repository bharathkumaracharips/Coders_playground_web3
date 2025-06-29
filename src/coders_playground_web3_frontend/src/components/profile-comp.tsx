import React from "react";
import ProgressCalendarDemo from "./progress-calendar-comp";

interface ProfileCompProps {
  walletId?: string;
}

const ProfileComp: React.FC<ProfileCompProps> = ({ walletId }) => {
  return (
    <div className="p-6">
      {walletId && (
        <div className="mb-4">
          <div className="text-sm text-gray-500">Wallet Address</div>
          <div className="font-mono text-base text-gray-800 break-all bg-gray-100 rounded px-3 py-2 mt-1">
            {walletId}
          </div>
        </div>
      )}
      <ProgressCalendarDemo />
    </div>
  );
};

export default ProfileComp;