import React, { useState } from "react";
import { coders_playground_web3_backend } from '../../../declarations/coders_playground_web3_backend';
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface MetaMaskLoginProps {
  onWalletConnected?: (walletId: string) => void;
}

export const MetaMaskLogin: React.FC<MetaMaskLoginProps> = ({ onWalletConnected }) => {
  
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        setError(null);
        if (onWalletConnected) {
          onWalletConnected(accounts[0]);
        }
        const result = await coders_playground_web3_backend.login(accounts[0]);
        if (result.success) {
          navigate(`/dashboard-after/${accounts[0]}`);
        } else {
          alert(result.message);
        }
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