import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private http: HttpClient) {}

  downloadFile(url: string): Observable<any> {
    return this.http.get(url,{
      responseType: "blob",
    });
  }
}
