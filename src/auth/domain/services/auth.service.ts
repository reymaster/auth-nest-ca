import { Injectable } from '@nestjs/common';
import { AuthenticatedUserDto } from '../../data/dto/authenticated-user.dto';
import { CredentialsDto } from '../../data/dto/credentials.dto';
import { ValidCredentialsDto } from 'src/auth/data/dto/valid-credentials.dto';
import { DatabaseJsonRepository } from '../../infra/repositories/database-json.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: DatabaseJsonRepository) {
    this.authRepository = authRepository;
  }
  async getCredentials({ email, password }: CredentialsDto) {
    const credentials = await this.authRepository.getCredentials({
      email,
      password,
    });

    return credentials;
  }

  async authenticate(
    credentials: ValidCredentialsDto,
  ): Promise<AuthenticatedUserDto> {
    const authenticatedUser = await this.authRepository.authenticate(
      credentials,
    );

    return authenticatedUser;
  }
}
