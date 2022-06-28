import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecompensaService {

  private apiBase: string = environment.apiBase;

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any[]>(`${this.apiBase}/Recompensa`)
  }

  comprarRecompensa(id: number){
    return this.http.post<any>(`${this.apiBase}/Recompensa/buy/${id}`, 0)
  }

  getRecompensasByUsuario(){
    return this.http.get<any[]>(`${this.apiBase}/Recompensa/recompensas`)
  }

  deleteRecompensa(id: number){
    return this.http.delete(`${this.apiBase}/Recompensa/recompensas/${id}`)
  }
}
