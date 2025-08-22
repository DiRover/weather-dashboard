import type {UserDTO, UserFormValues} from '@/helpers/types.ts';

const USERS_KEY = 'users';

export function getUsers(): UserDTO[] {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) return [];
    try {
        return JSON.parse(users) as UserDTO[];
    } catch {
        return [];
    }
}

function saveUsers(users: UserDTO[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function createUser(user: UserFormValues) {
    const newUser: UserDTO = {
        id: crypto.randomUUID(),
        role: 'user',
        ...user,
    };
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);
}

export function deleteUser(id: string): void {
    const users = getUsers();
    const next = users.filter(u => u.id !== id);
    saveUsers(next);
}
