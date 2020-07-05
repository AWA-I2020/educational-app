import { FileUpload } from './file';

export interface Resource {
  date: Date;
  files: FileUpload[];
  description: string;
  name: string;
  class_id: string;
  id?: string;
}
