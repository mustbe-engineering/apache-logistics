import Image from "next/image";

type Props = { variant?: "bridge" | "footer" };

export function FloatingTruck({ variant = "bridge" }: Props) {
  if (variant === "footer") {
    return (
      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center overflow-hidden md:hidden">
        <Image
          src="/images/assets/Truck-transparent-bk.png"
          alt=""
          width={1344}
          height={752}
          className="h-auto w-[496px] translate-x-[calc(38%)]"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden translate-y-1/2 md:block">
      <div className="site-container flex justify-end">
        <Image
          src="/images/assets/Truck-transparent-bk.png"
          alt=""
          width={1344}
          height={752}
          className="h-auto w-[382px] min-[1361px]:w-[472px]"
          aria-hidden
        />
      </div>
    </div>
  );
}
