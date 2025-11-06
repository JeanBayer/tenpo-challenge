import { useAuthInitializer } from "@processes/auth/session-init/model/useAuthInitializer";
import { WithProviders } from "./providers";
import "./styles/index.css";

const App = () => {
  useAuthInitializer();
  return <></>;
};

export const AppWithProviders = () => {
  return (
    <WithProviders>
      <App />
    </WithProviders>
  );
};
