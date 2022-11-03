import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image, ImageRestService } from '../image-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ImageManagerRestService {

  imagesList?: Array<Image>

  subImagesList?: Subscription
  customError?: string
  loading = true;

  serviceImages: EventEmitter<any> = new EventEmitter();

  constructor(
    private imageRestService: ImageRestService
  ) { }

  getImagesList(){
    this.subImagesList = this.imageRestService.getImagesList().subscribe({
      next: (response) => {
        if (response.body) {
          this.imagesList = response.body
          // console.log(this.categoryList + "response this aaaa")
          this.serviceImages.emit(response.body)
          this.loading = false
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
          this.loading = false
        } 
      },
      error: (errorResponse) => {
            this.customError = errorResponse.error;
            this.loading = false
      },
      complete: () => {}
    })
  }
}
