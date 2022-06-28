import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';
import { TestActividadComponent } from '../../test-actividad/test-actividad.component';
import { ActividadService } from '../actividad.service';

@Component({
  selector: 'app-alert-view',
  templateUrl: './alert-view.component.html',
  styleUrls: ['./alert-view.component.css']
})
export class AlertViewComponent implements OnInit {

  titulo:any; 
  msgI:any;
  msgF:any;
  msg_final:any;
  preg:any = [];
  resp:any = [];
  verf:any = [];

  constructor(private actividadService:ActividadService, public dialogRef: MatDialogRef<TestActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.titulo = this.data.titulo,
    this.msgI = this.data.msgI,
    this.msgF = this.data.msgF,
    this.msg_final = this.data.msg_final,
    this.preg = this.data.preg,
    this.resp = this.data.resp,
    this.verf = this.data.verf

    console.log(this.verf)
    console.log(this.resp)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
