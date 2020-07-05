import { Component, OnInit, Input } from "@angular/core";
import { Modal } from "src/app/teacher/modals/modal";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { FileUpload } from "src/app/models/file";

@Component({
  selector: "app-resource",
  templateUrl: "./resource.component.html",
  styleUrls: ["./resource.component.scss"],
})
export class ResourceComponent extends Modal {
  @Input() class_id: string;
  selectedFiles: FileList;
  files: FileUpload[] = [];
  resourceForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    file: new FormControl(""),
  });

  constructor() {
    super();
  }

  ngOnInit() {}

  selectFile(event) {
    this.selectedFiles = event.target.files;
    let upload = new FileUpload(this.selectedFiles.item(0));
    this.files.push(upload);
  }

  onSubmit() {
    console.log(this.class_id);
    console.log(this.name.value);
    console.log(this.description.value);
  }

  get name(): AbstractControl {
    return this.resourceForm.get("name");
  }

  get description(): AbstractControl {
    return this.resourceForm.get("description");
  }

  get file(): AbstractControl {
    return this.resourceForm.get("file");
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
