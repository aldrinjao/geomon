import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    role: '3'
  };

  test;

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/user');
    }, (err) => {
      console.error(err);
    });
  }
}