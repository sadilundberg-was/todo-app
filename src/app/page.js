import { TodoPage } from "@/features/todo/views";

/**
 * App Router pages stay thin.
 * Feature views own the screen; routes only wire them in.
 */
export default function Home() {
  return <TodoPage />;
}
