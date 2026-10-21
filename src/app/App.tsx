import { ThemeProvider } from "@/features/theme";
import { BrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
