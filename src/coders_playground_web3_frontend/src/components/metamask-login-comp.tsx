import React, { useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const MetaMaskLogin: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        setError(null);
      } catch (err: any) {
        setError(err.message || "User rejected the request");
      }
    } else {
      setError("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {account ? (
        <div>
          <span className="font-bold">Connected:</span> {account}
        </div>
      ) : (
        <button
          onClick={connectMetaMask}
          className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
        >
          Connect with MetaMask
        </button>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};