export type TransactionType = 'income' | 'expense';
export type Theme = 'dark' | 'light' | 'neon' | 'glass';
export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP';
export type Language = 'ru' | 'en';
export type Period = 'day' | 'week' | 'month' | 'year' | 'all';
export type CategoryType = 'income' | 'expense' | 'both';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  description: string;
  date: string;
  note?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: CategoryType;
  isCustom: boolean;
}

export interface AppSettings {
  theme: Theme;
  currency: Currency;
  language: Language;
  pinEnabled: boolean;
  pinHash: string | null;
}

export interface BalanceSummary {
  total: number;
  income: number;
  expenses: number;
}

export interface CategoryStat {
  categoryId: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  count: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface DailyBalance {
  date: string;
  balance: number;
}

export interface FilterState {
  search: string;
  type: TransactionType | 'all';
  categoryId: string | 'all';
  period: Period;
  sortBy: 'date' | 'amount';
  sortDir: 'desc' | 'asc';
}
