import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditActividadComponent } from '../edit-actividad/edit-actividad.component';
import { NewActividadComponent } from '../new-actividad/new-actividad.component';
import { Actividad, ActividadReq, Curso, Tema } from '../shared/actividad.model';
import { ActividadService } from '../shared/actividad.service';
import { TestActividadComponent } from '../test-actividad/test-actividad.component';

@Component({
  selector: 'app-list-actividad',
  templateUrl: './list-actividad.component.html',
  styleUrls: ['./list-actividad.component.css']
})
export class ListActividadComponent implements OnInit {

  actividades: Actividad[] = [];
  temas: Tema[] = [];
  cursos: Curso[] = [];
  cursito!: Curso;
  testId!: number;
  tema!: Tema;

  actividadesFiltradas: Actividad[] = [];
  opcionFiltro: string = "Todo";

  NfechaIni: number = Date.now();
  NfechaFin: number = Date.now();

  fechaIni: Date = new Date(0);
  fechaFin: Date = new Date(0);

  temaElegido!: string;

  constructor(private actividadService:ActividadService, public dialog: MatDialog, private router:Router) {
   }

  ngOnInit(): void {
    this.getAll();
    this.getAllCursos();
  }

  getAll():void{
    this.actividadService.getAll()
    .subscribe((data:Actividad[])=>{
      this.actividades = data;

      for(let i = 0; i < this.actividades.length; i++){
        this.replaceTemaById(this.actividades[i].temaId, i);
      }

      this.filtrarActividadesPor(this.opcionFiltro);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewActividadComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog2(id:number, actividadReq:any) {
    const dialogRef = this.dialog.open(EditActividadComponent,{data:{actividad:{nombre: actividadReq.nombre, 
    detalles: actividadReq.detalles, fecha_ini: actividadReq.fecha_ini, fecha_fin: actividadReq.fecha_fin}, id:id}});

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  opentTestDialog(id:number, actividadId:number, actividadReq:any){
    const dialogRef = this.dialog.open(TestActividadComponent,{width: '800px', height: '800px', data:{id:id, actividadId:actividadId,actividad:{nombre: actividadReq.nombre, 
      detalles: actividadReq.detalles, fecha_ini: actividadReq.fecha_ini, fecha_fin: actividadReq.fecha_fin}},});
  }

  deleteActividad(id:number, name:string){
    const ok = confirm(`¿Estas seguro de eliminar la actividad '${name}'?`);
    if(ok){
      this.actividadService.deleteActividad(id)
      .subscribe(()=>{
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      });
    }
  }

  goToTest(id:number, actividad:ActividadReq){
    const ok = confirm(`¿Estas seguro de terminar la actividad '${actividad.nombre}'?`);
    if(ok){
      this.actividadService.goToTest(id, actividad)
      .subscribe((data: any)=>{
        this.testId = data as number
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);

        this.opentTestDialog(this.testId, id, actividad);
      });
    }
  }

  replaceTemaById(id: number, index: number){
    this.actividadService.getTemaById(id)
    .subscribe((data:Tema)=>{
      this.actividades[index].tema = data;
    })
  }

  filtrarActividadesPor(opcion: string){
    if(opcion == "Todo"){
      this.actividadesFiltradas = [];
      this.actividadesFiltradas = this.actividades;
    }
    else if(opcion == "Filtrar por fecha de inicio mas antigua"){
      this.actividadesFiltradas = [];
      this.actividadesFiltradas = this.actividades;

      this.actividadesFiltradas.sort(function (a, b) { 
        var firstDate = new Date(a.horaIni),
          SecondDate = new Date(b.horaIni);
          
        if (firstDate < SecondDate) return -1;
        if (firstDate > SecondDate) return 1;
        return 0;
      })
    }
    else if(opcion == "Filtrar por fecha de inicio mas reciente"){
      this.actividadesFiltradas = [];
      this.actividadesFiltradas = this.actividades;

      this.actividadesFiltradas.sort(function (a, b) { 
        var firstDate = new Date(a.horaIni),
          SecondDate = new Date(b.horaIni);
          
        if (firstDate < SecondDate) return 1;
        if (firstDate > SecondDate) return -1;
        return 0;
      })
    }
    else if(opcion == "Filtrar por rango de fechas"){
      this.actividadesFiltradas = [];

      let inidate = String(this.NfechaIni).split("-").map(Number);
      let findate = String(this.NfechaFin).split("-").map(Number);

      this.fechaIni.setFullYear(inidate[0], inidate[1], inidate[2]);
      this.fechaIni.setUTCHours(0,0,0);
      this.fechaFin.setFullYear(findate[0], findate[1], findate[2]);
      this.fechaFin.setUTCHours(0,0,0);

      //console.log(this.fechaIni.getFullYear().toString() + "/" + this.fechaIni.getMonth().toString() + "/" + this.fechaIni.getDay().toString());
      //console.log(this.fechaFin.getFullYear().toString() + "/" + this.fechaFin.getMonth().toString() + "/" + this.fechaFin.getDay().toString());

      for(let i = 0; i < this.actividades.length; i++){
        var horaIni = new Date(this.actividades[i].horaIni),
        horaFin = new Date(this.actividades[i].horaFin);

        if(this.fechaIni < horaIni && this.fechaFin > horaIni && this.fechaIni < horaFin && this.fechaFin > horaFin){
          this.actividadesFiltradas.push(this.actividades[i]);
        }
      }
    }
    else if(opcion == "Filtrar por Tema"){
      this.actividadesFiltradas = [];

      for(let i = 0; i < this.actividades.length; i++){
        if(this.actividades[i].tema.nombre == this.temaElegido){
          this.actividadesFiltradas.push(this.actividades[i]);
        }
      }
    }
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
