import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'http://localhost:1337/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'nhost-admin-secret',
          'x-hasura-role': 'admin',
        },
      },
    },
  ],
  generates: {
    'src/lib/gql/': {
      documents: [
        // "./apps/web_app-experimental/src/**/*.tsx",
        'src/**/*.graphql',
      ],
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
      config: {
        skipTypename: true,
        enumsAsTypes: true,
        scalars: {
          numeric: 'number',
        },
      },
    },
  },
};

export default config;
