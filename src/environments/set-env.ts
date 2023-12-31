/* eslint-disable @typescript-eslint/no-var-requires */
const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
  appVersion: '${appVersion}',
  BACKEND_URL: '${process.env['BACKEND_URL']}',
  AWS_REGION: '${process.env['AWS_REGION']}',
  AWS_ACCESS_KEY_ID: '${process.env['AWS_ACCESS_KEY_ID']}',
  AWS_SECRET_ACCESS_KEY: '${process.env['AWS_SECRET_ACCESS_KEY']}',
  AWS_BUCKET_NAME: '${process.env['AWS_BUCKET_NAME']}',
  production: true,
};
`;
  console.log(
    'The file `environment.ts` will be written with the following content: \n',
  );
  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`,
      );
    }
  });
};

setEnv();
