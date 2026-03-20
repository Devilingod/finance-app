import { useEffect } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import type { Theme } from '../types';

export function useTheme() {
  const { settings, updateSettings } = useFinanceStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  const setTheme = (theme: Theme) => {
    updateSettings({ theme });
    document.documentElement.setAttribute('data-theme', theme);
  };

  return { theme: settings.theme, setTheme };
}
