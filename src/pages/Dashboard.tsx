import { useState } from 'react';
import { motion } from 'framer-motion';
import BalanceCard from '../components/dashboard/BalanceCard';
import SpendingRing from '../components/dashboard/SpendingRing';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import FloatingButton from '../components/layout/FloatingButton';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { useFinanceStore } from '../store/useFinanceStore';

export default function Dashboard() {
  const [addOpen, setAddOpen] = useState(false);
  const { settings } = useFinanceStore();

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
          {settings.language === 'ru' ? 'Мой кошелёк' : 'My Wallet'}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>Добро пожаловать</p>
      </div>

      <BalanceCard />
      <SpendingRing />
      <RecentTransactions />

      <FloatingButton onClick={() => setAddOpen(true)} />
      <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </motion.div>
  );
}
