import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Suspense } from "react";
import { SiteRoutes } from "./router";

export function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-screen bg-[var(--bg-page)] opacity-0 transition-opacity duration-150" />
          }
        >
          <SiteRoutes />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
