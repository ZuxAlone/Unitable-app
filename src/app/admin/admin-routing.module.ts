import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditActividadComponent } from './actividades/edit-actividad/edit-actividad.component';
import { ListActividadComponent } from './actividades/list-actividad/list-actividad.component';
import { NewActividadComponent } from './actividades/new-actividad/new-actividad.component';
import { LayoutComponent } from './layout/layout.component';
import { UsuarioInfoComponent } from './usuarios/usuario-info/usuario-info.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
