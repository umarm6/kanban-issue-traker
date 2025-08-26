import { renderHook, act } from "@testing-library/react";
import { usePolling } from "../../hooks/usePolling";

jest.useFakeTimers();

test("calls fetchFn periodically and updates countdown", async () => {
  const fetchFn = jest.fn().mockResolvedValue(undefined);
  const { result } = renderHook(() => usePolling(fetchFn, 500));

  expect(fetchFn).toHaveBeenCalledTimes(1);

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(result.current).toBeDefined();

  await act(async () => {
    jest.advanceTimersByTime(1000);
  });

  expect(fetchFn).toHaveBeenCalled();
  jest.useRealTimers();
});
