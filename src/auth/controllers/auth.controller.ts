import { Controller } from '@nestjs/common';
import { AuthService } from '../domain/services/auth.service';
import { CredentialsDto } from '../data/dto/credentials.dto';
import { AuthenticatedUserDto } from '../data/dto/authenticated-user.dto';
import { ValidCredentialsDto } from '../data/dto/valid-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }
  async getCredentials({
    email,
    password,
  }: CredentialsDto): Promise<ValidCredentialsDto> {
    const credentials = await this.authService.getCredentials({
      email,
      password,
    });

    return credentials;
  }

  async authenticate(
    credentials: ValidCredentialsDto,
  ): Promise<AuthenticatedUserDto> {
    const authenticatedUser = await this.authService.authenticate(credentials);
    return authenticatedUser;
  }
}
