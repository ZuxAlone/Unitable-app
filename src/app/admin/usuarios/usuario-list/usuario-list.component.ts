import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuariosFollowed!: Usuario[];
  usuariosOthers!: Usuario[] ;

  usuariosFollowedFiltered!: Usuario[];
  usuariosOthersFiltered!: Usuario[];

  followedFilter: string = "";
  othersFilter: string = "";

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getFollowedUsuarios().subscribe((data: Usuario[]) => {
      this.usuariosFollowed = data;
      this.filterFollowedUsuarios(this.followedFilter);
    })
    this.usuarioService.getOtherUsuarios().subscribe((data: Usuario[]) => {
      this.usuariosOthers = data;
      this.filterOtherUsuarios(this.othersFilter);
    });
  }

  filterFollowedUsuarios(filter: string): void {
    if (filter == "") {
      this.usuariosFollowedFiltered = this.usuariosFollowed;
    }
    else {
      this.usuariosFollowedFiltered = [];
      for (let i = 0; i < this.usuariosFollowed.length; i++) {
        const nombres = this.usuariosFollowed[i].nombres;
        const apellidos = this.usuariosFollowed[i].apellidos;
        if (nombres && apellidos) {
          let completo: string = nombres + " " + apellidos;
          if (completo.indexOf(filter) != -1) {
            this.usuariosFollowedFiltered.push(this.usuariosFollowed[i]);
          }
        }
      }
    }
  }

  filterOtherUsuarios(filter: string): void {
    if (filter == "") {
      this.usuariosOthersFiltered = this.usuariosOthers;
    }
    else {
      this.usuariosOthersFiltered = [];
      for (let i = 0; i < this.usuariosOthers.length; i++) {
        const nombres = this.usuariosOthers[i].nombres;
        const apellidos = this.usuariosOthers[i].apellidos;
        if (nombres && apellidos) {
          let completo: string = nombres + " " + apellidos;
          if (completo.indexOf(filter) != -1) {
            this.usuariosOthersFiltered.push(this.usuariosOthers[i]);
          }
        }
      }
    }
  }

  followUsuario(followedId: number): void {
    this.usuarioService.followUsuario(followedId).subscribe((data:any) => {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    })
  }

}
