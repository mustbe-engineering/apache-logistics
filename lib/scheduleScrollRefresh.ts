import { ScrollTrigger } from "@/lib/gsapCore";

let pending = false;

export function scheduleScrollRefresh() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    pending = false;
    ScrollTrigger.refresh();
  });
}
