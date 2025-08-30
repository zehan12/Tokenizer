import { Footer, Header } from "./components/layout";
import { Tokenizer } from "./page";

export function App() {
  return (
    <>
      <main className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col gap-4 p-8">
        <Header />
        <Tokenizer />
        <Footer />
      </main>
    </>
  );
}