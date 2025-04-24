// Default Import

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "/images/logo.png";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Utility

import ScrollToTop from "./utility/ScrollToTop";
import CustomCursor from "./utility/CustomCursor";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";

// Default Pages

import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/Landing/page";

// Loading Screen Animation

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex justify-center items-center bg-white z-50"
    >
      <img src={Logo} alt="Loading..." className="w-56 h-56 animate-pulse" />
    </motion.div>
  );
};

function App() {

  const [loading, setLoading] = useState(true);

  return (

    // Providers, Router, Scroll to Top Function and Button, and Custom Cursor

    <BrowserRouter>
      <ScrollToTopFunction />
      <ScrollToTop />
      <CustomCursor />

      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <AnimatePresence mode="wait">

        {!loading && (

          <Routes>

            {/* Default Pages */}

            {/* <Route path="*" element={<NotFoundPage />} /> */}

            <Route path="/" element={<Layout />}>
              
                <Route index element={<LandingPage/>} />

            </Route>

          </Routes>

        )}

      </AnimatePresence>
      <Toaster position="top-center" />
    </BrowserRouter>

  );
}

export default App;
