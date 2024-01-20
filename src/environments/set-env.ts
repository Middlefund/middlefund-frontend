/* eslint-disable @typescript-eslint/no-var-requires */
const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPathProd = './src/environments/environment.ts';
  const targetPathDev = './src/environments/environment.development.ts';
  // Load node modules
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFileProd = `export const environment = {
  appVersion: '${appVersion}',
  BACKEND_URL: '${process.env['PROD_BACKEND_URL']}',
  AWS_REGION: '${process.env['AWS_REGION']}',
  AWS_ACCESS_KEY_ID: '${process.env['AWS_ACCESS_KEY_ID']}',
  AWS_SECRET_ACCESS_KEY: '${process.env['AWS_SECRET_ACCESS_KEY']}',
  AWS_BUCKET_NAME: '${process.env['AWS_BUCKET_NAME']}',
  HUBTEL_PAY: '${process.env['HUBTEL_PAY']}',
  MIDDLEFUND_LOGO: '${process.env['MIDDLEFUND_LOGO']}',
  MOBILE_NUMBER: '${process.env['MOBILE_NUMBER']}',
  HUBTEL_CLIENT_ID: '${process.env['HUBTEL_CLIENT_ID']}',
  HUBTEL_CLIENT_SECRET: '${process.env['HUBTEL_CLIENT_SECRET']}',
  production: true,
};
`;
  const envConfigFileDev = `export const environment = {
  appVersion: '${appVersion}',
  BACKEND_URL: '${process.env['DEV_BACKEND_URL']}',
  AWS_REGION: '${process.env['AWS_REGION']}',
  AWS_ACCESS_KEY_ID: '${process.env['AWS_ACCESS_KEY_ID']}',
  AWS_SECRET_ACCESS_KEY: '${process.env['AWS_SECRET_ACCESS_KEY']}',
  AWS_BUCKET_NAME: '${process.env['AWS_BUCKET_NAME']}',
  HUBTEL_PAY: '${process.env['HUBTEL_PAY']}',
  MIDDLEFUND_LOGO: '${process.env['MIDDLEFUND_LOGO']}',
  MOBILE_NUMBER: '${process.env['MOBILE_NUMBER']}',
  HUBTEL_CLIENT_ID: '${process.env['HUBTEL_CLIENT_ID']}',
  HUBTEL_CLIENT_SECRET: '${process.env['HUBTEL_CLIENT_SECRET']}',
  production: false,
};
`;
  console.log(
    'The file `environment.ts` will be written with the following content: \n',
    envConfigFileProd,
  );
  console.log(
    'The file `environment.development.ts` will be written with the following content: \n',
    envConfigFileDev,
  );
  writeFile(targetPathDev, envConfigFileDev, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.development.ts file generated correctly at ${targetPathDev} \n`,
      );
    }
  });
  writeFile(targetPathProd, envConfigFileProd, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPathProd} \n`,
      );
    }
  });
};

setEnv();
