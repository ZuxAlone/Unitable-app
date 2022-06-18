import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actividad, ActividadReq, Tema } from './actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private apiBase: string = environment.apiBase;

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Actividad[]>(`${this.apiBase}/Actividad/actividades`)
  }

  getAllTemas(){
    return this.http.get<Tema[]>(`${this.apiBase}/Tema`)
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

  terminarActividad(id:number, actividadReq:ActividadReq){
    return this.http.put(`${this.apiBase}/Actividad/finish/${id}`, actividadReq)
  }
}
