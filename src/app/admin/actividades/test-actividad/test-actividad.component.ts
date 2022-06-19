import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Test } from '../shared/actividad.model';
import { ActividadService } from '../shared/actividad.service';

@Component({
  selector: 'app-test-actividad',
  templateUrl: './test-actividad.component.html',
  styleUrls: ['./test-actividad.component.css']
})
export class TestActividadComponent implements OnInit {

  test: any = {
    nombre: " ",
    descripcion: " "
  };

  constructor(private actividadService:ActividadService, public dialogRef: MatDialogRef<TestActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.getTest(this.data.id);
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

}
