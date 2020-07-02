import { Component, OnInit } from '@angular/core';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal-add-activity-question',
  templateUrl: './modal-add-activity-question.component.html',
  styleUrls: ['./modal-add-activity-question.component.scss'],
})
export class ModalAddActivityQuestionComponent extends Modal{

  constructor() {
    super();
  }

  ngOnInit() {}

}
