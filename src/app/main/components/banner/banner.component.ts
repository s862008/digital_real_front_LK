import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SmartHellperComponent} from "../smart-hellper/smart-hellper.component";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private dialog: MatDialog) {
  }

  openDialog() {

    const dialogRef = this.dialog.open(SmartHellperComponent, {height: '95%', width: '95%'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Данные из формы:', result);
      }

    });
  }

}


