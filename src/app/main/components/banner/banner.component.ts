import { Component } from '@angular/core';
import {ContainerComponent} from "../container/container.component";
import {SmartParametersComponent} from "../smart-parameters/smart-parameters.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private dialog: MatDialog) {
  }

  openDialog() {

    const dialogRef = this.dialog.open(SmartParametersComponent, {height: '95%', width: '95%'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Данные из формы:', result);
      }

    });
  }

}


