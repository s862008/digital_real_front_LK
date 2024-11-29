import { Component } from '@angular/core';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css'],
})
export class EditingComponent {
  constructor() {}
  listing = [
    {
      title: '2 комнаты, 61.8 м²',
      address:
        'Новостройка, ЖК «Шестое чувство», ул. Композитора Ставонина, 55/9к2',
      kitchen: 'Кухня: . . . . . . . . . . . . . . . . 13.8 м²',
      floor: 'Этаж: . . . . . . . . . . . . . . . . 6',
      deadline: 'Срок сдачи: . . . . . . . . . . сдан',
      price: 'Не указана',
      img: '../../../../assets/img/house.png', // Заглушка для изображения
    },
  ];
}
