import { Component, OnInit, Input } from "@angular/core";
import { Resource } from "src/app/models/resource";
import { Modal } from "src/app/teacher/modals/modal";
import { FileService } from "src/app/services/file/file.service";
import { ResourceFile } from "src/app/models/resource-file";
import { NgxIndexedDBService } from "ngx-indexed-db";

@Component({
  selector: "app-resource-view",
  templateUrl: "./resource-view.component.html",
  styleUrls: ["./resource-view.component.scss"],
})
export class ResourceViewComponent extends Modal {
  @Input() resource: Resource;
  files: ResourceFile[] = [];
  constructor(
    private fileService: FileService,
    private dbService: NgxIndexedDBService
  ) {
    super();
  }

  ionViewWillEnter() {
    this.dbService.getByKey("resources", this.resource.id).then(
      (data) => {
        if (data) {
          this.files = data.files;
        } else {
          this.resource.files.forEach((file) => {
            this.files.push({
              name: file.name,
              icon: "download",
              fileURL: file.url,
            });
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  openFile(name: string) {
    let fileIndex = this.files.findIndex((element) => element.name === name);
    if (this.files[fileIndex].icon === "download") {
      this.loading("Descargando archivo");
      this.fileService
        .downloadFile(this.files[fileIndex].fileURL)
        .subscribe((file) => {
          file.name = this.files[fileIndex].name;
          this.files[fileIndex].file = file;
          this.files[fileIndex].icon = "eye";
          this.dismissLoading();
          this.dbService.add("resources", {
            id: this.resource.id,
            files: this.files,
          });
        });
    } else {
      let fileURL = window.URL.createObjectURL(this.files[fileIndex].file);
      window.open(fileURL);
    }
  }
}
