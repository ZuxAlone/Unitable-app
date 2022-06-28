import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actividad, ActividadReq, Curso, Tema, Test, Pregunta, Respuesta } from './actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private apiBase: string = environment.apiBase;

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Actividad[]>(`${this.apiBase}/Actividad/actividades`)
  }

  getTemasByCurso(id: number){
    return this.http.get<Tema[]>(`${this.apiBase}/Tema/temas/${id}`)
  }

  getAllCursos(){
    return this.http.get<Curso[]>(`${this.apiBase}/Curso`)
  }

  createActividad(actividadReq:ActividadReq){
    return this.http.post(`${this.apiBase}/Actividad`, actividadReq)
  }

  deleteActividad(id: number){
    return this.http.delete(`${this.apiBase}/Actividad/${id}`)
  }
  editActividad(id:number, actividadReq:ActividadReq){
    return this.http.put(`${this.apiBase}/Actividad/${id}`, actividadReq)
  }

  goToTest(id:number, actividadReq:ActividadReq){
    return this.http.put(`${this.apiBase}/Actividad/test/${id}`, actividadReq)
  }
  
  terminarActividad(id:number, aprobo:boolean, actividadReq:any){
    return this.http.put(`${this.apiBase}/Actividad/finish/${id}?verificar=${aprobo}`, actividadReq)
  }

  getTest(id: number){
    return this.http.get<Test>(`${this.apiBase}/Test/test/${id}`)
  }

  getPreguntasByTest(id: number){
    return this.http.get<Pregunta[]>(`${this.apiBase}/Pregunta/preguntas/${id}`)
  }

  getRespuestasByPregunta(id: number){
    return this.http.get<Respuesta[]>(`${this.apiBase}/Respuesta/respuestas/${id}`)
  }

  TestResultado(boolean:boolean[]){
    return this.http.post(`${this.apiBase}/Test/resultado`, boolean)
  }

  getTemaById(id: number){
    return this.http.get<Tema>(`${this.apiBase}/Tema/tema/${id}`)
  }
}
