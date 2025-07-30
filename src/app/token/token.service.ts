import { Injectable } from "@angular/core";

@Injectable()
export class TokenService{
    private TOKEN_KEY = 'jwtToken';
    constructor(){}
    public setToken(token:string) : void{
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(this.TOKEN_KEY, token);
        }
    }
    public getToken() : string | null{
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(this.TOKEN_KEY);
        }
        return null
    }
    public removeToken() : void {
        if(typeof window == 'undefined')
            return
        sessionStorage.removeItem(this.TOKEN_KEY);
    }
}