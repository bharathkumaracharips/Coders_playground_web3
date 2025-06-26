import { AuthUI } from "../ui/login-ui";
import { MetaMaskLogin } from "./metamask-login-comp";

const LoginUI = () => {
  return (
    <div>
      <AuthUI />
      <div className="my-4">
        <MetaMaskLogin />
      </div>
    </div>
  );
};

export { LoginUI };
