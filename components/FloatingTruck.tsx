import Image from "next/image";

export function FloatingTruck() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 translate-y-1/2">
      <div className="site-container flex justify-end">
        <Image
          src="/images/Truck-transparent-bk.png"
          alt=""
          width={1344}
          height={752}
          className="h-auto w-[272px]"
          aria-hidden
        />
      </div>
    </div>
  );
}
