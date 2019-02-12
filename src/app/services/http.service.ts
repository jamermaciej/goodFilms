import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // tslint:disable-next-line:max-line-length
  readonly API_READ_ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDk2ZWVjZjM1ZmZkMTJlZTBlYWE1ZWYwMzFkMzJjNSIsInN1YiI6IjVjNTk0YmU3OTI1MTQxMTZmYzVjMDYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EFEphukSdkILgELLgFH4FS8tH3dGYFuIDSrNY0DnpKg';
  readonly API_KEY = '4496eecf35ffd12ee0eaa5ef031d32c5';
  readonly URL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) { }

  getFilms(query: string, page: number ) {
    return this.http.get(`${this.URL}search/movie?api_key=${this.API_KEY}&query="${query}"&page=${page}`);
  }
}
