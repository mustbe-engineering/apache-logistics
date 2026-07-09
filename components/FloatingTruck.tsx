import Image from "next/image";

export function FloatingTruck() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 translate-y-1/2">
      <div className="site-container flex justify-end">
        <Image
          src="/images/assets/Truck-transparent-bk.png"
          alt=""
          width={1344}
          height={752}
          className="h-auto w-[382px] max-[530px]:w-[191px] min-[1361px]:w-[472px]"
          aria-hidden
        />
      </div>
    </div>
  );
}
