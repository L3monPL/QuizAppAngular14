import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImageManagerRestService } from 'src/app/services/components-services/image-manager-rest.service';
import { ImageRestService } from 'src/app/services/image-rest.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  addImageDone = false
  fileToUpload?: File|null
  subUploadFile?: Subscription
  customError?: string|null
  uploadedFile: any
  fileImageURL?: string

  addImageForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    // iconUrl: new FormControl<string|null>(null,Validators.required),
  });

  imageForm = new FormGroup({
    iconUrl: new FormControl<string|null>(null,Validators.required),
  });

  @ViewChild('imageInput')
  myInputVariable?: ElementRef;

  constructor(
    public imageRestService: ImageRestService,
    public imageManagerService: ImageManagerRestService
  ) { }

  ngOnInit(): void {
  }

  postImage(){
    if (this.addImageForm.valid) {
        this.customError = null
        this.uploadedRequest()
        console.log('przeszło')
      if (this.imageForm.valid){
        // this.customError = undefined
        // this.uploadedRequest()
        // console.log('przeszło')
      }
      else if(!this.imageForm.valid){
        // console.log(this.imageForm.valid)
        // console.log('wypełnij danymi')
        this.customError = 'Nie załączono pliku'
      }
    }
    else{
      // console.log('wypełnij danymi')
      this.customError = null
    }
  }

  uploadFile(file: any){
    this.fileToUpload = file.files[0]

    console.log(file.files[0])

    console.log(file.files[0].name)

  }

  uploadedRequest(){
    if (this.fileToUpload) {
      let name = this.addImageForm.get('name')?.value
      this.subUploadFile = this.imageRestService.postImage(
        this.fileToUpload!, name!).subscribe({
        next: (response) => {
          if (response.body) {
            this.customError = undefined
            this.imageManagerService.getImagesList()
            
            this.resetForm()
          }
          else{
            this.customError = 'Brak obiektu odpowiedzi'
            // console.log('wykonało')
          } 
        },
        error: (errorResponse) => {
              this.customError = errorResponse.error.errors.file;
        },
        
        complete: () => {
        }
      })
    }
    else if(this.fileToUpload == undefined){
      this.customError = 'Nie załączono pliku'
    }
    
  }

  get f(){
    return this.addImageForm.controls;
  }

  resetForm(){
    this.addImageForm.controls['name'].setValue('')
    this.imageForm.controls['iconUrl'].setValue(null)

    this.myInputVariable!.nativeElement.value = null

    this.addImageForm.controls['name'].setErrors(null)
    this.imageForm.controls['iconUrl'].setErrors(null)

    this.fileToUpload = null

    this.addImageDone = true

    setTimeout(() => {
      this.addImageDone = false
  }, 4000);
  }

}
