<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

FRONTEND 

Agent ought to always keep design in components/ui, for example a Card, then consume it in components, which then are consumed by views.

Agent ought to have functionality inside a features folder. For example src/features/Todo, which itself queries.jsx, mutations.jsx, views/create.jsx for example.

Agent ought to have all api gathered in src/utils/api.jsx, which is consumed by a features api route file,  for example src/features/todo/api.jsx 

Same för client routs.

BACKEND

Clear structure

Use Prisma, separate functionality and controller, standard backend stuff

<!-- END:nextjs-agent-rules -->
