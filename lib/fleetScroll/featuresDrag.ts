function snapCarousel(container: HTMLElement) {
  const items = container.querySelectorAll<HTMLElement>(".scroll-sequence__feature");
  if (!items.length) return;
  const viewportCenter = container.scrollLeft + container.clientWidth / 2;
  let closest = items[0];
  let closestDistance = Infinity;
  items.forEach((item) => {
    const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - viewportCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = item;
    }
  });
  const maxScroll = container.scrollWidth - container.clientWidth;
  const target = Math.min(maxScroll, Math.max(0, closest.offsetLeft - (container.clientWidth - closest.offsetWidth) / 2));
  container.scrollTo({ left: target, behavior: "smooth" });
}

export function initFeaturesDragScroll(featuresCarousel: HTMLElement | null) {
  if (!featuresCarousel) return () => {};
  const carousel = featuresCarousel;
  const DRAG_THRESHOLD = 6;
  let dragEnabled = false;
  let isDragging = false;
  let pointerId: number | null = null;
  let startX = 0;
  let startY = 0;
  let startScrollLeft = 0;
  let dragAxis: "x" | "y" | null = null;
  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
  const enableDrag = () => {
    if (dragEnabled || !isMobile()) return;
    dragEnabled = true;
    carousel.classList.add("is-draggable");
  };
  const disableDrag = () => {
    if (!dragEnabled) return;
    dragEnabled = false;
    isDragging = false;
    pointerId = null;
    dragAxis = null;
    carousel.classList.remove("is-draggable", "is-dragging");
  };
  const syncDragMode = () => (isMobile() ? enableDrag() : disableDrag());
  const resetDrag = () => {
    isDragging = false;
    pointerId = null;
    dragAxis = null;
    carousel.classList.remove("is-dragging");
  };
  const onDown = (event: PointerEvent) => {
    if (!dragEnabled || event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startScrollLeft = carousel.scrollLeft;
    dragAxis = null;
    isDragging = false;
  };
  const onMove = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (!dragAxis) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD && Math.abs(deltaY) < DRAG_THRESHOLD) return;
      dragAxis = Math.abs(deltaX) >= Math.abs(deltaY) ? "x" : "y";
      if (dragAxis === "y") return resetDrag();
      isDragging = true;
      carousel.setPointerCapture(pointerId);
      carousel.classList.add("is-dragging");
    }
    if (dragAxis !== "x" || !isDragging) return;
    event.preventDefault();
    carousel.scrollLeft = startScrollLeft - deltaX;
  };
  const onEnd = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    if (isDragging) {
      carousel.releasePointerCapture(pointerId);
      snapCarousel(carousel);
    }
    resetDrag();
  };
  carousel.addEventListener("pointerdown", onDown);
  carousel.addEventListener("pointermove", onMove);
  carousel.addEventListener("pointerup", onEnd);
  carousel.addEventListener("pointercancel", onEnd);
  syncDragMode();
  window.addEventListener("resize", syncDragMode);
  return () => {
    disableDrag();
    carousel.removeEventListener("pointerdown", onDown);
    carousel.removeEventListener("pointermove", onMove);
    carousel.removeEventListener("pointerup", onEnd);
    carousel.removeEventListener("pointercancel", onEnd);
    window.removeEventListener("resize", syncDragMode);
  };
}
