import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { UsuarioEditComponent } from '../usuario-edit/usuario-edit.component';

@Component({
  selector: 'app-usuario-info',
  templateUrl: './usuario-info.component.html',
  styleUrls: ['./usuario-info.component.css']
})
export class UsuarioInfoComponent implements OnInit {

  usuario!: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsuarioInfo();
  }

  getUsuarioInfo(): void {
    this.usuarioService.getUsuarioInfo().subscribe((data)=> this.usuario=data);
  }

  updateUsuario(): void {
    const updDialog = this.dialog.open(UsuarioEditComponent, {data: {usuario: this.usuario}});

    updDialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  deleteUsuario(): void {
    const ok = confirm(`¿Está seguro que desea eliminar el usuario?`);
    if(ok){
      this.usuarioService.deleteUsuario()
      .subscribe(()=>{
        this.router.navigate(["/auth/login"]);
      });
    }
  }

  get_cancel_premium(): void {
    const ok = confirm(`¿Está seguro que desea realizar esta operación?`);
    if(ok) {
      this.usuarioService.get_cancel_premium()
      .subscribe((data) => {
        this.getUsuarioInfo();
      });
    }
  }

}
