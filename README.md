# Todo App — modular Next.js example

A small todo app built to show juniors how to structure a **scalable** codebase:

- **Prisma** for the database
- **React Query** for client data fetching
- **shadcn/ui** for reusable UI primitives
- **React Hook Form + Zod** for forms (via shadcn `Field` + `Controller`)
- **No auth** (yet) — keep the first slice simple

## Architecture (read this first)

```
src/
  app/                      # Next.js routes only (stay thin)
    api/todos/              # HTTP entrypoints → controllers
    page.js                 # imports a feature view
    providers.jsx           # QueryClientProvider

  components/ui/            # Design system primitives (Button, Input, Card…)
                            # Never put business logic here

  features/todo/            # One folder = one product capability
    api.js / queries.js / mutations.js
    options/                # ids + options/i18n (option labels)
    form/
      config.js + fields/   # UI config + per-country extras
      schema/               # Client Zod + form error i18n
      i18n/                 # Form labels
    list/
      config.js + i18n/     # List schema + list copy
    views/                  # Wire each owner's i18n → Form/List

  server/todos/
    validation.js           # API Zod (separate from form schema)

  components/
    Form.jsx / List.jsx     # Shared data-driven UI
    ui/                     # shadcn primitives

  i18n/locale.js            # App locale + country only (tiny)

  utils/api.js              # Shared fetch helper (all features use this)

  server/
    db/prisma.js            # Prisma singleton
    todos/
      service.js            # Business / DB logic
      controller.js         # Request validation + HTTP responses
```

### Dependency direction (important)

```
page → feature view → feature components → components/ui
                  ↘ feature queries/mutations → feature api → utils/api → /api/* → controller → service → prisma
```

- **UI primitives** know nothing about todos
- **Feature components** know about todos + hooks
- **Views** only compose
- **Routes** only wire

When you add a new domain (e.g. `notes`), copy the `features/todo` + `server/todos` pattern — do not dump logic into `page.js`.

## Getting started

```bash
npm install
cp .env.example .env   # if needed
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run db:studio    # browse SQLite data
npm run db:migrate   # create/apply migrations after schema changes
```

## API

| Method | Path | Body | Description |
|--------|------|------|-------------|
| `GET` | `/api/todos` | — | List todos |
| `POST` | `/api/todos` | `{ title, notes?, priority, category, tags[], pinned }` | Create |
| `PATCH` | `/api/todos/:id` | partial of the above + `completed` | Update |
| `DELETE` | `/api/todos/:id` | — | Delete |

Todo fields for the form demo: **title**, **notes**, **priority** (radio), **category** (select), **tags** (checkbox group), **pinned** (switch).

## Suggested next steps for juniors

1. Add optimistic updates in `mutations.js`
2. Extract a `notes` feature using the same folder shape
3. Add auth and scope todos by `userId` in the Prisma model
