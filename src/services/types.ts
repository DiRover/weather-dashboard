export const RoleName = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

export type Role = (typeof RoleName)[keyof typeof RoleName];

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
