import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/transactions/SearchBar';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import FloatingButton from '../components/layout/FloatingButton';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import type { FilterState } from '../types';

const DEFAULT_FILTERS: FilterState = {
  search: '', type: 'all', categoryId: 'all',
  period: 'month', sortBy: 'date', sortDir: 'desc',
};

export default function Transactions() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [addOpen, setAddOpen] = useState(false);

  const update = (f: Partial<FilterState>) => setFilters(prev => ({ ...prev, ...f }));

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>История</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <SearchBar value={filters.search} onChange={v => update({ search: v })} />
        <TransactionFilters filters={filters} onChange={update} />
      </div>

      <TransactionList filters={filters} />

      <FloatingButton onClick={() => setAddOpen(true)} />
      <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </motion.div>
  );
}
