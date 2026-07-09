type IdleId = number;

export function scheduleIdle(cb: () => void, timeout = 2000): IdleId {
  if (typeof requestIdleCallback === "function") {
    return requestIdleCallback(cb, { timeout }) as unknown as number;
  }
  return window.setTimeout(cb, 1);
}

export function cancelIdle(id: IdleId) {
  if (typeof cancelIdleCallback === "function") {
    cancelIdleCallback(id as unknown as number);
    return;
  }
  clearTimeout(id);
}
