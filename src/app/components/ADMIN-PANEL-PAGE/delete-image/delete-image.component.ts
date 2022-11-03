import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { ImageManagerRestService } from 'src/app/services/components-services/image-manager-rest.service';
import { Image, ImageRestService } from 'src/app/services/image-rest.service';

@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.scss']
})
export class DeleteImageComponent implements OnInit {

  subImageDelete?: Subscription
  customError?: string

  imagesList?: Array<Image>

  deleteImageDone = false

  imageDeleteForm = new FormGroup({
    imageName: new FormControl<string|null>(null,Validators.required),
  });

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;

  constructor(
    public imageManagerService: ImageManagerRestService,
    public imageRestService: ImageRestService
  ) { }

  ngOnInit(): void {
    this.subscribeImagesList()
  }

  deleteImage(){
    let imageName = this.imageDeleteForm.get('imageName')?.value
    if (this.imageDeleteForm.valid) {
      this.subImageDelete = this.imageRestService.deleteImage(imageName!).subscribe({
        next: (response) => {
          if (response.body) {
            this.resetForm()
            this.imageManagerService.getImagesList()
          }
          else{
            this.customError = 'Brak obiektu odpowiedzi'
          } 
        },
        error: (errorResponse) => {
              this.customError = errorResponse.error;
        },
        complete: () => {
          
        }
      })
    }
    else{
      this.deleteImageDone = false
    }
  }

  resetForm(){
    this.imageDeleteForm.controls['imageName'].setValue(null)

    this.imageDeleteForm.controls['imageName'].setErrors(null)

    this.deleteImageDone = true

    setTimeout(() => {
      this.deleteImageDone = false
  }, 4000);
  }

  get f(){
    return this.imageDeleteForm.controls;
  }

  subscribeImagesList(){
    this.imageManagerService.serviceImages.subscribe(
      res => {
        this.imagesList = res
        console.log(this.imagesList)
      },
      error => {}, 
      () => {})

  }

}
