import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from './login.model';
import { Signup } from './signup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBase: string = environment.apiBase;

  constructor(private http: HttpClient) { }

  login(loginModel: Login) {
    return this.http.post(`${this.apiBase}/Usuario/login`, loginModel);
  }

  signup(singupModel: Signup) {
    return this.http.post(`${this.apiBase}/Usuario/signup`, singupModel);;
  }
}
