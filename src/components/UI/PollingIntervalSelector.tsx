import { useAppSettingsStore } from "../../state/useAppSettingsStore";

export function PollingIntervalSelector() {
  const pollingIntervalMs = useAppSettingsStore(state => state.pollingIntervalMs);
  const setPollingInterval = useAppSettingsStore(state => state.setPollingInterval);

  return (
    <label>
      Polling interval:
      <select
        value={pollingIntervalMs}
        onChange={(e) => setPollingInterval(Number(e.target.value))}
      >
        <option value={5000}>5 seconds</option>
        <option value={10000}>10 seconds</option>
        <option value={30000}>30 seconds</option>
        <option value={60000}>1 minute</option>
      </select>
    </label>
  );
}