import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "apps/server/src/modules/**/*.graphql",
  generates: {
    "apps/server/src/graphql/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
}

export default config
