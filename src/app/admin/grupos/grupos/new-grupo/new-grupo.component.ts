import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoService } from '../shared/grupo.service';
import { GrupoRequest, Tema } from "../shared/grupo.model"

@Component({
  selector: 'app-new-grupo',
  templateUrl: './new-grupo.component.html',
  styleUrls: ['./new-grupo.component.css']
})
export class NewGrupoComponent implements OnInit {

  grupoRq:GrupoRequest = {
    nombre: "Nuevo Grupo",
    descripcion: "Grupo para ...",
    detalleChat: "Normas del chat",
    temaId: -1
  }

  temas: Tema[] = [];
  tema_select: Tema = {
    id:0,
    status:false,
    nombre:"",
    contenido:"",
    cursoId:0,
    curso:{
      id:0,
      status: false,
      nombre: "",
      descripcion: ""
    }
  }

  constructor(private grupoService:GrupoService, private router:Router) { }

  ngOnInit(): void {
    this.getAllTemas()
  }

  getAllTemas():void{
    this.grupoService.getTema()
    .subscribe((data:any)=>{
      this.temas = data;
    })
  }

  crearGrupo():void{
    this.grupoRq.temaId = this.tema_select.id
    this.grupoService.postGrupo(this.grupoRq).subscribe((x)=>{
      console.log(x);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    })
  }

}
