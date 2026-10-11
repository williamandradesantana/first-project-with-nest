import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface.js';
import { CreateUserDTO } from './dtos/create-user.dto.js';
import { UserResponseDTO } from './dtos/user-response.dto.js';
import { toResponse, toUpdateUser, toUser } from './mappers/user.mapper.js';
import { UpdateUserDTO } from './dtos/user-update.dto.js';
import { randomUUID } from 'crypto';
import { PasswordService } from './../password/password.service.js';

@Injectable()
export class UserServices {
  private readonly users: User[] = [
    {
      id: randomUUID(),
      userName: 'user-1',
      fullName: 'fullName',
      email: 'email@email.com',
      password: 'password',
      age: 21,
    },
  ];

  constructor(private readonly passwordService: PasswordService) {}

  async findAll(): Promise<UserResponseDTO[]> {
    return this.users.map((user) => toResponse(user));
  }

  async getOne(id: string): Promise<UserResponseDTO> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found!`);
    return toResponse(user);
  }

  async create(request: CreateUserDTO): Promise<UserResponseDTO> {
    const hashedPassword = await this.passwordService.hash(request.password);

    const user = toUser({ ...request, password: hashedPassword });
    console.log('Password: ', user.password);
    this.users.push(user);
    return toResponse(user);
  }

  async update(id: string, request: UpdateUserDTO): Promise<UserResponseDTO> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1)
      throw new NotFoundException(`User with id ${id} not found!`);

    const updatedUser = toUpdateUser(this.users[index], request);

    this.users[index] = updatedUser;

    return toResponse(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1)
      throw new NotFoundException(`User with id ${id} not found!`);
    this.users.splice(index, 1);
  }
}
