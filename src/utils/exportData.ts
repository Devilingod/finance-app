import type { Transaction, Category } from '../types';

export function exportToCSV(transactions: Transaction[], categories: Category[]): void {
  const catMap = new Map(categories.map(c => [c.id, c.name]));
  const header = 'id,type,amount,category,description,date,note\n';
  const rows = transactions.map(t =>
    [
      t.id,
      t.type,
      t.amount,
      `"${catMap.get(t.categoryId) ?? t.categoryId}"`,
      `"${t.description.replace(/"/g, '""')}"`,
      t.date,
      `"${(t.note ?? '').replace(/"/g, '""')}"`,
    ].join(',')
  ).join('\n');

  downloadFile(header + rows, 'finance-export.csv', 'text/csv;charset=utf-8;');
}

export function exportToJSON(transactions: Transaction[], categories: Category[]): void {
  const data = JSON.stringify({ transactions, categories }, null, 2);
  downloadFile(data, 'finance-export.json', 'application/json');
}

export function importFromJSON(file: File): Promise<{ transactions: Transaction[]; categories: Category[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!Array.isArray(data.transactions) || !Array.isArray(data.categories)) {
          reject(new Error('Неверный формат файла'));
          return;
        }
        resolve(data);
      } catch {
        reject(new Error('Ошибка чтения файла'));
      }
    };
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsText(file, 'UTF-8');
  });
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
