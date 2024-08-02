export class CreateUserDto {
    _id?: number;
    name: string;
    email: string;
    password: string;
    role?: number;
    status?: string;
}