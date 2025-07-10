import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ListComponent} from "./list/list.component";
import {AddComponent} from "./add/add.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    AddComponent,
    RouterLink
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

}
