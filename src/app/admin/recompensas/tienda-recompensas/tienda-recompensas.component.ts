import { UsuarioService } from './../../usuarios/shared/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Recompensa } from '../shared/recompensa.model';
import { RecompensaService } from '../shared/recompensa.service';

@Component({
  selector: 'app-tienda-recompensas',
  templateUrl: './tienda-recompensas.component.html',
  styleUrls: ['./tienda-recompensas.component.css']
})
export class TiendaRecompensasComponent implements OnInit {

  recompensas: Recompensa[] = [];

  recompensasFiltradas: Recompensa[] = [];
  
  opcionFiltro: string = "Todo";

  usuario: any;

  constructor(private usuarioService:UsuarioService, private recompensaService:RecompensaService, private router:Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAll(),
    this.getUsuarioInfo();
  }

  getUsuarioInfo(): void {
    this.usuarioService.getUsuarioInfo().subscribe((data)=> this.usuario=data);
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
      
      this.filtrarRecompensasPor(this.opcionFiltro);
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

  filtrarRecompensasPor(opcion: string){
    if(opcion == "Todo"){
      this.recompensasFiltradas = [];
      this.recompensasFiltradas = this.recompensas;
    }
    else if(opcion == "Mayor a menor precio"){
      this.recompensasFiltradas = [];
      this.recompensasFiltradas = this.recompensas;
      
      this.recompensasFiltradas.sort(function (a, b) { 
        var price1 =  a.precioMon,
          price2 = b.precioMon;
          
        if (price1 < price2) return 1;
        if (price1 > price2) return -1;
        return 0;
      })
    }
    else if(opcion == "Menor a mayor precio"){
      this.recompensasFiltradas = [];
      this.recompensasFiltradas = this.recompensas;

      this.recompensasFiltradas.sort(function (a, b) { 
        var price1 =  a.precioMon,
          price2 = b.precioMon;
          
        if (price1 < price2) return -1;
        if (price1 > price2) return 1;
        return 0;
      })
    }
    else if(opcion == "Dentro del presupuesto"){
      this.recompensasFiltradas = [];

      for( let i = 0; i < this.recompensas.length; i++){
        if(this.recompensas[i].precioMon <= this.usuario.numMonedas){
          this.recompensasFiltradas.push(this.recompensas[i])
        }
      }
      
    }
    else if(opcion == "Gratis"){
      this.recompensasFiltradas = [];

      for(let i = 0; i < this.recompensas.length; i++){
        if(this.recompensas[i].precioMon == 0){
          this.recompensasFiltradas.push(this.recompensas[i]);
        }
      }
    }
  }

}
