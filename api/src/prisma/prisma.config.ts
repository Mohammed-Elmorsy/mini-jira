import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { getConfigPath } from '../configs/configuration'

export function getPrismaConfig(configService: ConfigService) {
  // Load environment variables from the appropriate .env file
  dotenv.config({ path: getConfigPath() })

  return {
    datasources: {
      db: {
        url: configService.get('DATABASE_URL'),
      },
    },
  }
}
