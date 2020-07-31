export class FileUpload {
  name: string;
  url: string;
  file?: File;
  id?: string;

  constructor(file: File) {
    this.file = file;
  }
}
