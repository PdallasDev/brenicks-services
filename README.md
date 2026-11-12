# The Brenicks Group — Services

A single Next.js page showing The Brenicks Group's three services as cards. All card content comes from a data file.

- **Live:** _add your Vercel URL here_
- **Repo:** _add your GitHub URL here_

## Run it

Requires Node.js 20.9+.

```bash
npm install
npm run dev     # http://localhost:3000
```

To change a card, edit [`src/data/services.json`](src/data/services.json). No page code needs to change.

## Choices I made

- **Data, not markup.** The page reads `services.json` and renders one card per entry. A small check in `src/lib/services.ts` stops the build if an entry is missing a field. Prices are stored as numbers and formatted in code (`$100/user`, `$2,000`).
- **Real content.** Names, descriptions and starting prices come from brenicks.com. "Starting at" is each service's entry-level offer.
- **Brand colours.** Obsidian background, Graphite cards, Ivory text. Gold is used only for small accents: lines, numbers, link underlines and the focus ring.
- **The cube.** The task was nicknamed "the Rubik's cube", so the page has one: a 3×3 SVG cube with a service on each face. Clicking a face jumps to its card.
- **Typography.** Inspired by Salesforce's bold/light headline style, using the open-source fonts Urbanist and Instrument Sans.
- **Responsive.** One column on phones, two on tablets, three on laptops.
- **Fast and accessible.** The page is pre-rendered to static HTML with no client JavaScript. It uses semantic HTML, passes AA contrast and respects reduced-motion settings.

## With more time

- Validate the data with Zod
- Move content to a CMS so non-developers can edit it
- Add a "Book a consultation" button and each service's full price tiers
- Add tests and SEO metadata
