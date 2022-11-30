import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Avatar, Image, ImageRestService } from '../image-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ImageManagerRestService {

  imagesList?: Array<Image>
  avatarsList?: Array<Avatar>

  subImagesList?: Subscription
  customError?: string
  loading = true;

  serviceImages: EventEmitter<any> = new EventEmitter();

  serviceAvatar: EventEmitter<any> = new EventEmitter();

  constructor(
    private imageRestService: ImageRestService
  ) { }

  getImagesList(){
    let getFileName = 'image'
    this.subImagesList = this.imageRestService.getImagesList(getFileName).subscribe({
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

  getAvatarsList(){
    let getFileName = 'avatar'
    this.subImagesList = this.imageRestService.getImagesList(getFileName).subscribe({
      next: (response) => {
        if (response.body) {
          this.avatarsList = response.body
          this.serviceAvatar.emit(response.body)
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
