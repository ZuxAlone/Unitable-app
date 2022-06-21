import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditActividadComponent } from './actividades/edit-actividad/edit-actividad.component';
import { ListActividadComponent } from './actividades/list-actividad/list-actividad.component';
import { NewActividadComponent } from './actividades/new-actividad/new-actividad.component';
import { ChatGrupoComponent } from './grupos/grupos/chat-grupo/chat-grupo.component';
import { ListGrupoComponent } from './grupos/grupos/list-grupo/list-grupo.component';
import { NewGrupoComponent } from './grupos/grupos/new-grupo/new-grupo.component';
import { LayoutComponent } from './layout/layout.component';
import { UsuarioInfoComponent } from './usuarios/usuario-info/usuario-info.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "usuario-info",
        component: UsuarioInfoComponent
      },
      {
        path: "usuarios",
        component: UsuarioListComponent
      },
      {
        path: "actividades",
        component:ListActividadComponent,
      },
      {
        path:'actividades/nuevo',
        component:NewActividadComponent,
      },
      {
        path:'actividades/:id/editar',
        component:EditActividadComponent,
      },
      {
        path:'grupos',
        component:ListGrupoComponent,
      },
      {
        path:'grupos/nuevo',
        component:NewGrupoComponent,
      },
      {
        path:'grupos/:id/chat',
        component:ChatGrupoComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
