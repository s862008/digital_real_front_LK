import {Routes} from "@angular/router";
import {NewsComponent} from "./news.component";
import {ListComponent} from "./list/list.component";
import {AddComponent} from "./add/add.component";

export const NEWS_ROUTES: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'edit/:id',
    component: AddComponent,
  }
];
