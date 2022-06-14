import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/auth/shared/user-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
  }

  verPerfil(): void {
    this.router.navigate(["/admin/usuario-info"]);
  }

  signout(): void {
    this.userStorageService.destroy();
    this.router.navigate(["/auth/login"]);
  }

}
