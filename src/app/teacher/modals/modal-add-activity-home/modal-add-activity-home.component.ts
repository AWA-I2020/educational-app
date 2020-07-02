import { Component, OnInit } from '@angular/core';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal-add-activity-home',
  templateUrl: './modal-add-activity-home.component.html',
  styleUrls: ['./modal-add-activity-home.component.scss'],
})
export class ModalAddActivityHomeComponent extends Modal {

  formats;
  constructor() {
    super();
  }

  ngOnInit() {
    this.formats = ['PDF','DOC',];
  }

}
