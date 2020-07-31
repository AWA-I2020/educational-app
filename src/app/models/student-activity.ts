import { FileUpload } from './file';
import { User } from './user';
import { ResourceFile } from './resource-file';

export interface StudentActivity {
  activity_id: string;
  student_id: string;
  file?: ResourceFile;
  textActivity?: string;
  student?: string;
}
