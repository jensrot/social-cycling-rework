import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule, MatError, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public hide = signal(true);
  private formBuilder = inject(FormBuilder);

  // constructor(private fb: FormBuilder) {
  //   this.loginForm = this.fb.group({
  //     username: ['', [Validators.required, Validators.email]], // Must be an email
  //     password: ['', [Validators.required, Validators.minLength(6)]]
  //   });
  // }

  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]], // Must be an email
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public clickPasswordIcon(e: MouseEvent) {
    this.hide.set(!this.hide());
    e.preventDefault();
  }

  public onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
  }
}
