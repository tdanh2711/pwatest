import { Component, OnInit } from '@angular/core';
import { ApiService, Item } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pwatest';
  items: Item[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.fetch().subscribe(
      (data: Item[]) => {
        console.log(data);
        this.items = data;
      }, (err) => {
        console.log(err);
      },
    );
  }
}
