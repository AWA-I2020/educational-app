import { Component } from '@angular/core';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal-add-resource',
  templateUrl: './modal-add-resource.component.html',
  styleUrls: ['./modal-add-resource.component.scss'],
})
export class ModalAddResourceComponent extends Modal {

  constructor() {
    super();
  }

  ngOnInit() { }

}
