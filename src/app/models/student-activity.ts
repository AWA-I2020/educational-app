import { FileUpload } from './file';

export interface StudentActivity {
  activity_id: string;
  student_id: string;
  file: FileUpload;
}
