import { Component } from "@angular/core";
import { Modal } from "../modal";
import { Class } from "src/app/models/class";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { ClassService } from "src/app/services/class/class.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-modal-add-class",
  templateUrl: "./modal-add-class.component.html",
  styleUrls: ["./modal-add-class.component.scss"],
})
export class ModalAddClassComponent extends Modal {
  materias = ["Matematicas", "Lenguaje", "Historia"];
  cursos = [1, 2, 3, 4, 5, 6];
  paralelos = ["A", "B", "C", "D"];
  classForm = new FormGroup({
    subject: new FormControl("", Validators.required),
    grade: new FormControl("", Validators.required),
    parallel: new FormControl("", Validators.required),
  });

  constructor(private classService: ClassService) {
    super();
  }

  ngOnInit() {}

  onSubmit() {
    let classData: Class;
    this.indexedDbService.getAll("user").then((data) => {
      classData = {
        grade: this.grade.value,
        parallel: this.parallel.value,
        subject: this.subject.value,
        teacher_id: ((data[0] as unknown) as User).id,
      };
      this.classService.addClass(classData).then((data) => {
        classData.id = data.id;
        this.classService.updateClass(classData).then(() => {
          this.modalCtrl.dismiss();
          this.presentToast("Clase añadida.");
        });
      });
    });
  }

  get subject(): AbstractControl {
    return this.classForm.get("subject");
  }

  get grade(): AbstractControl {
    return this.classForm.get("grade");
  }

  get parallel(): AbstractControl {
    return this.classForm.get("parallel");
  }
}
