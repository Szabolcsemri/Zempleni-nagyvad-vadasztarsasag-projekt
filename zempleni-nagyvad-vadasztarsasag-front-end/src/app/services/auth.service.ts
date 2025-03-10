import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private apiURL = 'http://localhost:5000';
    private loginallapot = new BehaviorSubject<boolean>(this.isLoggedIn());
    constructor(private http: HttpClient) {}
    registerFelhasznalo(felhasznaloAdat: {nev: string, email: string, jelszo: string}): Observable<any>{
        return this.http.post(`${this.apiURL}/register`, felhasznaloAdat);
    }
    setToken(token:string){
        localStorage.setItem('token',token);
        this.loginallapot.next(true);
    }
    getToken():string|null{
        return localStorage.getItem('token');
    }
    clearToken(){
        localStorage.removeItem('token');
        this.loginallapot.next(false);
    }
    isLoggedIn():boolean{
        return !!this.getToken();
    }
    getLoginallapot():Observable<boolean>{
        return this.loginallapot.asObservable();
        
    }
    getFelhasznaloTipus():number{
        const token = this.getToken();
        if (!token){
            return 0;
        }
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.tipus;
    }
    isAdmin():boolean{
        return this.getFelhasznaloTipus() === 1;
    }
    
}
