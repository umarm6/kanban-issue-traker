import { useEffect, useRef, useState } from "react";

type AsyncFunction = () => Promise<void>;

/**
 * usePolling runs an async function at a specified interval.
 * It provides a countdown state that tracks seconds remaining until next fetch.
 *
 * @param fetchFn - An async function to execute on each poll.
 * @param intervalMs - Polling interval in milliseconds. Defaults to 10 seconds.
 * @returns countdownSeconds - number of seconds remaining until next fetch
 * @returns lastSync - time of last synced
 */


export function usePolling(fetchFn: AsyncFunction, intervalMs = 500) {
  const savedFetchFn = useRef<AsyncFunction>(fetchFn);
  const [countdownSeconds, setCountdownSeconds] = useState(intervalMs / 1000);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    savedFetchFn.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    let isActive = true;
    let countdownTimerId: NodeJS.Timeout | null = null;

    async function poll() {
      while (isActive) {
        await savedFetchFn.current();
        setLastSync(new Date()); // Update last sync time

        setCountdownSeconds(intervalMs / 1000);

        countdownTimerId = setInterval(() => {
          setCountdownSeconds((s) => {
            if (s <= 1) {
              return intervalMs / 1000;
            }
            return s - 1;
          });
        }, 1000);

        await new Promise((resolve) => setTimeout(resolve, intervalMs));

        if (countdownTimerId) {
          clearInterval(countdownTimerId);
          countdownTimerId = null;
        }
      }
    }

    poll();

    return () => {
      isActive = false;
      if (countdownTimerId) clearInterval(countdownTimerId);
    };
  }, [intervalMs]);

  return { countdownSeconds, lastSync };
}