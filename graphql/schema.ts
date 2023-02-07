import { makeSchema } from "nexus";
import path, { join } from "path";
import * as process from "process";
import * as types from "./types";

export const schema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: path.join(__dirname, "generated/schema.gen.graphql"),
  },
  contextType: {
    module: join(process.cwd(), "context.ts"),
    export: "Context",
  },
});
