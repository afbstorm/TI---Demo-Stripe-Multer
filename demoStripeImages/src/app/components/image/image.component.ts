import { Component } from '@angular/core';
import {ImageHandlingService} from "../../services/image-handling.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  selectedFile!: File;

  constructor(private imageService: ImageHandlingService) { }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit(){
    this.imageService.uploadImage(this.selectedFile).subscribe(response =>{
      console.log(response);
    });
  }
}
