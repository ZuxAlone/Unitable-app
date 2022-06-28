import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RecompensaService } from '../shared/recompensa.service';

@Component({
  selector: 'app-tienda-recompensas',
  templateUrl: './tienda-recompensas.component.html',
  styleUrls: ['./tienda-recompensas.component.css']
})
export class TiendaRecompensasComponent implements OnInit {

  recompensas: any = [];

  constructor(private recompensaService:RecompensaService, private router:Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.recompensaService.getAll()
    .subscribe((data:any[])=>{
      if(data.length != 0){
        this.recompensas = data;
      }
      else{
        console.log("NO HAY RECOMPENSAS POR LISTAR")
      }
    })
  }

  comprarRecompensa(id: number){
    this.recompensaService.comprarRecompensa(id)
    .subscribe((data:any)=>{
      if(data != null){
        this.router.navigate(["/admin/recompensas/usuario"]);
      }
      else{
        
        this.openSnackBar("NO TIENES SUFICIENTES MONEDAS","WARNING")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2 * 1000,
    });
  }

}
