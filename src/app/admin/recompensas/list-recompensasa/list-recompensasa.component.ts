import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Recompensa } from '../shared/recompensa.model';
import { RecompensaService } from '../shared/recompensa.service';

@Component({
  selector: 'app-list-recompensasa',
  templateUrl: './list-recompensasa.component.html',
  styleUrls: ['./list-recompensasa.component.css']
})
export class ListRecompensasaComponent implements OnInit {

  recompensas: any = [];
  recompensasFiltradas: Recompensa[] =[];
  
  constructor(private recompensaService:RecompensaService, private router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.recompensaService.getRecompensasByUsuario()
    .subscribe((data:any[])=>{
      if(data.length != 0 || data != null){
        this.recompensas = data;
        console.log(data)
        console.log(this.recompensas)
      }
      else{
        console.log("NO HAY RECOMPENSAS POR LISTAR")
      }
    })
  }
  
  deleteRecompensa(id:number, name:string){
    const ok = confirm(`¿Estas seguro de eliminar la recompensa '${name}'?`);
    if(ok){
      this.recompensaService.deleteRecompensa(id)
      .subscribe(()=>{
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      });
    }
  }
}
