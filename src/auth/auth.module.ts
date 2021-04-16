import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { DatabaseJsonRepository } from './infra/repositories/database-json.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DatabaseJsonRepository],
})
export class AuthModule {}
