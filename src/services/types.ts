export type Role = 'admin' | 'user';

export interface UserFormValues {
    username: string;
    password: string;
}

export interface UserDTO extends UserFormValues {
    id: string;
    role: Role;
}

export interface Token {
    username: string;
    role: Role;
}
