import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FloatingButtonProps {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed', bottom: 80, right: 20, zIndex: 200,
        width: 56, height: 56, borderRadius: '50%',
        background: 'var(--accent)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(var(--accent-rgb), 0.45)',
        color: '#fff',
      }}
    >
      <Plus size={26} strokeWidth={2.5} />
    </motion.button>
  );
}
