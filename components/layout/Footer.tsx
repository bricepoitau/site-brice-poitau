import Link from "next/link";

export default function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "conseil@bricepoitau.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

  return (
    <footer className="flex flex-col gap-4 border-t border-line px-[6vw] py-10 text-[13px] text-text-muted [@media(min-width:640px)]:flex-row [@media(min-width:640px)]:items-center [@media(min-width:640px)]:justify-between">
      <span>© {new Date().getFullYear()} Brice Poitau Conseil</span>
      <span>
        {contactEmail}
        {contactPhone ? ` — ${contactPhone}` : ""}
      </span>
      <div className="flex gap-5">
        <Link href="/mentions-legales" className="hover:text-gold">
          Mentions légales
        </Link>
        <Link href="/politique-confidentialite" className="hover:text-gold">
          Confidentialité
        </Link>
      </div>
    </footer>
  );
}
