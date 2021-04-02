const fs = require("fs");

/**
 * Description: This script outputs the stack to a yml file
 * in addition to the json file it creates, for use in codegen.yml.
 *
 * @param  {} data
 */
function handler(data) {
  fs.writeFileSync(
    "../client/codegen.yml",
    `${"overwrite: true\n" + "schema:\n" + "  - ? '"}${data.GraphQlApiUrl}'\n` +
      `    : headers: { x-api-key: '${data.GraphQlApiKeyDefault}' }\n` +
      `documents: './src/graphql/**/*.{ts,tsx}'\n` +
      `generates:\n` +
      `  src/generated/graphql.tsx:\n` +
      `    plugins:\n` +
      `      - 'typescript'\n` +
      `      - 'typescript-operations'\n` +
      `      - 'typescript-react-apollo'\n`
  );
}

module.exports = { handler };
