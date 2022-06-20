import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios!: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getOtherUsuarios();
  }

  getOtherUsuarios(): void {
    this.usuarioService.getOtherUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

}
