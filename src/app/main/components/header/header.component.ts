import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth-service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { TabItem } from '../tab-menu/tab-menu.component';
import { Subject, takeUntil } from 'rxjs';
import { ResizeService } from '../../../core/services/resize.service';
import { MenuButtonService } from '../../../core/services/menu-button.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public tabItems: TabItem[] = [
    {
      title: 'новостройки',
      groups: [
        {
          group: [
            {
              title: 'Студии',
              link: '',
            },
            {
              title: '1-комнатные',
              link: '',
            },
            {
              title: '2-комнатные',
              link: '',
            },
            {
              title: 'многокомнатные',
              link: '',
            },
          ],
        },
        {
          group: [
            { title: 'Каталог жиых комплексов', link: '' },
            { title: 'Сданные объекты', link: '' },
          ],
        },
      ],
    },
    {
      title: 'ипотека',
      groups: [{ group: [{ title: 'Ипотека', link: '' }] }],
    },
    {
      title: 'Полезное',
      groups: [
        {
          group: [
            { title: 'Полезные документы', link: '' },
            { title: 'Акции и скидки', link: '' },
          ],
        },
        {
          group: [
            { title: 'Вакансии', link: '' },
            { title: 'Новости', link: '' },
            { title: 'Справочный центр', link: '' },
          ],
        },
        {
          group: [
            { title: 'Каталог застройщиков', link: '' },
            { title: 'Вопросы риелтору', link: '' },
          ],
        },
      ],
    },
  ];

  temp_location: string = '';

  public windowWidth: number | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly resizeService: ResizeService,
    private readonly menuButtonService: MenuButtonService
  ) {
    this.changeWindow();
  }

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

  ngOnInit(): void {
    this.resizeService.onResize$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.changeWindow();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  private changeWindow() {
    this.windowWidth = window.innerWidth;
    console.log(this.windowWidth);
  }
}
