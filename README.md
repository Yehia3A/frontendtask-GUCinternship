# frontendtask-GUCinternship

Contact Management Mini App 

Run
----
Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Design decisions (brief)
------------------------
- Framework: React with Vite for fast development and simple config.
- TypeScript: Provides simple type-safety for `Contact` objects (`src/types.ts`).
- Component-based: three main components were created:
  - `ContactForm` handles add/edit with basic validation.
  - `ContactList` shows search and category filter and renders items.
  - `ContactItem` renders a single contact and exposes edit/delete actions.
- Data: Mock JSON (`src/data/contacts.json`) is imported into `App` and used in-memory.
- Validation: Implemented simple client-side checks for name, email and phone.
- Responsiveness: Minimal responsive rules in `src/index.css`; improve UI as needed.

