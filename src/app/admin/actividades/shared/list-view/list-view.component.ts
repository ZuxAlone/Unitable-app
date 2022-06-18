import { Component, OnInit } from '@angular/core';
import { Actividad } from '../actividad.model';
import { ActividadService } from '../actividad.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  actividades: Actividad[] = [];
  actividadDisplay: any[] = [];

  constructor(private actividadService:ActividadService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll():void{
    this.actividadService.getAll()
    .subscribe((data:Actividad[])=>{
      this.actividades = data;
    })
  }

}
