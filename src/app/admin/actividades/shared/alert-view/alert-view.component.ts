import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestActividadComponent } from '../../test-actividad/test-actividad.component';
import { ActividadService } from '../actividad.service';

@Component({
  selector: 'app-alert-view',
  templateUrl: './alert-view.component.html',
  styleUrls: ['./alert-view.component.css']
})
export class AlertViewComponent implements OnInit {

  constructor(private actividadService:ActividadService, public dialogRef: MatDialogRef<TestActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
