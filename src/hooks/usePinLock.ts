import { useState } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { hashPin } from '../utils/formatters';

export function usePinLock() {
  const { settings, updateSettings } = useFinanceStore();
  const [isLocked, setIsLocked] = useState(settings.pinEnabled);

  const enablePin = (pin: string) => {
    updateSettings({ pinEnabled: true, pinHash: hashPin(pin) });
  };

  const disablePin = () => {
    updateSettings({ pinEnabled: false, pinHash: null });
  };

  const verifyPin = (pin: string): boolean => {
    const ok = settings.pinHash === hashPin(pin);
    if (ok) setIsLocked(false);
    return ok;
  };

  const lock = () => {
    if (settings.pinEnabled) setIsLocked(true);
  };

  return { isLocked, pinEnabled: settings.pinEnabled, enablePin, disablePin, verifyPin, lock };
}
