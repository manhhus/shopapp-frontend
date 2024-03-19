import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';

    constructor(private jwtHelperService: JwtHelperService) { }
    
    getToken(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.TOKEN_KEY);
        }
        return null;
    }
    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }
    getUserId(): number {
        const token = this.getToken();
        if (token) {
            const userObject = this.jwtHelperService.decodeToken(token);
            if (userObject && 'userId' in userObject) {
                return parseInt(userObject['userId']);
            }
        }
        return 0;
    }

    isTokenExpired(): boolean {
        if (this.getToken() == null) {
            return false;
        }
        return this.jwtHelperService.isTokenExpired(this.getToken()!);
    }
}