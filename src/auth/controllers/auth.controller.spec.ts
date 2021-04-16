import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { DatabaseJsonRepository } from '../infra/repositories/database-json.repository';
import { AuthModule } from '../auth.module';
import { AuthService } from '../domain/services/auth.service';
import { CredentialsDto } from '../data/dto/credentials.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [AuthController],
      providers: [AuthService, DatabaseJsonRepository],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('Controller precisa existir', () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar erro ao receber email ou senha inválidos', async () => {
    const postedData: CredentialsDto = {
      email: 'reymaster@gmail.com',
      password: '--wrong-password--',
    };

    try {
      await controller.getCredentials(postedData);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('Deve receber email, senha, verificar se usuário existe na base de dados e fornecer um JWT caso exista', async () => {
    const postedData: CredentialsDto = {
      email: 'reymaster@gmail.com',
      password: '1234567',
    };
    const credentials = await controller.getCredentials(postedData);
    const authenticatedData = await controller.authenticate(credentials);

    expect(authenticatedData.token).not.toBeNull();
  });
});
