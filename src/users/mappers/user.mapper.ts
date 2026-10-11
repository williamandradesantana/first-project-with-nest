import { randomUUID } from 'crypto';
import { CreateUserDTO } from '../dtos/create-user.dto.js';
import { User } from '../interfaces/user.interface.js';
import { UserResponseDTO } from '../dtos/user-response.dto.js';
import { UpdateUserDTO } from '../dtos/user-update.dto.js';

export function toUser({
  userName,
  fullName,
  email,
  password,
  age,
}: CreateUserDTO): User {
  return {
    id: randomUUID(),
    userName,
    fullName,
    email,
    password,
    age,
  };
}

export function toUpdateUser(user: User, request: UpdateUserDTO): User {
  return {
    ...user,
    ...request,
  };
}

export function toResponse({
  id,
  userName,
  fullName,
  email,
  age,
}: User): UserResponseDTO {
  return {
    id,
    userName,
    fullName,
    email,
    age,
  };
}
