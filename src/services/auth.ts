const TOKEN_KEY = 'auth_token';

export function saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    const base64 = btoa(binary);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export async function createAccessToken(
    username: string,
    password: string,
): Promise<string> {
    const encoder = new TextEncoder();
    const input = `${username}:${password}`;
    const data = encoder.encode(input);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const b64url = arrayBufferToBase64Url(digest);
    return `sha256.${b64url}`;
}
