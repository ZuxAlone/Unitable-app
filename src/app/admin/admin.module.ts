import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { UsuarioInfoComponent } from './usuarios/usuario-info/usuario-info.component';
import { MaterialModule } from '../material/material.module';
import { NewActividadComponent } from './actividades/new-actividad/new-actividad.component';
import { ListActividadComponent } from './actividades/list-actividad/list-actividad.component';
import { EditActividadComponent } from './actividades/edit-actividad/edit-actividad.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListViewComponent } from './actividades/shared/list-view/list-view.component';
import { UsuarioEditComponent } from './usuarios/usuario-edit/usuario-edit.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { TestActividadComponent } from './actividades/test-actividad/test-actividad.component';
import { ListGrupoComponent } from './grupos/grupos/list-grupo/list-grupo.component';
import { NewGrupoComponent } from './grupos/grupos/new-grupo/new-grupo.component';
import { ChatGrupoComponent } from './grupos/grupos/chat-grupo/chat-grupo.component';
import { AlertViewComponent } from './actividades/shared/alert-view/alert-view.component';
import { TiendaRecompensasComponent } from './recompensas/tienda-recompensas/tienda-recompensas.component';
import { ListRecompensasaComponent } from './recompensas/list-recompensasa/list-recompensasa.component';


@NgModule({
  declarations: [
    LayoutComponent,
    UsuarioInfoComponent,

    NewActividadComponent,
    ListActividadComponent,
    EditActividadComponent,

    ListViewComponent,
      UsuarioEditComponent,
      UsuarioListComponent,
      TestActividadComponent,
      ListGrupoComponent,
      NewGrupoComponent,
      ChatGrupoComponent,
      AlertViewComponent,
      TiendaRecompensasComponent,
      ListRecompensasaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
