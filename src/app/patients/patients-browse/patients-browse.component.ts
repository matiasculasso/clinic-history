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
      'Authorization':  `Bearer da3156348695d7fbdb006c595dad45be20999a65bb3c2566427e326992bc1cd0`
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
