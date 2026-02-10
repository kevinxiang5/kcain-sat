"use client";

import { useState } from "react";
import { Calculator as CalcIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Calculator() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-sat-primary to-sat-crimson text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Open Calculator"
      >
        <CalcIcon className="w-7 h-7" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-4xl md:h-[80vh] z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-sat-primary/10 to-sat-crimson/10">
                <h3 className="font-display font-bold text-lg">Desmos Graphing Calculator</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl hover:bg-sat-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <iframe
                  src="https://www.desmos.com/calculator?embed"
                  className="w-full h-full border-0"
                  title="Desmos Calculator"
                />
              </div>
              <p className="text-xs text-sat-gray-500 p-2 text-center bg-sat-gray-50">
                Use this calculator during practice. The SAT allows a calculator on the Math section.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
