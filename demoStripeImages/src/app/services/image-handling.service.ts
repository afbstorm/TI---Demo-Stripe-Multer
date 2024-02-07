import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageHandlingService {
  private API_URL = 'http://localhost:8001/api/image';
  constructor(private http: HttpClient) { }

  uploadImage(image: File) {
    const endpoint = this.API_URL;
    const formData: FormData = new FormData();
    formData.append('imageKey', image, image.name);
    return this.http.post(endpoint, formData);
  }
}
