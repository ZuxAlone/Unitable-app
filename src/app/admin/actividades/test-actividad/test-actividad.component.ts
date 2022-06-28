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
      let verf = [];
      let resp = [];

      let cont = 0;
      for(let i = 0; i < this.verificar.length; i++){
        if(this.verificar[i] == true){
          cont++;
        }
      }

      for(let i = 0; i < this.verificar.length; i++){
        if(this.verificar[i] == false){
          verf.push("La respuesta marcada es incorrecta")
        }
        else{
          verf.push("La respuesta marcada es correcta")
        }
      }
  
      for(let i = 0; i < this.respuestas.length; i++){
          for(let j = 0; j < this.respuestas[i].length; j++){
            if(this.respuestas[i][j].isCorrect == true){
              resp.push(this.respuestas[i][j])
            }
            else{
              continue;
            }
          }
      }

      if(this.percent >= 75){
        this.opentResultDialog("Resultados del test", 
          "Haz obtenido "+ cont.toString() +" respuestas correctas", " Obtuviste un "+ this.percent.toString() +"% de respuestas correctas",
          "APROBASTE",this.preguntas,resp,verf)
      }
      else{
        this.opentResultDialog("Resultados del test", 
          "Haz obtenido "+ cont.toString() +" respuestas correctas", "Obtuviste un "+ this.percent.toString() +"% de respuestas correctas",
          "DESAPROBASTE",this.preguntas,resp,verf)
      }
      this.onNoClick();
    })
  }

  opentResultDialog(titulo:any, msgI:any, msgF:any, msg_final:any,preg:any,resp:any,verf:any){
    const dialogRef = this.dialog.open(AlertViewComponent,{width: '400px', height: '700px', data:{titulo: titulo, msgI:msgI, msgF:msgF, msg_final:msg_final, preg:preg, resp:resp, verf:verf},});

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
