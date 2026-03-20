import { v4 as uuidv4 } from 'uuid';
import type { Category, Transaction } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-salary',        name: 'Зарплата',       icon: 'Briefcase',     color: '#00D4AA', type: 'income',  isCustom: false },
  { id: 'cat-freelance',     name: 'Фриланс',        icon: 'Laptop',        color: '#6C63FF', type: 'income',  isCustom: false },
  { id: 'cat-investments',   name: 'Инвестиции',     icon: 'TrendingUp',    color: '#F59E0B', type: 'income',  isCustom: false },
  { id: 'cat-gifts-in',      name: 'Подарки',        icon: 'Gift',          color: '#EC4899', type: 'income',  isCustom: false },
  { id: 'cat-other-in',      name: 'Прочее (доход)', icon: 'CirclePlus',    color: '#10B981', type: 'income',  isCustom: false },
  { id: 'cat-food',          name: 'Продукты',       icon: 'ShoppingCart',  color: '#F97316', type: 'expense', isCustom: false },
  { id: 'cat-restaurants',   name: 'Рестораны',      icon: 'UtensilsCrossed', color: '#EF4444', type: 'expense', isCustom: false },
  { id: 'cat-transport',     name: 'Транспорт',      icon: 'Car',           color: '#3B82F6', type: 'expense', isCustom: false },
  { id: 'cat-entertainment', name: 'Развлечения',    icon: 'Gamepad2',      color: '#8B5CF6', type: 'expense', isCustom: false },
  { id: 'cat-subscriptions', name: 'Подписки',       icon: 'CreditCard',    color: '#06B6D4', type: 'expense', isCustom: false },
  { id: 'cat-health',        name: 'Здоровье',       icon: 'Heart',         color: '#F43F5E', type: 'expense', isCustom: false },
  { id: 'cat-clothes',       name: 'Одежда',         icon: 'Shirt',         color: '#A78BFA', type: 'expense', isCustom: false },
  { id: 'cat-utilities',     name: 'ЖКХ',            icon: 'Home',          color: '#64748B', type: 'expense', isCustom: false },
  { id: 'cat-travel',        name: 'Путешествия',    icon: 'Plane',         color: '#0EA5E9', type: 'expense', isCustom: false },
  { id: 'cat-education',     name: 'Образование',    icon: 'BookOpen',      color: '#84CC16', type: 'expense', isCustom: false },
  { id: 'cat-other-ex',      name: 'Прочее',         icon: 'MoreHorizontal',color: '#94A3B8', type: 'expense', isCustom: false },
];

