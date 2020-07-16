import { Component, OnInit } from '@angular/core';
import { Modal } from '../modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-add-activity-question',
  templateUrl: './modal-add-activity-question.component.html',
  styleUrls: ['./modal-add-activity-question.component.scss'],
})
export class ModalAddActivityQuestionComponent extends Modal {

  questionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    limitTime: new FormControl(0, Validators.required),
    attempRange: new FormControl(0, Validators.required),
  });

  constructor() {
    super();
  }

  ngOnInit() { }

}
