import { Component, OnInit } from '@angular/core';

import { HttpHelperService } from '../../helpers/httpHelper.service';
import { ComplementModel,
  CompGridModel,
  NamedModel,
  ComplementaryMethodInstanceModel,
  LaboratoryInstanceModel } from '../../models/complement-model';

@Component({
  selector: 'app-complements',
  templateUrl: './complements.component.html'
})
export class ComplementsComponent implements OnInit {

  public loading = false;
  public error: any;
  public items: ComplementModel[];
  public labs: NamedModel[];
  public methods: NamedModel[];
  public methodsGrid: CompGridModel[] = new Array();
  public labsGrid: CompGridModel[] = new Array();

  constructor(private httpHelper: HttpHelperService)  { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.error = false;
    this.loading = true;

    this.loadLabs();
    this.loadMethods();

    this.httpHelper.HttpGet('complements/5')
      .subscribe(
        (data: ComplementModel[])  => {
          this.items = data;
          this.loading = false;
          this.processData();
         },
         error => {
            this.loading = false;
            this.error = error;
            console.log(`Error trying to get data, Error Details: ${error}`);
        });
  }

  private processData(): void {
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

  public test() {
    console.log(this.methodsGrid);
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
