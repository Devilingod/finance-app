import {
  startOfDay, startOfWeek, startOfMonth, startOfYear,
  endOfDay, endOfWeek, endOfMonth, endOfYear,
  isWithinInterval, eachDayOfInterval, eachMonthOfInterval,
  format, subMonths, subDays,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import type { Transaction, Category, Period, BalanceSummary, CategoryStat, MonthlyData, DailyBalance } from '../types';

export function getPeriodInterval(period: Period): { start: Date; end: Date } {
  const now = new Date();
  switch (period) {
    case 'day':   return { start: startOfDay(now),   end: endOfDay(now) };
    case 'week':  return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
    case 'month': return { start: startOfMonth(now), end: endOfMonth(now) };
    case 'year':  return { start: startOfYear(now),  end: endOfYear(now) };
    case 'all':   return { start: new Date(0),        end: new Date(8_640_000_000_000_000) };
  }
}

export function filterByPeriod(transactions: Transaction[], period: Period): Transaction[] {
  const { start, end } = getPeriodInterval(period);
  return transactions.filter(t => isWithinInterval(new Date(t.date), { start, end }));
}

export function getBalanceSummary(transactions: Transaction[]): BalanceSummary {
  let income = 0, expenses = 0;
  for (const t of transactions) {
    if (t.type === 'income') income += t.amount;
    else expenses += t.amount;
  }
  return { total: income - expenses, income, expenses };
}

export function getCategoryStats(
  transactions: Transaction[],
  categories: Category[],
  type: 'expense' | 'income' = 'expense',
): CategoryStat[] {
  const filtered = transactions.filter(t => t.type === type);
  const total = filtered.reduce((s, t) => s + t.amount, 0);
  const map = new Map<string, { amount: number; count: number }>();

  for (const t of filtered) {
    const prev = map.get(t.categoryId) ?? { amount: 0, count: 0 };
    map.set(t.categoryId, { amount: prev.amount + t.amount, count: prev.count + 1 });
  }

  const stats: CategoryStat[] = [];
  for (const [categoryId, { amount, count }] of map.entries()) {
    const cat = categories.find(c => c.id === categoryId);
    if (!cat) continue;
    stats.push({
      categoryId,
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      amount,
      count,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    });
  }
  return stats.sort((a, b) => b.amount - a.amount);
}

export function getMonthlyData(transactions: Transaction[], months = 6): MonthlyData[] {
  const now = new Date();
  const result: MonthlyData[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const monthTxs = transactions.filter(t => isWithinInterval(new Date(t.date), { start, end }));
    const income = monthTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = monthTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    result.push({
      month: format(monthDate, 'MMM', { locale: ru }),
      income,
      expenses,
      balance: income - expenses,
    });
  }
  return result;
}

export function getDailyBalance(transactions: Transaction[], days = 30): DailyBalance[] {
  const now = new Date();
  const start = startOfDay(subDays(now, days - 1));
  const end = endOfDay(now);
  const days_arr = eachDayOfInterval({ start, end });

  const allTxs = transactions.filter(t => new Date(t.date) <= end);
  const baseBalance = allTxs
    .filter(t => new Date(t.date) < start)
    .reduce((s, t) => s + (t.type === 'income' ? t.amount : -t.amount), 0);

  let running = baseBalance;
  return days_arr.map(day => {
    const dayTxs = transactions.filter(t => {
      const td = new Date(t.date);
      return td >= startOfDay(day) && td <= endOfDay(day);
    });
    for (const t of dayTxs) {
      running += t.type === 'income' ? t.amount : -t.amount;
    }
    return { date: format(day, 'dd.MM'), balance: running };
  });
}

export function groupTransactionsByDate(transactions: Transaction[]): Map<string, Transaction[]> {
  const groups = new Map<string, Transaction[]>();
  for (const t of transactions) {
    const key = format(new Date(t.date), 'yyyy-MM-dd');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(t);
  }
  return groups;
}
