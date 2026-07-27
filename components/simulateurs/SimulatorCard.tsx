import Link from "next/link";
import Card from "@/components/ui/Card";

export interface SimulatorCardProps {
  tag: string;
  title: string;
  description: string;
  href?: string;
}

export default function SimulatorCard({ tag, title, description, href }: SimulatorCardProps) {
  return (
    <Card>
      <span className="text-[11px] font-semibold tracking-[.12em] text-text-muted uppercase">{tag}</span>
      <h3 className="mt-2.5 text-[28px] font-[450] text-ink">{title}</h3>
      <p className="mt-3.5 grow text-[14.5px] leading-[1.55] text-text-muted">{description}</p>

      {href ? (
        <Link
          href={href}
          className="mt-5.5 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 text-[13px] font-semibold text-ink shadow-[0_8px_20px_-8px_rgba(169,132,63,0.55)] transition-[background-color,color,gap,box-shadow] duration-300 ease-out hover:gap-3 hover:bg-ink hover:text-white"
        >
          Ouvrir le simulateur →
        </Link>
      ) : (
        <span className="mt-5.5 inline-flex w-fit items-center gap-2 rounded-full border border-line px-5 py-3 text-[13px] font-medium text-text-muted">
          En préparation
        </span>
      )}
    </Card>
  );
}
