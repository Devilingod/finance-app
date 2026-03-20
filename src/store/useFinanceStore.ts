import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Transaction, Category, AppSettings, Period, BalanceSummary, CategoryStat, MonthlyData, DailyBalance, FilterState } from '../types';
import { DEFAULT_CATEGORIES, MOCK_TRANSACTIONS } from '../data/mockData';
import { filterByPeriod, getBalanceSummary, getCategoryStats, getMonthlyData, getDailyBalance } from '../utils/calculations';

interface FinanceStore {
  transactions: Transaction[];
  categories: Category[];
  settings: AppSettings;

  addTransaction: (t: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (id: string, t: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void;
  deleteTransaction: (id: string) => void;

  addCategory: (c: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, c: Partial<Omit<Category, 'id'>>) => void;
  deleteCategory: (id: string) => void;

  updateSettings: (s: Partial<AppSettings>) => void;
  importData: (transactions: Transaction[], categories: Category[]) => void;

  getBalanceSummary: (period: Period) => BalanceSummary;
  getCategoryStats: (period: Period, type?: 'expense' | 'income') => CategoryStat[];
  getMonthlyData: (months?: number) => MonthlyData[];
  getDailyBalance: (days?: number) => DailyBalance[];
  getFilteredTransactions: (filters: FilterState) => Transaction[];
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: MOCK_TRANSACTIONS,
      categories: DEFAULT_CATEGORIES,
      settings: {
        theme: 'dark',
        currency: 'RUB',
        language: 'ru',
        pinEnabled: false,
        pinHash: null,
      },

      addTransaction: (t) => set(s => ({
        transactions: [{ ...t, id: uuidv4(), createdAt: new Date().toISOString() }, ...s.transactions],
      })),

      updateTransaction: (id, t) => set(s => ({
        transactions: s.transactions.map(tx =>
          tx.id === id ? { ...tx, ...t, updatedAt: new Date().toISOString() } : tx
        ),
      })),

      deleteTransaction: (id) => set(s => ({
        transactions: s.transactions.filter(tx => tx.id !== id),
      })),

      addCategory: (c) => set(s => ({
        categories: [...s.categories, { ...c, id: uuidv4() }],
      })),

      updateCategory: (id, c) => set(s => ({
        categories: s.categories.map(cat => cat.id === id ? { ...cat, ...c } : cat),
      })),

      deleteCategory: (id) => set(s => ({
        categories: s.categories.filter(cat => cat.id !== id),
      })),

      updateSettings: (s) => set(state => ({ settings: { ...state.settings, ...s } })),

      importData: (transactions, categories) => set({ transactions, categories }),

      getBalanceSummary: (period) => {
        const txs = filterByPeriod(get().transactions, period);
        return getBalanceSummary(txs);
      },

      getCategoryStats: (period, type = 'expense') => {
        const txs = filterByPeriod(get().transactions, period);
        return getCategoryStats(txs, get().categories, type);
      },

      getMonthlyData: (months = 6) => getMonthlyData(get().transactions, months),

      getDailyBalance: (days = 30) => getDailyBalance(get().transactions, days),

      getFilteredTransactions: (filters) => {
        let txs = get().transactions;
        const { search, type, categoryId, period, sortBy, sortDir } = filters;

        txs = filterByPeriod(txs, period);
        if (type !== 'all') txs = txs.filter(t => t.type === type);
        if (categoryId !== 'all') txs = txs.filter(t => t.categoryId === categoryId);
        if (search.trim()) {
          const q = search.toLowerCase();
          txs = txs.filter(t => t.description.toLowerCase().includes(q) || (t.note ?? '').toLowerCase().includes(q));
        }
        txs = [...txs].sort((a, b) => {
          const aVal = sortBy === 'date' ? new Date(a.date).getTime() : a.amount;
          const bVal = sortBy === 'date' ? new Date(b.date).getTime() : b.amount;
          return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
        });
        return txs;
      },
    }),
    { name: 'finance-app-v1' }
  )
);
