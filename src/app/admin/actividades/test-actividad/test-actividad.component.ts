import { AlertViewComponent } from './../shared/alert-view/alert-view.component';
import { Pregunta, Respuesta } from './../shared/actividad.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Test } from '../shared/actividad.model';
import { ActividadService } from '../shared/actividad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-actividad',
  templateUrl: './test-actividad.component.html',
  styleUrls: ['./test-actividad.component.css']
})
export class TestActividadComponent implements OnInit {

  percent:number = 0;

  test: any = {
    nombre: " ",
    descripcion: " "
  };

  preguntas: Pregunta[] = [];
  respuestas: any[] = [];
  verificar: any[] = [false, false, false, false, false];

  constructor(private actividadService:ActividadService, public dialogRef: MatDialogRef<TestActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private router:Router) {
    this.getTest(this.data.id);
    this.getPreguntasByTest(this.data.id);
  }

  ngOnInit(): void {
  }

  getTest(id:number){
    this.actividadService.getTest(id)
    .subscribe((data:Test)=>{
      console.log(data);
      this.test.nombre = data.nombre;
      this.test.descripcion = data.descripcion;
      console.log(this.test);
    })
  }

  getPreguntasByTest(id:number){
    this.actividadService.getPreguntasByTest(id)
    .subscribe((data:any)=>{
      this.preguntas = data;
      console.log(data)
      console.log(this.preguntas)

      for(let i = 0; i < this.preguntas.length; i++){
        this.getRespuestasByPregunta(this.preguntas[i].id)
      }
    })
  }

  getRespuestasByPregunta(id:number){
    this.actividadService.getRespuestasByPregunta(id)
    .subscribe((data:any)=>{
      this.respuestas.push(data)
      console.log(data)
      console.log(this.respuestas)
    })
  }

  TestResultado(boolean:boolean[]){
    this.actividadService.TestResultado(boolean)
    .subscribe((data:any)=>{
      this.percent = data;
      
      let cont = 0;
      for(let i = 0; i < this.verificar.length; i++){
        if(this.verificar[i] == true){
          cont++;
        }
      }
      if(this.percent >= 75){
        this.opentResultDialog("Resultados del test", 
          "Haz obtenido "+ cont.toString() +" respuestas correctas", " Obtuviste un "+ this.percent.toString() +"% de respuestas correctas",
          "APROBASTE")
      }
      else{
        this.opentResultDialog("Resultados del test", 
          "Haz obtenido "+ cont.toString() +" respuestas correctas", "Obtuviste un "+ this.percent.toString() +"% de respuestas correctas",
          "DESAPROBASTE")
      }
      this.onNoClick();
    })
  }

  opentResultDialog(titulo:any, msgI:any, msgF:any, msg_final:any){
    const dialogRef = this.dialog.open(AlertViewComponent,{width: '400px', height: '250px', data:{titulo: titulo, msgI:msgI, msgF:msgF, msg_final:msg_final},});

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
