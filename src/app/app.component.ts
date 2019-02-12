import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from './services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  films;
  query; string;
  page = 1;
  maxPage;

  queryField = new FormControl;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.queryField.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe( value => {
        this.query = value;
        this.getFilms();
      });
  }



  prevPage() {
    // tslint:disable-next-line:curly
    if ( this.page === 1 ) return;
    this.page--;
    this.getFilms();
  }
  nextPage() {
    // tslint:disable-next-line:curly
    if ( this.page >= this.maxPage) return;
    this.page++;
    this.getFilms();
  }

  getFilms() {
    this.httpService.getFilms(this.query, this.page).subscribe( films => {
        this.films = films;
        this.maxPage = Math.ceil(this.films.total_results / 20);
      });
  }
}
