import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ImageManagerRestService } from 'src/app/services/components-services/image-manager-rest.service';
import { Image } from 'src/app/services/image-rest.service';

@Component({
  selector: 'app-get-images-list',
  templateUrl: './get-images-list.component.html',
  styleUrls: ['./get-images-list.component.scss']
})
export class GetImagesListComponent implements OnInit {

  imagesList?: Array<Image>

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;

  constructor(
    public imageManagerService: ImageManagerRestService
  ) { }

  ngOnInit(): void {
    this.subscribeImagesList()
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
