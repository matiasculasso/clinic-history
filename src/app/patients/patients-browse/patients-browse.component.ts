import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalSettings } from '../../global-settings';
import { PatiensGridModel } from '../../models/patiens-grid-model';
import { HttpHelperService } from '../../helpers/httpHelper.service';


@Component({
  selector: 'app-patients-browse',
  templateUrl: './patients-browse.component.html'
})
export class PatientsBrowseComponent implements OnInit {

  public loading = false;
  public error: any;
  public items: PatiensGridModel[];
  public filter: string;

  constructor(private httpHelper: HttpHelperService, private router: Router, private route: ActivatedRoute)  { }

  ngOnInit() {
    this.route.queryParams.subscribe( query => {
      this.filter = query['filter'];
      this.loadData();
    });
  }

  public edit(id: number) {
    this.router.navigate(['patients', id, 'edit']);
  }

  public refresh() {
    if (this.filter.length < 3) {
      return;
    }

    this.router.navigate(['patients'], { queryParams: { filter: this.filter }});
  }

  private loadData(): void {
    this.error = false;
    this.loading = true;

    this.httpHelper.HttpGet('patients', this.filter)
      .subscribe(
        (data: PatiensGridModel[])  => {
          this.items = data;
          this.loading = false; },
         error => {
            this.loading = false;
            this.error = error;
            console.log(`Error trying to get patients, Error Details: ${error}`);
        });
  }
}
