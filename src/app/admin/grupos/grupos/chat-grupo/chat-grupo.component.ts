import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoResponse, Mensaje } from '../shared/grupo.model';
import { GrupoService } from '../shared/grupo.service';
import { UserStorageService } from '../../../../auth/shared/user-storage.service' 
import { Usuario } from '../shared/usuario.model';

@Component({
  selector: 'app-chat-grupo',
  templateUrl: './chat-grupo.component.html',
  styleUrls: ['./chat-grupo.component.css']
})
export class ChatGrupoComponent implements OnInit {

  grupoId:number
  usuario:Usuario = {
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    carrera: "",
    numActCompletas: 0,
    numTestAprobados: 0,
    numMonedas: 0,
    isPremium: false,
    status: false,
    id:0,
    tipo: 0
  }

  grupo?:GrupoResponse

  mensajes:Mensaje[] = []
  mensaje:string = ""
  

  constructor(private grupoService:GrupoService, private router:Router) {
    this.grupoId = Number.parseInt(this.router.url.split("/")[3]);
  }

  ngOnInit(): void {

    this.grupoService.getUsuario().subscribe((data:Usuario) => {
      this.usuario = data
    })

    this.grupoService.getGrupoById(this.grupoId).subscribe(data => {
      this.grupo = data
      this.grupoService.getMensajes(this.grupo.chatId).subscribe(data => {
        this.mensajes = data
        console.log(this.mensajes)
      })
    })

  }

  enviarMensaje():void{
    console.log(this.mensaje)
  
    if (this.grupo != null)
      this.grupoService.enviarMensaje(this.mensaje, this.grupo.chatId).subscribe(x => {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      })

    this.mensaje = ""
  }

}
