const NEAR_MARGIN = "600px 0px";

export function observeNearViewport(el: HTMLElement, onNear: () => void) {
  if (!("IntersectionObserver" in window)) {
    onNear();
    return () => {};
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      onNear();
      observer.disconnect();
    },
    { rootMargin: NEAR_MARGIN, threshold: 0 },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
