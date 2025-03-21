import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
addType:string='';


constructor(private route: ActivatedRoute) {

}
  ngOnInit(): void {
    // Получаем данные при инициализации компонента
    this.addType = this.route.snapshot.data['type'];
    console.log('Received data:', this.addType);
  }
}
