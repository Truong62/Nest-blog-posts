import fs from 'fs';
import path from 'path';
import { IsString, validateSync } from 'class-validator';
import { config } from 'dotenv';
import { plainToInstance } from 'class-transformer';

config({
  path: '.env',
});

if (!fs.existsSync(path.resolve('.env'))) {
  process.exit(1);
}

class ConfigScheme {
  DATABASE_URL: string;

  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string;

  @IsString()
  REFRESH_TOKEN_SECRET: string;

  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string;
}

const configService = plainToInstance(ConfigScheme, process.env);

const errorArray = validateSync(configService);

if (errorArray.length > 0) {
  console.log(errorArray);

  throw new Error('Invalid environment variables');
}

const envConfig: ConfigScheme = configService;
export default envConfig;
