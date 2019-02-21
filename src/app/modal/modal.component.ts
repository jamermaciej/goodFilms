import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() output = new EventEmitter();
  @Input() film: Object;

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.output.emit();
  }

}
