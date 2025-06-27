import { useState, useEffect } from "react";
import { AuthUI } from "../ui/login-ui";
import { MetaMaskLogin } from "./metamask-login-comp";
import { useNavigate } from "react-router-dom";

const LoginUI = () => {
  const [walletId, setWalletId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (walletId) {
      navigate(`/dashboard-after/${walletId}`);
    }
  }, [walletId, navigate]);

  return (
    <div>
      <AuthUI />
      <div className="my-4">
        <MetaMaskLogin onWalletConnected={setWalletId} />
      </div>
    </div>
  );
};

export { LoginUI };
