'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

// Mock certificate data for development/demo purposes
const CERTIFICATES = [
  { id: 1, name: 'AWS Certified Cloud Practitioner', image: '/assets/projects/attendance-check.jfif', year: '2026' },
  { id: 2, name: 'Advanced React Patterns', image: '/assets/projects/attendance-check.jfif', year: '2025' },
  { id: 3, name: 'Design Systems & UX Architecture', image: '/assets/projects/attendance-check.jfif', year: '2024' }
];

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // small delay to clear selection after exit animation
    setTimeout(() => setSelectedCertificate(null), 300);
  };

  return (
    <section id="certificates" className="min-h-[50vh] py-24 px-4 md:px-8 lg:px-12 bg-white dark:bg-black">
      <div className="mb-12">
        <p className="text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-600 uppercase">
          RECOGNITION & CERTIFICATIONS
        </p>
      </div>

      {CERTIFICATES.length === 0 ? (
        <motion.div
          className="flex items-center justify-center min-h-[60vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-300 dark:text-zinc-700 text-center">
              No Certificates Yet, Stay Tuned!
            </h2>
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-0">
          {CERTIFICATES.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              className="border-b border-black/10 dark:border-white/10 py-8 flex justify-between items-center group cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors duration-500"
              onClick={() => handleCertificateClick(certificate)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
            >
              <motion.div className="flex-1 overflow-hidden" whileHover={{ x: 4 }}>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white group-hover:pl-4 transition-all duration-300">
                  {certificate.name}
                </h3>
              </motion.div>

              <motion.div className="ml-4 md:ml-8 flex-shrink-0" whileHover={{ x: 2 }} transition={{ duration: 0.3 }}>
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                  VIEW ↗
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isModalOpen && selectedCertificate && (
          <CertificateModal certificate={selectedCertificate} isOpen={isModalOpen} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
}

function CertificateModal({ certificate, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-0 bg-zinc-100 dark:bg-[#050505] p-4 md:p-8 rounded-xl max-w-4xl backdrop-blur-xl shadow-2xl">
        <DialogTitle className="sr-only">Certificate details</DialogTitle>
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="relative w-full bg-white dark:bg-zinc-900 rounded-lg overflow-hidden aspect-video md:aspect-auto">
            <img src={certificate.image} alt={certificate.name} className="w-full h-full object-contain p-4" />
          </div>

          <div className="mt-8 space-y-3 border-t border-black/10 dark:border-white/10 pt-8">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white">{certificate.name}</h2>
            {certificate.year && (
              <p className="text-sm font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">Earned: {certificate.year}</p>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
