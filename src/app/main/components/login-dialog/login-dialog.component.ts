import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/auth/auth-service';
import { LoginForm } from '../../../core/models/user';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private readonly authService: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  public login(): void {
    if (!this.loginForm.invalid) {
      let form: LoginForm = {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
      };
      this.authService.login(form).subscribe({
        next: (data: any): void => {
          this.authService.setAccessToken(data.accessToken);
          this.authService.setUsername(form.username);
          this.dialogRef.close('success');
        },
        error: (err) => {
          console.log('-');
        },
      });
    }
  }

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent);
    this.dialogRef.close();
  }
}
