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

export interface MessageRequest {
    recipientIds: string[],
    subject: string,
    text: string
}

export interface AuthResponse {
    token: string,
    refreshToken: string,
    expiresIn: string
    result: string
    errors: string[]
}

export interface UsersResponse {
    result: string
    users: User[]
    errors: string[]
}

export interface MessagesResponse {
    result: string
    messages: Message[]
    errors: string[]
}

export interface User {
    id: string
    email: string
    name: string
    username: string
    password: string
}

export interface Message {
    id: string,
    author: User,
    recipient: User,
    subject: string,
    text: string,
    creationDate: string
}

export interface MessageView {
    id: string,
    contact: User,
    subject: string,
    text: string,
    creationDate: string,
}