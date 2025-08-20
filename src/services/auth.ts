import type {Token} from '@/services/types.ts';

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
