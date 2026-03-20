import { useState } from 'react';
import { motion } from 'framer-motion';
import PeriodSelector from '../components/analytics/PeriodSelector';
import StatsGrid from '../components/analytics/StatsGrid';
import ExpensePieChart from '../components/analytics/ExpensePieChart';
import BalanceLineChart from '../components/analytics/BalanceLineChart';
import IncomeExpenseBar from '../components/analytics/IncomeExpenseBar';
import type { Period } from '../types';

export default function Analytics() {
  const [period, setPeriod] = useState<Period>('month');

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>Аналитика</h1>

      <div style={{ marginBottom: 16 }}>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <StatsGrid period={period} />
        <ExpensePieChart period={period} />
        <BalanceLineChart />
        <IncomeExpenseBar />
      </div>
    </motion.div>
  );
}
