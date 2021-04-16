import { ValidCredentialsDto } from '../../data/dto/valid-credentials.dto';
import { CredentialsDto } from '../../data/dto/credentials.dto';

export interface AuthRepository {
  getCredentials({
    email,
    password,
  }: CredentialsDto): Promise<ValidCredentialsDto>;
  authenticate(credential: ValidCredentialsDto): Promise<any>;
  getToken(credential: ValidCredentialsDto): Promise<any>;
  updateToken(credential: ValidCredentialsDto): Promise<any>;
  revokeToken(token: string): Promise<any>;
}
