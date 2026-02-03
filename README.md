# frontendtask-GUCinternship

Contact Management Mini App 

Run
----
Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Design decisions
------------------------
- Framework: React with Vite for fast development and simple config.
- TypeScript: Provides simple type-safety for `Contact` objects `src/types.ts`.
- Component-based: three main components were created:
  - `ContactForm` handles add/edit with basic validation.
  - `ContactList` shows search and category filter and renders items.
  - `ContactItem` renders a single contact and exposes edit/delete actions.
- Validation: Implemented simple client-side checks for name, email and phone.
- Responsiveness: responsive rules in `src/index.css`

