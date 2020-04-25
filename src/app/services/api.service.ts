import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Item {
  name: string;
  description: string;
  url: string;
  html: string;
  markdown: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseURL = 'https://www.techiediaries.com/api/data.json';
  private items: Item[];
  private currentIndex = 0;
  private timer;

  item$ = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
    this.fetchData();
  }

  private fetchData(): void {
    this.httpClient.get<Item[]>(this.baseURL).toPromise().then(data => {
      this.items = data;
      this.timer = setInterval(() => this.pushNewItem(), 2000);
    });
  }

  private pushNewItem(): void {
    this.item$.next(this.items[this.currentIndex++]);
    if (this.currentIndex === this.items.length) { clearInterval(this.timer); }
  }
}
