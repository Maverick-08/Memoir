import { createRoot } from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';


const root = createRoot(document.getElementById("root")!);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
