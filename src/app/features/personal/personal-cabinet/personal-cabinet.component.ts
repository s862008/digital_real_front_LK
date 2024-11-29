import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth-service';

@Component({
  selector: 'app-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrl: './personal-cabinet.component.css',
})
export class PersonalCabinetComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
