import { Elysia, t } from "elysia";
import { createVocabularyIdToToken, createVocabularyTokenToId } from "./lib/vocab";

const app = new Elysia()
  .get("/", () => new Response(Bun.file("./public/index.html")))
  .get("/alive", () => ({
    data: {
      status: "Up"
    }
  }))
  .get("/health", () => ({
    data: {
      status: "OK"
    }
  }))
  .group("/api", apiGroup =>
    apiGroup.group('/v1', (v1Group) =>
      v1Group.group('/token', (tokenRouter) =>
        tokenRouter
          // POST /api/v1/token/encode
          .post("/encode", ({ body: { corpus } }) => {
            const vocabulary = createVocabularyTokenToId();
            const tokens = Array.from(corpus).reduce<number[]>((acc, char: string) => {
              const id: number = vocabulary.get(char) ?? 666;
              acc.push(id);
              return acc;
            }, []);

            return { tokens };
          }, {
            body: t.Object({ corpus: t.String() }),
            response: t.Object({ tokens: t.Array(t.Number()) })
          })
          // POST /api/v1/token/decode
          .post(
            "/decode",
            ({ body: { tokens } }) => {
              const vocabulary = createVocabularyIdToToken();
              const decoded = tokens
                .map(tokenId => vocabulary.get(tokenId) ?? '<UNK>')
                .join('');
              return { decoded };
            },
            {
              body: t.Object({ tokens: t.Array(t.Number()) }),
              response: t.Object({ decoded: t.String() })
            }
          )
      ))
  )
  .listen(3000);


const exitHandler = () => {
  console.log(".SIGTERM or SIGINT received. Shutting down gracefully...");
  app?.stop().then(() => {
    console.log("Server stopped.");
    process.exit(0);
  });
};

const unexpectedErrorHandler = (error: unknown) => {
  console.log("Unexpected error occurred:", error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", exitHandler);
process.on("SIGINT", exitHandler);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);