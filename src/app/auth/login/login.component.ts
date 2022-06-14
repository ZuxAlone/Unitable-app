import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Login } from '../shared/login.model';
import { UserStorageService } from '../shared/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: Login = new Login();
  public invalid: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.login).subscribe((data:any) => {
      console.log("Init");
      this.userStorageService.set(data);
      console.log("Fin");
      this.router.navigate(["/admin/usuario-info"]);
    });
  }

}
