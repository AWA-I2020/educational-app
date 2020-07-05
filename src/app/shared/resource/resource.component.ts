import { Component, OnInit, Input } from "@angular/core";
import { Modal } from "src/app/teacher/modals/modal";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { FileUpload } from "src/app/models/file";
import { ResourceService } from "src/app/services/resource/resource.service";
import { Resource } from "src/app/models/resource";

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
    file: new FormControl("", Validators.required),
  });

  constructor(private resourceService: ResourceService) {
    super();
  }

  ngOnInit() {}

  selectFile(event) {
    this.selectedFiles = event.target.files;
    let upload = new FileUpload(this.selectedFiles.item(0));
    if (upload.file.type === "application/pdf") {
      if (upload.file.size > 300000) {
        this.presentToast("El archivo PDF pesa mas de 300KB");
      }
    } else {
      if (upload.file.type === "text/plain") {
        if (upload.file.size > 100000) {
          this.presentToast("El archivo de texto pesa mas de 100KB");
        }
      }
    }
    this.files.push(upload);
    this.file.setValue(this.files);
  }

  async onSubmit() {
    this.loading("Publicando recurso");
    let resource: Resource = {
      class_id: this.class_id,
      description: this.description.value,
      files: [],
      name: this.name.value,
      date: new Date(Date.now()),
    };
    if (this.files.length > 0) {
      resource.files = await this.resourceService.uploadFiles(this.files);
    }
    this.resourceService.addResource(resource).then(() => {
      this.dismiss();
      this.dismissLoading();
      this.presentToast("Recurso publicado");
    });
  }

  deleteFile(file: FileUpload) {
    var i = this.files.indexOf(file);
    this.files.splice(i, 1);
    this.file.setValue(this.files);
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
