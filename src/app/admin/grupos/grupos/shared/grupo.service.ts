import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Grupo, GrupoRequest, TemaRequest, CursoRequest, Tema, Curso, GrupoResponse, Mensaje } from './grupo.model';
import { Usuario } from '../shared/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private apiBase: string = environment.apiBase;

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Grupo[]>(`${this.apiBase}/Grupo`)
  }

  getAllRec(){
    return this.http.get<Grupo[]>(`${this.apiBase}/Grupo/others`)
  }

  joinGrupo(GrupoId:number){
    return this.http.post(`${this.apiBase}/Grupo/Join/${GrupoId}`, {})
  }

  getGrupoById(grupoId:number){
    return this.http.get<GrupoResponse>(`${this.apiBase}/Grupo/${grupoId}`)
  }

  getMensajes(ChatId:number){
    return this.http.get<Mensaje[]>(`${this.apiBase}/Mensaje/${ChatId}`)
  }

  postGrupo(grupo:GrupoRequest){
    return this.http.post(`${this.apiBase}/Grupo`, grupo)
  }

  enviarMensaje(mensaje:string, charId:number){
    return this.http.post(`${this.apiBase}/Mensaje`, {
      mensajeTexto: mensaje,
      chatId: charId
    })
  }

  deleteGrupo(index:any){
    return this.http.delete(`${this.apiBase}/Grupo?GrupoId=${index}`)
  }

  getUsuario(){
    return this.http.get<Usuario>(`${this.apiBase}/Usuario`)
  }

  // ---------------------------- //

  getTema(){
    return this.http.get<Tema[]>(`${this.apiBase}/Tema`)
  }

  postTema(tema:TemaRequest){
    return this.http.post(`${this.apiBase}/Tema`, tema)
  }

  getCurso(){
    return this.http.get<Curso[]>(`${this.apiBase}/Curso`)
  }

  postCurso(curso:CursoRequest){
    return this.http.post(`${this.apiBase}/Curso`, curso)
  }

}
