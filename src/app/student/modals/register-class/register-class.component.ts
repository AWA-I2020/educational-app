import { Component, Input } from "@angular/core";
import { Modal } from "src/app/shared/modal";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { StudentService } from "src/app/services/student/student.service";
import { ClassStudent } from "src/app/models/class-student";
import { User } from "src/app/models/user";

@Component({
  selector: "app-register-class",
  templateUrl: "./register-class.component.html",
})
export class RegisterClassComponent extends Modal {
  @Input() user: User;
  registerForm = new FormGroup({
    code: new FormControl("", Validators.required),
  });

  constructor(private studentService: StudentService) {
    super();
  }

  onSubmit() {
    this.loading("Registrandose en clase");
    console.log(this.code.value);
    let classStudent: ClassStudent = {
      class_id: this.code.value,
      student_id: this.user.id,
      token: "",
    };
    this.studentService.addStudent(classStudent).then(() => {
      this.presentToast("Te registraste en la clase");
      this.dismissLoading();
      this.dismiss();
    });
  }

  get code(): AbstractControl {
    return this.registerForm.get("code");
  }
}
