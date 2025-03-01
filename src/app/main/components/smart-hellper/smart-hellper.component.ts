import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SmartParameters} from "../../../core/models/parametrs";
import {Company} from "../../../core/models/company";
import {FormatterUtils} from "../../../core/util/formatter.utils";


@Component({
  selector: 'app-smart-hellper',
  templateUrl: './smart-hellper.component.html',
  styleUrl: './smart-hellper.component.css'
})

export class SmartHellperComponent implements OnInit {

  companies: Company[] = [];
  choosedItems: any[] = [];
  showElement = false;
  scrolling: number = 100;
  smart = true;
  data!: SmartParameters | null;


  @ViewChild('formParam') formParam!: ElementRef;


  constructor(
    private el: ElementRef,
    public smartParameters: SmartParameters,
    private router: Router,
    private dialogRef: MatDialogRef<any>,
    private cdRef: ChangeDetectorRef)
    // @Inject(MAT_DIALOG_DATA) public data: SmartParameters | null)
  {

    this.initializeCompanies();

  }

  ngOnInit() {
    if (this.data) {
      this.smartParameters = Object.assign({}, this.data);

    } else {
      this.clearFilter();
    }
    this.setupListeners();

  }

  private initializeCompanies() {
    this.companies = [
      new Company(1, 'АО СЗ ФК "АКСИОМА"', '123-456-7890'),
      new Company(2, 'ООО Предприятие «ИП К.И.Т.»', '987-654-3210'),
      new Company(3, 'ООО "СТЭЛ инвест"', '555-555-5555')
    ];
  }

  private setupListeners() {
    const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('input[type="checkbox"], input[type="range"], input[type="number"],input[type="text"]')) as HTMLInputElement[];
    const selects: HTMLSelectElement[] = Array.from(document.querySelectorAll('select')) as HTMLSelectElement[];

    inputs.forEach(input => {
      input.addEventListener('change', () => this.handleInputChange(input));
    });

    selects.forEach(select => {
      select.addEventListener('change', () => this.handleSelectChange(select));
    });

    if (this.formParam) {
      this.formParam.nativeElement.addEventListener('scroll', () => {
        const rect = this.formParam.nativeElement.getBoundingClientRect();
        const scrollTop = this.formParam.nativeElement.scrollTop;
        this.showElement = rect.top < -600 || scrollTop > 300;
      });
    }

