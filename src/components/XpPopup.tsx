import { motion, AnimatePresence } from 'framer-motion';

interface XpPopupProps {
  amount: number;
  visible: boolean;
}

export default function XpPopup({ amount, visible }: XpPopupProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.8 }}
          animate={{ opacity: 1, y: -40, scale: 1 }}
          exit={{ opacity: 0, y: -70, scale: 0.7 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Cinzel, serif',
            fontSize: 20,
            fontWeight: 700,
            color: '#c8a96e',
            textShadow: '0 0 12px rgba(200,169,110,0.8)',
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          +{amount} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
}
