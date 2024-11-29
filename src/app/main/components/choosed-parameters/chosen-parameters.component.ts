import {Component, Input} from '@angular/core';
import {IncludParameters, Parameters, SmartParameters} from "../../../core/models/parametrs";

@Component({
  selector: 'app-chosen-parameters',
  templateUrl: './chosen-parameters.component.html',
  styleUrl: './chosen-parameters.component.css'
})
export class ChosenParametersComponent {
  @Input() public smartParameters!: SmartParameters;
  @Input() public choosedCount!: any;
  @Input() public choosedItems: any[] = [];

  parametersActive!:any;
  key: any;
  value: any;
  isSrock: boolean = true;
  isCountApartment: boolean = true;


  constructor() {

  }

  activeParameters(): [string, any][]{
    this.parametersActive = [
      {
        key: 'numberOfApartmentsPreference',
        label: 'Количество квартир',
        value: this.smartParameters.numberOfApartmentsPreference,
        condition:  this.smartParameters.numberOfApartmentsPreference! >0
      },
      {
        key: 'isApartments',
        label: 'Апартаменты',
        value: this.smartParameters.isApartments,
        condition: this.smartParameters.isApartments
      },
      {
        key: 'isFlat',
        label: 'Квартира',
        value: this.smartParameters.isFlat,
        condition: this.smartParameters.isFlat
      },
      {
        key: 'isBlandPlan',
        label: 'Планировка',
        value: null, // Здесь значение не нужно, так как оно просто отображает наличие
        condition: this.smartParameters.isBlandPlan
      }
      ,
      {
        key: 'isAtelier',
        label: 'Студия',
        value: null, // Здесь значение не нужно, так как оно просто отображает наличие
        condition: this.smartParameters.isAtelier
      }
    ];
    let   includ:IncludParameters = new IncludParameters();
    const parameterKeys: Array<keyof Parameters> = Object.keys(includ) as Array<keyof Parameters>;

   // console.log(Object.entries(this.smartParameters).filter(([key, value]) => {
   //   return parameterKeys.includes(key as keyof Parameters ) &&(  value === true || (value !== null && value !== 0 && value !==false ));
   // }));

    return Object.entries(this.smartParameters).filter(([key, value]) => {
      return parameterKeys.includes(key as keyof Parameters ) &&(  value === true || (value !== null && value !== 0 && value !==false ));
     });

  }

   resetParameter(key: string) {
      const defaultValues: { [key: string]: any } = new SmartParameters();
      //  {
     //   'isApartments': false,
     //   'isFlat': false,
     //   'isBlandPlan': false,
     //   'isIsolatePlan': false,
     //   'isNotFirstFloor': false,
     //   'isNotLastFloor': false,
     //   'isLastFloor': false,
     //   'apartmentTypeWeight': 0,
     //   'planWeight': 0,
     //   'floorWeight': 0,
     //   'floorMin': 0,
     //   'floorMax': 0,
     // };

     if (key in defaultValues) {
       this.smartParameters[key] = defaultValues[key];
     }
  }

  onCheckboxChange($event: Event) {

    this.choosedItems.push('any_changed')
  }
}
