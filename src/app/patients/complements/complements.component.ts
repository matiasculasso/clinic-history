import { Component, OnInit, Input } from '@angular/core';

import { HttpHelperService } from '../../helpers/httpHelper.service';
import { ComplementModel,
  CompGridModel,
  NamedModel,
  ComplementaryMethodInstanceModel,
  LaboratoryInstanceModel } from '../../models/complement-model';
import { Observable } from 'rxjs/Observable';

import * as toastr from 'toastr';

@Component({
  selector: 'app-complements',
  templateUrl: './complements.component.html'
})
export class ComplementsComponent implements OnInit {
  @Input() patientId: number;

  public loading = false;
  public error: any;
  public items: ComplementModel[];
  public labs: NamedModel[];
  public methods: NamedModel[];
  public methodsGrid: CompGridModel[] = new Array();
  public labsGrid: CompGridModel[] = new Array();
  public modelUpdated = false; showDialog = false;

  constructor(private httpHelper: HttpHelperService)  { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.error = false;
    this.loading = true;

    this.loadLabs();
    this.loadMethods();

    this.httpHelper.HttpGet('complements/' +  this.patientId)
      .subscribe(
        (data: ComplementModel[])  => {
          this.items = data;
          this.loading = false;
          this.processDataToShow();
         },
         error => {
            this.loading = false;
            this.error = error;
            console.log(`Error trying to get data, Error Details: ${error}`);
        });
  }

  public onSaveCompMethodsClick(): void {
    const data = this.proccessGridBeforeSend();

    let httpAction = new Observable<Object>();
    httpAction = this.httpHelper.HttpPost('complements/' + this.patientId, data);

    httpAction.subscribe(response => {
      console.log(`OK, ID:--> ${response}`);
      toastr.success('Metodos Complementarios guardados correctamente:');
    },
      error => {
        this.error = error;
        toastr.error('Error al interntar guardar los Metodos Complementarios, error:' + error);
      });
  }

  public onCancelCompMethds(): void {
    this.showDialog = true;
  }

  public onConfirmClearClick(): void {
    this.methodsGrid.length = 0;
    this.labsGrid.length = 0;
    this.processDataToShow();
    this.showDialog = false;
  }

  public setModelToUpdated(): void {
    this.modelUpdated = true;
  }

  private processDataToShow(): void {
    // process complementary methods
    this.methods.forEach( m => {
      const gridItem: CompGridModel = { id: m.id, name: m.name, cells: new Array()};
      this.items.forEach( i => {
        gridItem.cells.push(
        {
          complementId: i.id,
          value: this.getMethodValueIfExsits(i.complementaryMethods, m.id)
        });
      });
      this.methodsGrid.push(gridItem);
    });

    // process labs
    this.labs.forEach( m => {
      const gridItem: CompGridModel = { id: m.id, name: m.name, cells: new Array()};
      this.items.forEach( i => {
        gridItem.cells.push(
        {
          complementId: i.id,
          value: this.getLabValueIfExsits(i.laboratoryModels, m.id)
        });
      });
      this.labsGrid.push(gridItem);
    });
  }

  private proccessGridBeforeSend() {
    const collections = new Array();
    this.items.forEach(i => {

      // discard null values and filter by complementId
      const compMethodsFiltered = this.methodsGrid.filter(
        cm => cm.cells.some(cell => cell.complementId === i.id &&  cell.value !== null));

      const labsFiltered = this.labsGrid.filter(
        lab => lab.cells.some(cell => cell.complementId === i.id && cell.value !== null));

      // this arrays will containt the results to send
      const compMethods = new Array();
      const labs = new Array();

      // mapping each complementary method with his value
      compMethodsFiltered.forEach( x => {
        compMethods.push({
          complementaryMethodId: x.id,
          value: x.cells.find( y => y.complementId === i.id).value
        });
      });

      labsFiltered.forEach( x => {
        labs.push({
          laboratoryId: x.id,
          value: x.cells.find( y => y.complementId === i.id).value
        });
      });

      const complement = {
        id: i.id,
        complementaryMethods: compMethods,
        laboratories: labs
      };

      collections.push(complement);
    });
    return collections;
  }

  private getMethodValueIfExsits(items: ComplementaryMethodInstanceModel[], id: number): any {
     const item = items.find(x => x.complementaryMethodId === id);
     return item === undefined ? null : item.value;
  }

  private getLabValueIfExsits(items: LaboratoryInstanceModel[], id: number): any {
    const item = items.find(x => x.laboratoryId === id);
    return item === undefined ? null : item.value;
 }

  private loadLabs(): void {
    this.httpHelper.HttpGet('complements/laboratories')
      .subscribe((data: any[] ) => { this.labs = data; });
  }

  private loadMethods(): void {
    this.httpHelper.HttpGet('complements/complementary-methods')
      .subscribe((data: any[] ) => { this.methods = data; });
  }
}