const d = (daysAgo: number, hour = 12) => {
  const dt = new Date();
  dt.setDate(dt.getDate() - daysAgo);
  dt.setHours(hour, 0, 0, 0);
  return dt.toISOString();
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: uuidv4(), type: 'income',  amount: 180000, categoryId: 'cat-salary',        description: 'Зарплата за март',        date: d(2),  createdAt: d(2) },
  { id: uuidv4(), type: 'income',  amount: 45000,  categoryId: 'cat-freelance',     description: 'Проект Yandex UI',        date: d(5),  createdAt: d(5) },
  { id: uuidv4(), type: 'expense', amount: 8500,   categoryId: 'cat-food',          description: 'Пятёрочка + Вкусвилл',    date: d(1),  createdAt: d(1) },
  { id: uuidv4(), type: 'expense', amount: 1200,   categoryId: 'cat-transport',     description: 'Яндекс Такси',            date: d(1),  createdAt: d(1) },
  { id: uuidv4(), type: 'expense', amount: 3500,   categoryId: 'cat-restaurants',   description: 'Обед с командой',         date: d(2),  createdAt: d(2) },
  { id: uuidv4(), type: 'expense', amount: 799,    categoryId: 'cat-subscriptions', description: 'Spotify Premium',         date: d(3),  createdAt: d(3) },
  { id: uuidv4(), type: 'expense', amount: 299,    categoryId: 'cat-subscriptions', description: 'Яндекс Плюс',            date: d(3),  createdAt: d(3) },
  { id: uuidv4(), type: 'expense', amount: 12400,  categoryId: 'cat-clothes',       description: 'Кроссовки Nike',         date: d(4),  createdAt: d(4) },
  { id: uuidv4(), type: 'expense', amount: 5600,   categoryId: 'cat-health',        description: 'Аптека + анализы',       date: d(4),  createdAt: d(4) },
  { id: uuidv4(), type: 'expense', amount: 18000,  categoryId: 'cat-utilities',     description: 'ЖКХ март',               date: d(5),  createdAt: d(5) },
  { id: uuidv4(), type: 'income',  amount: 12000,  categoryId: 'cat-investments',   description: 'Дивиденды Сбер',         date: d(6),  createdAt: d(6) },
  { id: uuidv4(), type: 'expense', amount: 2300,   categoryId: 'cat-food',          description: 'Магнит',                 date: d(6),  createdAt: d(6) },
  { id: uuidv4(), type: 'expense', amount: 4200,   categoryId: 'cat-entertainment', description: 'Кино + попкорн',         date: d(7),  createdAt: d(7) },
  { id: uuidv4(), type: 'expense', amount: 1900,   categoryId: 'cat-transport',     description: 'Метро (карта)',          date: d(8),  createdAt: d(8) },
  { id: uuidv4(), type: 'expense', amount: 6800,   categoryId: 'cat-restaurants',   description: 'Суши-бар',               date: d(9),  createdAt: d(9) },
  { id: uuidv4(), type: 'income',  amount: 180000, categoryId: 'cat-salary',        description: 'Зарплата за февраль',    date: d(32), createdAt: d(32) },
  { id: uuidv4(), type: 'income',  amount: 28000,  categoryId: 'cat-freelance',     description: 'Логотип для стартапа',   date: d(35), createdAt: d(35) },
  { id: uuidv4(), type: 'expense', amount: 75000,  categoryId: 'cat-travel',        description: 'Авиабилеты + отель СПб', date: d(36), createdAt: d(36) },
  { id: uuidv4(), type: 'expense', amount: 9200,   categoryId: 'cat-food',          description: 'Ашан',                   date: d(38), createdAt: d(38) },
  { id: uuidv4(), type: 'expense', amount: 15000,  categoryId: 'cat-education',     description: 'Курс React Advanced',   date: d(40), createdAt: d(40) },
  { id: uuidv4(), type: 'expense', amount: 3100,   categoryId: 'cat-subscriptions', description: 'Adobe Creative Cloud',   date: d(40), createdAt: d(40) },
  { id: uuidv4(), type: 'expense', amount: 4500,   categoryId: 'cat-health',        description: 'Стоматолог',             date: d(42), createdAt: d(42) },
  { id: uuidv4(), type: 'expense', amount: 8900,   categoryId: 'cat-clothes',       description: 'Zara — джинсы + рубашки', date: d(44), createdAt: d(44) },
  { id: uuidv4(), type: 'income',  amount: 5000,   categoryId: 'cat-gifts-in',      description: 'Подарок на день рождения', date: d(45), createdAt: d(45) },
  { id: uuidv4(), type: 'expense', amount: 18000,  categoryId: 'cat-utilities',     description: 'ЖКХ февраль',            date: d(46), createdAt: d(46) },
  { id: uuidv4(), type: 'income',  amount: 180000, categoryId: 'cat-salary',        description: 'Зарплата за январь',     date: d(62), createdAt: d(62) },
  { id: uuidv4(), type: 'income',  amount: 55000,  categoryId: 'cat-freelance',     description: 'Разработка мобильного приложения', date: d(65), createdAt: d(65) },
  { id: uuidv4(), type: 'expense', amount: 95000,  categoryId: 'cat-travel',        description: 'Новый год в Дубае',      date: d(68), createdAt: d(68) },
  { id: uuidv4(), type: 'expense', amount: 22000,  categoryId: 'cat-clothes',       description: 'Зимняя куртка',          date: d(70), createdAt: d(70) },
  { id: uuidv4(), type: 'expense', amount: 7400,   categoryId: 'cat-food',          description: 'Ашан + Декатлон',        date: d(72), createdAt: d(72) },
  { id: uuidv4(), type: 'expense', amount: 18000,  categoryId: 'cat-utilities',     description: 'ЖКХ январь',             date: d(75), createdAt: d(75) },
  { id: uuidv4(), type: 'expense', amount: 6200,   categoryId: 'cat-entertainment', description: 'Боулинг + бар',          date: d(77), createdAt: d(77) },
  { id: uuidv4(), type: 'income',  amount: 18000,  categoryId: 'cat-investments',   description: 'Продажа акций',          date: d(80), createdAt: d(80) },
];
