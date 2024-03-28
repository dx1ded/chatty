import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "apps/server/src/modules/**/*.graphql",
  documents: ["apps/client/src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "apps/server/src/modules/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "apps/client/src/codegen/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
        avoidOptionals: true,
        assumeValid: true,
        strictScalars: false
      },
    }
  },
}

export default config