    const inputPrice = document.getElementById('о6b6h') as HTMLInputElement;
    if (inputPrice) {
      inputPrice.addEventListener('input', (event) => {
        // Удаляем все символы, кроме цифр
        let value = inputPrice.value.replace(/\D/g, '');

        // Форматируем число с пробелами
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        // Обновляем значение input
        inputPrice.value = value;
        this.smartParameters.pricePreference = Number(value.replaceAll(" ", ""));
      });
    }

  }

  private handleInputChange(input: HTMLInputElement) {
    if (!input.id) return;

    const inputType = input.getAttribute('type');
    const parentElement = inputType === 'range' ? input.parentNode?.parentElement : input.parentElement;
    if (['range', 'number', 'text'].includes(inputType!) && parentElement) {
      this.updateChoosedItems(input, parentElement);
    } else if (inputType === 'checkbox') {
      this.toggleCheckbox(input);
    }
  }

  private handleSelectChange(select: HTMLSelectElement) {
    if (select.getAttribute('changed') == null) {
      select.setAttribute('changed', 'true');
      this.choosedItems.push({id: select.id, type: "select"});
    } else if (select.value === '0') {
      select.removeAttribute('changed');
      this.removeChoosedItem(select.id);
    }
  }

  private updateChoosedItems(input: HTMLInputElement, parentElement: HTMLElement | null) {
    if (parentElement?.getAttribute('changed') == null) {
      parentElement?.setAttribute('changed', 'true');
      this.choosedItems.push({id: input.id, type: input.getAttribute('type')});
    }
  }

  private toggleCheckbox(input: HTMLInputElement) {

    if (input.checked) {
      this.choosedItems.push({id: input.id, type: input.getAttribute('type')});
      input.checked = true;
    } else {
      input.checked = false;
      this.removeChoosedItem(input.id);
    }
  }

  private removeChoosedItem(id: string) {
    const indexToRemove = this.choosedItems.findIndex(item => item.id === id);
    if (indexToRemove !== -1) {
      this.choosedItems.splice(indexToRemove, 1);
    }
  }

  // listChecked() {
  //   const checkedInputs = document.querySelectorAll('input[checked="checked"]');
  //   const choosed = Array.from(checkedInputs).map(input => {
  //     const lblElement = input.parentNode?.querySelector('.fp-label--tx');
  //     const parentElement = input.parentNode?.parentNode?.querySelector('h4');
  //     const lbl = lblElement?.textContent;
  //     const parent = parentElement?.innerText || "";
  //     const id = input.id;
  //
  //     return lbl ? `${parent} ${lbl.toLowerCase()} ` : '';
  //
  //   }).join('X');
  //
  //   const choosedBlock = document.getElementById("choosed-block");
  //   if (choosedBlock) {
  //     choosedBlock.innerHTML = choosed;
  //   }
  // }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  originalPrice(value: string): string {
    return value?.replaceAll(" ", "").replace(/\D/g, '').replace(/^0+/, "") || "";
  }

  clearFilter() {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    // this.listChecked();
    this.cdRef.detectChanges();
    this.choosedItems = [];
    this.smartParameters = new SmartParameters();

  }

  onSubmit() {

    // this.dialogRef.close(this.smartParameters);
    this.router.navigate(['/smart-search', {timestamp: new Date().getTime()}], {
      state: {smartParam: this.smartParameters}
    }).then(r => {
      console.log("to smart " + r)
    });

  }

  onCancel() {
    this.dialogRef.close();
  }


  scrollToTop() {

    if (this.formParam) {
      this.formParam.nativeElement.scrollTo({
        top: 0,
        behavior: 'smooth' // плавная прокрутка
      });

      this.showElement = false;
    }
  }

  scrollToBottom() {
    if (this.formParam) {
      this.formParam.nativeElement.scrollTo({
        top: this.formParam.nativeElement.scrollHeight,
        behavior: 'smooth' // плавная прокрутка
      });
    }
  }

  isChoosedItemsEmpty() {
    return this.choosedItems.length == 0
  }


  labelParameter(id: string) {

    if (!id) return null;

    const element = document.getElementById(id);
    if (!element) return null;

    const lblElement = element.parentNode?.querySelector('.fp-label--tx');
    const parentElement = element.parentNode?.parentNode?.querySelector('h4');
    const lbl = lblElement?.textContent;
    const parent = parentElement?.innerText || "";

    if (lbl) {
      if (element.getAttribute('type') === 'checkbox') {
        return `${parent} ${lbl.toLowerCase()}`;
      }
    } else {

      switch (element.id) {
        case 'tn0m':
        case 'он6':
          return "Этаж: " + this.smartParameters.floorPreference;

        case 'tne0m':
        case 'онb6':
          return "Этажей в доме: " + this.smartParameters.countFloorPreference;

        case 'онbh':
        case 'tn5em54':
          return "Площадь общая: " + this.smartParameters.areaTotalPreference;

        case 'онb6h':
        case 'tn4em54':
          return "Площадь жилая: " + this.smartParameters.areaLivingPreference;

        case 'о67нb6h':
        case 'tnem534':
          return "Площадь кухни: " + this.smartParameters.areaKitchenPreference;

        case 'о6b6h':
        case 'tne7m534':
          return "Цена: " + this.smartParameters.pricePreference;

        case 'о67b6h':
        case 'tn534':
          return "Цена за кв.м: " + this.smartParameters.areaPricePreference;

        case 'g8':
        case 'r5':
          return "Срок сдачи: " + this.smartParameters.dueYearMin + " - " + this.smartParameters.dueYearMax;

        case 'онb1':
        case 'tne7m4':
          return "Квартир на этаже: " + this.smartParameters.numberOfApartmentsPreference;

        case 'cmp':
          return "Выбранный застройщик: " + this.getCompany(this.smartParameters.company);

        case 'cmpEx':
          return "Исключенный застройщик: " + this.getCompany(this.smartParameters.companyExcp);

        default:
          return null;
      }


    }
    return null
  }

  removeParameter(id: string) {

    this.choosedItems = this.choosedItems.filter(item => item.id !== id);

    const element = document.getElementById(id) as HTMLInputElement;
    if (!element) return;

    element.parentElement?.removeAttribute('changed');
    element.parentNode?.parentElement?.removeAttribute('changed');

    if (element.getAttribute('type') == 'checkbox') {
      element.removeAttribute('checked');

    } else {
      switch (element.id) {
        case 'tn0m':
        case 'он6':
          element.removeAttribute('checked');
          this.smartParameters.floorPreference = null;
          break;

        case 'tne0m':
        case 'онb6':
          element.removeAttribute('checked');
          this.smartParameters.countFloorPreference = null;
          break;

        case 'онbh':
        case 'tn5em54':
          element.removeAttribute('checked');
          this.smartParameters.areaTotalPreference = null;
          break;

        case 'онb6h':
        case 'tn4em54':
          element.removeAttribute('checked');
          this.smartParameters.areaLivingPreference = null;
          break;

        case 'о67нb6h':
        case 'tnem534':
          element.removeAttribute('checked');
          this.smartParameters.areaKitchenPreference = null;
          break;

        case 'о6b6h':
        case 'tne7m534':
          element.removeAttribute('checked');
          this.smartParameters.pricePreference = null;
          this.clearInputValue('о6b6h');
          break;

        case 'о67b6h':
        case 'tn534':
          element.removeAttribute('checked');
          this.smartParameters.areaPricePreference = null;
          break;

        case 'g8':
          element.removeAttribute('checked');
          this.smartParameters.dueYearMin = 2024;
          break;

        case 'r5':
          element.removeAttribute('checked');
          this.smartParameters.dueYearMax = 2030;
          break;

        case 'онb1':
        case 'tne7m4':
          element.removeAttribute('checked');
          this.smartParameters.numberOfApartmentsPreference = null;
          break;

        case 'cmp':
          element.removeAttribute('changed');
          this.smartParameters.company = 0;
          break;

        case 'cmpEx':
          element.removeAttribute('changed');
          this.smartParameters.companyExcp = 0;
          break;

        default:
          //
          break;
      }
    }

  }

  private clearInputValue(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  public getCompany(id: number): string | undefined {
   return  FormatterUtils.nameCompany(id)
  }


  onInputChange($event: any) {
    //  this.smartParameters.pricePreference = Number(this.myInput.nativeElement.value.replace(" ", ""));
  }

  onRangeChange($event: number) {
    const input = document.getElementById('о6b6h') as HTMLInputElement;
    if (input) {
      input.value = String(this.smartParameters.pricePreference).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
  }
}


