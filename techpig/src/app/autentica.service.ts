import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from '@angular/fire/auth'
import { Usuario } from './Models/usuario';
interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AutenticaService {

  private userSubject = new BehaviorSubject<any>(null);
  private estaAutenticado = false;
  user: any;
  error: any;


  constructor(private http: HttpClient, public auth: AngularFireAuth) {
    const user = sessionStorage.getItem('user');
    if (user) {

      this.userSubject.next(JSON.parse(user));
    }
  }

  private setUserSubject(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getRoles() {
    return this.userSubject.getValue();
  }

  logout() {
    this.userSubject.next(null);
    sessionStorage.clear();
    this.auth.signOut();
  }
  signupUser(email: string, password: string): Observable<AuthResponseData> {
    const apiKey = 'AIzaSyB5w1o6q6kFHmEjJ1mao5AdPHHaX-dHv_Q';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    return this.http.post<AuthResponseData>(url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const user = new Usuario(
            resData.email,
            resData.localId,
            resData.idToken,
            expiracaoData
          );
          this.userSubject.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.setAutenticado(true);
        }),
      );
  }
  
  loginUser(email: string, password: string) {

    const apiKey = 'AIzaSyB5w1o6q6kFHmEjJ1mao5AdPHHaX-dHv_Q';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    return this.http.post<AuthResponseData>(url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const user = new Usuario(
            resData.email,
            resData.localId,
            resData.idToken,
            expiracaoData
          );
          this.userSubject.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.setAutenticado(true);
        }),
      );
  }
 

  setAutenticado(isAuthenticated: boolean) {
    this.estaAutenticado = isAuthenticated;
  }
}