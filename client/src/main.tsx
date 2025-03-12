import { createRoot } from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = createRoot(document.getElementById("root")!);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
