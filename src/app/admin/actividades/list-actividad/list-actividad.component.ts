import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditActividadComponent } from '../edit-actividad/edit-actividad.component';
import { NewActividadComponent } from '../new-actividad/new-actividad.component';
import { Actividad, ActividadReq } from '../shared/actividad.model';
import { ActividadService } from '../shared/actividad.service';
import { TestActividadComponent } from '../test-actividad/test-actividad.component';

@Component({
  selector: 'app-list-actividad',
  templateUrl: './list-actividad.component.html',
  styleUrls: ['./list-actividad.component.css']
})
export class ListActividadComponent implements OnInit {

  actividades: Actividad[] = [];
  testId!: number;

  constructor(private actividadService:ActividadService, public dialog: MatDialog, private router:Router) {
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll():void{
    this.actividadService.getAll()
    .subscribe((data:Actividad[])=>{
      this.actividades = data;})
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

  opentTestDialog(id:number){
    const dialogRef = this.dialog.open(TestActividadComponent,{width: '500px', height: '500px', data:{id:id},});

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
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

  terminarActividad(id:number, actividad:ActividadReq){
    const ok = confirm(`¿Estas seguro de terminar la actividad '${actividad.nombre}'?`);
    if(ok){
      this.actividadService.terminarActividad(id, actividad)
      .subscribe((data: any)=>{
        this.testId = data as number
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);

        this.opentTestDialog(this.testId);
      });
    }
  }
}
