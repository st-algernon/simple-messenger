import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  submitted: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.loginForm = new FormGroup ({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    });

    this.registerForm = new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.pattern('^[A-Za-z0-9_]{3,15}$'), Validators.required]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.invalid) {
      return
    }

    this.submitted = true;

    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.subs.push(
      this.authService.login(loginRequest).subscribe(() => {
        this.router.navigate(['']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
      })
    );
  }

  register() {
    if (this.registerForm.invalid) {
      return
    }

    this.submitted = true;

    const registerRequest: RegisterRequest = {
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.subs.push(
      this.authService.register(registerRequest).subscribe(() => {
        this.router.navigate(['']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
      })
    );
  }
}
