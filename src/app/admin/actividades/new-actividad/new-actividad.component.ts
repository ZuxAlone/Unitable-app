import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso, Tema } from '../shared/actividad.model';
import { ActividadService } from '../shared/actividad.service';

@Component({
  selector: 'app-new-actividad',
  templateUrl: './new-actividad.component.html',
  styleUrls: ['./new-actividad.component.css']
})
export class NewActividadComponent implements OnInit {

  public invalid: boolean = true;

  temas: Tema[] = [];

  cursos: Curso[] = [];
  cursito: Curso = {
    id: 1,
    nombre: "",
    descripcion: "",
    status: true,
  }

  actividad={
    nombre:"",
    detalles:"",
    fecha_ini_date: Date.now(),
    fecha_ini_time: new Date(0),
    fecha_fin_date: Date.now(),
    fecha_fin_time: new Date(0),
    tema_id: 0
  }
  
  constructor(private actividadService:ActividadService, private router:Router) { }

  ngOnInit(): void {
    this.getAllCursos();
  }

  create(){
    const act = {
      nombre: this.actividad.nombre,
      detalle: this.actividad.detalles,
      horaIni: new Date(this.actividad.fecha_ini_date),
      horaFin: new Date(this.actividad.fecha_fin_date),
      temaId: this.actividad.tema_id,
    }
    
    const inidate = String(this.actividad.fecha_ini_date).split("-").map(Number);
    const findate = String(this.actividad.fecha_fin_date).split("-").map(Number);

    const initime = String(this.actividad.fecha_ini_time).split(":").map(Number);
    const fintime = String(this.actividad.fecha_fin_time).split(":").map(Number);
    
    act.horaIni.setFullYear(inidate[0], inidate[1], inidate[2]);
    act.horaIni.setUTCHours(initime[0], initime[1], 0, 0);
  
    act.horaFin.setFullYear(findate[0], findate[1], findate[2]);
    act.horaFin.setUTCHours(fintime[0], fintime[1], 0, 0);

    this.actividadService.createActividad(act)
      .subscribe((x)=>{
        console.log(x);
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }, (error)=>{
      this.invalid = true;
      });
  }

  getTemasByCurso():void{
    this.actividadService.getTemasByCurso(this.cursito.id)
    .subscribe((data:any)=>{
      this.temas = data;
    })
  }

  getAllCursos():void{
    this.actividadService.getAllCursos()
    .subscribe((data:any)=>{
      this.cursos = data;
    })
  }

}
