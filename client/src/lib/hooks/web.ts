import { useEffect, useState, useCallback } from "react";

export function useOnlineStatus(
  onlineCallback?: () => void,
  offlineCallback?: () => void,
) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnline = useCallback(() => {
    if (onlineCallback) onlineCallback();
    setIsOnline(true);
  }, []);

  const handleOffline = useCallback(() => {
    if (offlineCallback) offlineCallback();
    setIsOnline(false);
  }, []);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [onlineCallback, offlineCallback]);

  return { isOnline };
}
