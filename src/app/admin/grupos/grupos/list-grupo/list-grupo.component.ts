import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from '../shared/grupo.model';
import { GrupoService } from '../shared/grupo.service';

@Component({
  selector: 'app-list-grupo',
  templateUrl: './list-grupo.component.html',
  styleUrls: ['./list-grupo.component.css']
})
export class ListGrupoComponent implements OnInit {

  grupos: Grupo[] = [];
  gruposRec: Grupo[] = [];

  constructor(private grupoService:GrupoService, private router:Router) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll():void{
    this.grupoService.getAll()
    .subscribe((data:Grupo[])=>{
      this.grupos = data;})
    this.grupoService.getAllRec()
    .subscribe((data:Grupo[])=>{
      this.gruposRec = data
    })
  }

  deleteGrupo(index:number){
    this.grupoService.deleteGrupo(index).subscribe((x) => {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    })
    
  }

  joinGrupo(index:number){
    this.grupoService.joinGrupo(index).subscribe((x) => {
      console.log("join Grupo#"+index);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    })
    
  }

}
