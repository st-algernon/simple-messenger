export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    name: string
    username: string
    password: string
}

export interface TokenRequest {
    token: string,
    refreshToken: string
}

export interface AuthResponse {
    token: string,
    refreshToken: string,
    expiresIn: string
    result: string
    errors: string[]
}