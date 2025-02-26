import { Client } from "@/modules/auth/models/ClientModel"

export interface IAuthRequest {
    email: string,
    password: string
}

export interface IAuthResponse {
    accessToken: string,
    refreshToken: string
}

export interface IAccountResponse {
    client: Client
}

// active and debitCardNumber shouldnt be a property sent by the backend
export interface IAccountPutRequest extends
    Omit<Client, | 'email' | 'id' | 'active' | 'country' | 'fullName' | 'debitCardNumber'> {
    receiveNewsLetter: boolean;
    preferredLanguage: string;
}

export interface IRefreshTokenRequest {
    refreshToken: string
}

export interface IAccountCreateRequest extends
    Pick<Client, | 'email' | 'firstName' | 'lastName'> {
    password: string
    receiveNewsLetter: boolean;
    activationLink: string;
}

export interface IAccountCreateResponse {
    clientId: string
}

export interface IForgetPasswordRequest {
    email: string
    resetPasswordLink: string
}

export interface IResetPasswordRequest {
    email: string,
    token: string,
    newPassword: string
}

export interface IVerifyRequest {
    email: string,
    token: string,
}

export interface ISendVerificationCodeRequest {
    email: string,
    verificationLink: string,
}