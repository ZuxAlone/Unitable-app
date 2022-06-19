import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from '../shared/actividad.model';
import { ActividadService } from '../shared/actividad.service';

@Component({
  selector: 'app-edit-actividad',
  templateUrl: './edit-actividad.component.html',
  styleUrls: ['./edit-actividad.component.css']
})
export class EditActividadComponent implements OnInit {

  public invalid: boolean = true;
  editid:number
  actividad={
    nombre:"",
    detalles:"",
    fecha_ini_date: Date.now(),
    fecha_ini_time: new Date(0),
    fecha_fin_date: Date.now(),
    fecha_fin_time: new Date(0)
  }

  constructor(private actividadService:ActividadService, private router:Router) {
    this.editid = Number.parseInt(this.router.url.split("/")[3]);
  }

  ngOnInit(): void {
    this.getAll();
  }

  editActividad(){
    const act = {
      nombre: this.actividad.nombre,
      detalle: this.actividad.detalles,
      horaIni: new Date(this.actividad.fecha_ini_date),
      horaFin: new Date(this.actividad.fecha_fin_date),
      temaId : 0,
    }
    
    const inidate = String(this.actividad.fecha_ini_date).split("-").map(Number);
    const findate = String(this.actividad.fecha_fin_date).split("-").map(Number);

    const initime = String(this.actividad.fecha_ini_time).split(":").map(Number);
    const fintime = String(this.actividad.fecha_fin_time).split(":").map(Number);
    
    act.horaIni.setFullYear(inidate[0], inidate[1], inidate[2]);
    act.horaIni.setUTCHours(initime[0], initime[1], 0, 0);
  
    act.horaFin.setFullYear(findate[0], findate[1], findate[2]);
    act.horaFin.setUTCHours(fintime[0], fintime[1], 0, 0);

    this.actividadService.editActividad(this.editid,act)
      .subscribe(()=>{
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }, (error)=>{
      this.invalid = true;
      });
  }

  getAll():void{
    this.actividadService.getAll()
    .subscribe((data:Actividad[])=>{
      for(let i=0;i<data.length;i++){
        if(data[i].id == this.editid){
          this.actividad.nombre = data[i].nombre;
          this.actividad.detalles = data[i].detalle;
          //this.actividad.fecha_ini_date = data[i].horaIni.getFullYear();
          //this.actividad.fecha_ini_time.setUTCHours(data[i].horaIni.getUTCHours());
          //this.actividad.fecha_fin_date = data[i].horaFin.getFullYear();
          //this.actividad.fecha_fin_time.setUTCHours(data[i].horaFin.getUTCHours());
        }
      }
    })


  }


}
