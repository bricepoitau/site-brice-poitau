# Brice Poitau Conseils

Site vitrine du cabinet d'ingénierie patrimoniale Brice Poitau Conseils, construit avec Next.js 15 (App Router), Tailwind CSS et `motion`.

Le cahier des charges complet est dans [`docs/script-claude-code-brice-poitau-conseils.md`](docs/script-claude-code-brice-poitau-conseils.md).

## Démarrer

```bash
npm install
npm run dev
```

## Variables d'environnement

Copier `.env.example` en `.env.local` et compléter :

- `NEXT_PUBLIC_GCAL_BOOKING_URL` — URL de réservation Google Calendar
- `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4
- `RESEND_API_KEY` — envoi du formulaire de contact (fallback `mailto:` si absent)
