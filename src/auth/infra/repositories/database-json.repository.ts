import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from '../../data/dto/credentials.dto';
import { ValidCredentialsDto } from '../../data/dto/valid-credentials.dto';
import { AuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { readFile, writeFile } from 'fs/promises';
import { AuthenticatedUserDto } from '../../data/dto/authenticated-user.dto';
import * as path from 'path';

@Injectable()
export class DatabaseJsonRepository implements AuthRepository {
  filepath: string;
  constructor() {
    this.filepath = path.resolve(__dirname, '../../../../data/db.json');
  }

  async _currentFileContent() {
    const fileContent = await readFile(this.filepath);
    return JSON.parse(fileContent.toString());
  }

  async getCredentials({
    email: postedEmail,
    password: postedPassword,
  }: CredentialsDto): Promise<ValidCredentialsDto> {
    const data = await this._currentFileContent();
    const user = data.find(({ email }) => email == postedEmail);

    if (user) {
      const { id, email, password } = user;
      if (password === postedPassword) {
        return {
          id,
          email,
          isValid: true,
        };
      }
      throw new UnauthorizedException('Invalid password');
    }

    throw new UnauthorizedException();
  }

  async authenticate(
    credential: ValidCredentialsDto,
  ): Promise<AuthenticatedUserDto> {
    let response: AuthenticatedUserDto;

    if (credential.isValid) {
      const currentFile = await this._currentFileContent();
      const newState = [];
      currentFile.map((item) => {
        if (item.id === credential.id) {
          item.token = `${
            new Date().getTime() + Math.floor(Math.random() * 9000000) + 1000000
          }`;
          response = item;
        }

        newState.push(item);
      });

      await writeFile(this.filepath, JSON.stringify(newState));

      return response;
    }
  }
  getToken(credential: ValidCredentialsDto): Promise<any> {
    console.log(credential);
    throw new Error('Method not implemented.');
  }
  updateToken(credential: ValidCredentialsDto): Promise<any> {
    console.log(credential);
    throw new Error('Method not implemented.');
  }
  revokeToken(token: string): Promise<any> {
    console.log(token);
    throw new Error('Method not implemented.');
  }
}
