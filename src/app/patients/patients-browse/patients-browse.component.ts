import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GlobalSettings } from '../../global-settings';
import { PatiensGridModel } from '../../models/patiens-grid-model';

@Component({
  selector: 'app-patients-browse',
  templateUrl: './patients-browse.component.html'
})
export class PatientsBrowseComponent implements OnInit {

  public loading = false;
  public error = false;
  public items: PatiensGridModel[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.LoadData();
  }

  private LoadData() {
    const h = new HttpHeaders({
      'Authorization':  `Bearer d8bcc7dd759bcc56fd23db9c54b1349b99125f121010a21f9c4d90c7bdf0c1cf`
    });

    this.error = false;
    this.loading = true;
    this.http.get<PatiensGridModel[]>(GlobalSettings.API_ENDPOINT + 'patients?filter=arg', { headers: h } )
    .subscribe(data => {
        this.items = data;
        this.loading = false;
    }, error => {
        this.loading = false;
        this.error = true;
        console.log('Error trying to get patients');
    });
  }

}
