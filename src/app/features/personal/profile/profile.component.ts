import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth-service";
import {ProfileForm} from "../../../core/models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;

  constructor(private readonly userService: UserService,private readonly authService: AuthService) {
    this.profileForm = new FormGroup({
      surname: new FormControl('', []),
      name: new FormControl('', []),
      patronymic: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
      date: new FormControl('', []),
      companiesId: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.userService.getProfile(this.authService.getUsername()).subscribe({
      next: (data: any): void => {
        this.profileForm = new FormGroup({
          surname: new FormControl(data.surname, []),
          name: new FormControl(data.name, []),
          patronymic: new FormControl(data.patronymic, []),
          phone: new FormControl(data.phone, []),
          email: new FormControl(data.email, [Validators.email]),
          date: new FormControl(data.dateOfBirth, []),
          companiesId: new FormControl(data.companiesId, [])
        });
      },
    })
  }
  public saveProfile(): void {
    if (!this.profileForm.invalid) {
      let form: ProfileForm = {
        surname: this.profileForm.controls['surname'].value,
        name: this.profileForm.controls['name'].value,
        patronymic: this.profileForm.controls['patronymic'].value,
        phone: this.profileForm.controls['phone'].value,
        email: this.profileForm.controls['email'].value,
        dateOfBirth: this.profileForm.controls['date'].value,
        username: this.authService.getUsername(),
      }

      this.userService.updateProfile(form).subscribe({
        next: (data: any): void => {
          this.profileForm = new FormGroup({
            surname: new FormControl(data.surname, []),
            name: new FormControl(data.name, []),
            patronymic: new FormControl(data.patronymic, []),
            phone: new FormControl(data.phone, []),
            email: new FormControl(data.email, [Validators.email]),
            date: new FormControl(data.dateOfBirth, [])
          });
          alert('Профиль обновлён')
        },
        // error: (data: ExceptionData): void => {
        //   this.notificationService.error(`Не удалось обновить профиль. ${data.title}. ${data.detail}.`)
        // }
      })
    }
  }
}
