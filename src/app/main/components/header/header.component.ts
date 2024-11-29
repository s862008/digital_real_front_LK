import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth-service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  temp_location: string = '';

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService
  ) {}

  isSubmenuVisible: { newbuild: boolean; ipot: boolean } = {
    newbuild: false,
    ipot: false,
  };

  showSubmenu(menu: keyof typeof this.isSubmenuVisible) {
    this.isSubmenuVisible[menu] = true;
  }

  hideSubmenu(menu: keyof typeof this.isSubmenuVisible) {
    this.isSubmenuVisible[menu] = false;
  }

  ngOnInit(): void {}

  getName(): string {
    if (this.authService.isAuthorized()) return this.authService.getUsername();
    else return 'Личный кабинет застройщика';
  }

  public routingOrLogin(location: string): void {
    this.temp_location = location;
    if (!this.authService.isAuthorized()) this.openRegistrationDialog();
    else
      switch (location) {
        case 'new-object':
          sessionStorage.setItem('profileTab', '3');
          this.router
            .navigate(['not-found'], { skipLocationChange: true })
            .then(() => this.router.navigate(['personal-cabinet/profile']));
          break;
        case 'business':
          sessionStorage.setItem('profileTab', '0');
          this.router
            .navigate(['not-found'], { skipLocationChange: true })
            .then(() => this.router.navigate(['personal-cabinet']));
          break;
        default:
          this.router
            .navigate(['not-found'], { skipLocationChange: true })
            .then();
      }
  }

  private openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'registration') this.openRegistrationDialog();
      if (result == 'success') {
        this.routingOrLogin(this.temp_location);
      }
    });
  }

  private openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.openLoginDialog();
    });
  }
}