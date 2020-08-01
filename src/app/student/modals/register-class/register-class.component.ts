import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/app/shared/modal';
import { ClassService } from 'src/app/services/class/class.service';
import { FormGroup, FormControl, Validators,} from '@angular/forms';

@Component({
  selector: 'app-register-class',
  templateUrl: './register-class.component.html',
})
export class RegisterClassComponent extends Modal {

  registerForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  constructor(private classService: ClassService) {
    super();
  }

  onSubmit() {}

}
