import { Component, OnInit } from '@angular/core';
import { Modal } from '../modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-add-activity-home',
  templateUrl: './modal-add-activity-home.component.html',
  styleUrls: ['./modal-add-activity-home.component.scss'],
})
export class ModalAddActivityHomeComponent extends Modal {

  formats;
  resourceForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    format: new FormControl("", Validators.required),
  });
  constructor() {
    super();
  }

  ngOnInit() {
    this.formats = ['PDF','DOC',];
  }

}
