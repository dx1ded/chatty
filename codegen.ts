import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "apps/server/src/modules/**/*.graphql",
  documents: ["apps/client/src/**/*.{ts,tsx}"],
  generates: {
    "apps/server/src/modules/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "apps/client/src/graphql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql"
      },
    }
  },
}

export default config
