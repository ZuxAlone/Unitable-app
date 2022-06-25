import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario, UsuarioEdit } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiBase: string = environment.apiBase;

  constructor(private http: HttpClient) { }

  getUsuarioInfo() {
    return this.http.get<Usuario>(`${this.apiBase}/Usuario`);
  }

  getFollowedUsuarios() {
    return this.http.get<Usuario[]>(`${this.apiBase}/Usuario/followed`);
  }

  getOtherUsuarios() {
    return this.http.get<Usuario[]>(`${this.apiBase}/Usuario/others`);
  }

  updateUsuario(usuarioEdit: UsuarioEdit) {
    return this.http.put<Usuario>(`${this.apiBase}/Usuario`, usuarioEdit);
  }

  deleteUsuario() {
    return this.http.delete<any>(`${this.apiBase}/Usuario`);
  }

  get_cancel_premium() {
    return this.http.put<any>(`${this.apiBase}/Usuario/premium`, {});
  }

  followUsuario(followedId: number) {
    return this.http.put<any>(`${this.apiBase}/Usuario/follow/${followedId}`, {});
  }

}
