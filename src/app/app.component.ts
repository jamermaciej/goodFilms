import { ModalComponent } from './modal/modal.component';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from './services/http.service';
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('modalContainer', {read: ViewContainerRef}) modalContainer: ViewContainerRef;

  films;
  query; string;
  page = 1;
  maxPage;

  componets = [];

  queryField = new FormControl;

  constructor(private httpService: HttpService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef
            ) { }

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
        console.log(this.films);
      });
  }

  openModal(film: any): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = this.modalContainer.createComponent(factory);
    componentRef.instance.film = film;
    componentRef.instance.output.subscribe( () => {
      componentRef.destroy();
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  closeModal() {
    this.modalContainer.clear();
    // this.componentRef.destroy();
  }
}
