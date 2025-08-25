import type {Token} from '@/helpers/types.ts';

//авторизация

const TOKEN_KEY = 'auth_token';

export function setToken(token: Token): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function getToken(): Token | null {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as Token;
    } catch {
        return null;
    }
}

export function deleteToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}
