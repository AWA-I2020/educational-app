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
import { StudentService } from "src/app/services/student/student.service";
import { Notification } from "src/app/models/notification";
import { Class } from "src/app/models/class";
import { NotificationsService } from "src/app/services/notifications/notifications.service";

@Component({
  selector: "app-resource",
  templateUrl: "./resource.component.html",
  styleUrls: ["./resource.component.scss"],
})
export class ResourceComponent extends Modal {
  @Input() class: Class;
  selectedFiles: FileList;
  files: FileUpload[] = [];
  resourceForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    file: new FormControl("", Validators.required),
  });

  constructor(
    private resourceService: ResourceService,
    private studentService: StudentService,
    private notificationsService: NotificationsService
  ) {
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
      class_id: this.class.id,
      description: this.description.value,
      files: [],
      name: this.name.value,
      date: new Date(Date.now()),
    };
    if (this.files.length > 0) {
      resource.files = await this.resourceService.uploadFiles(this.files);
    }
    this.resourceService.addResource(resource).then(() => {
      this.dismissLoading();
      let notification: Notification = {
        title: "Nuevo recurso",
        body: `Tu profesor publico un nuevo recurso en ${this.class.subject}`,
      };
      this.studentService
        .getStudentsOfClass(this.class.id)
        .subscribe((data) => {
          data.forEach((student) => {
            this.notificationsService
              .sendNotification(student.token, notification)
              .subscribe((data) => {});
          });
        });
      this.dismiss();
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
}
