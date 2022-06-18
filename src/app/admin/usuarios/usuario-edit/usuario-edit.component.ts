import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario, UsuarioEdit } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario;
  usuarioEdit: UsuarioEdit = new UsuarioEdit();

  constructor(private usuarioService: UsuarioService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.usuario = this.data.usuario;
    this.usuarioEdit.nombres = this.usuario.nombres;
    this.usuarioEdit.apellidos = this.usuario.apellidos;
    this.usuarioEdit.carrera = this.usuario.carrera;
    this.usuarioEdit.tipo = this.usuario.tipo;
  }

  ngOnInit(): void {
  }

  updateUsuario(): void {
    this.usuarioService.updateUsuario(this.usuarioEdit).subscribe((data:any) => {
      alert("La información del usuario ha sido actualizada");
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    })
  }

}
