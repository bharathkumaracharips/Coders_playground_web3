import { useState, useEffect } from "react";
import Web3LoginScreen, { ModalProvider } from "../ui/login-ui";
// import { MetaMaskLogin } from "./metamask-login-comp";
import { useNavigate } from "react-router-dom";

const LoginUI = () => {
  // const [walletId, setWalletId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleWalletConnected = (walletId: string) => {
    navigate(`/dashboard-after/${walletId}`);
  };

  return (
    <div>
      <ModalProvider>
        <Web3LoginScreen onWalletConnected={handleWalletConnected} />
      </ModalProvider>
    </div>
  );
};

export { LoginUI };
