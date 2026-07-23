import Link from "next/link";
import Card from "@/components/ui/Card";

export interface SimulatorCardProps {
  tag: string;
  title: string;
  description: string;
  pills?: string[];
  href?: string;
}

export default function SimulatorCard({ tag, title, description, pills, href }: SimulatorCardProps) {
  return (
    <Card>
      <span className="text-[11px] font-semibold tracking-[.12em] text-text-muted uppercase">{tag}</span>
      <h3 className="mt-2.5 text-[28px] font-[450] text-ink">{title}</h3>
      <p className="mt-3.5 grow text-[14.5px] leading-[1.55] text-text-muted">{description}</p>

      {pills && pills.length > 0 && (
        <div className="mt-4.5 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-xs text-text-muted"
            >
              {pill}
            </span>
          ))}
        </div>
      )}

      {href ? (
        <Link
          href={href}
          className="mt-5.5 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-white transition-[background-color,gap] duration-300 ease-out hover:gap-3 hover:bg-gold"
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
