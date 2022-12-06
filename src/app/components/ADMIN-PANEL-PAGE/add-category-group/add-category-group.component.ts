import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryGroupServiceService } from 'src/app/services/category-group-service.service';
import { ImageRestService } from 'src/app/services/image-rest.service';

@Component({
  selector: 'app-add-category-group',
  templateUrl: './add-category-group.component.html',
  styleUrls: ['./add-category-group.component.scss']
})
export class AddCategoryGroupComponent implements OnInit {

  subUploadFile?: Subscription
  subAddCategoryGroup?: Subscription
  uploadedFile: any
  fileToUpload?: File
  fileImageURL?: string
  customError?: string
  addCategoryDone = false

  addCategoryGroupForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    iconUrl: new FormControl<string|null>('https://cdn-icons-png.flaticon.com/512/5705/5705144.png',Validators.required),
  });

  constructor(
    private imageRestService: ImageRestService,
    public categoryGroupRest: CategoryGroupServiceService
  ) { }

  ngOnInit(): void {
  }

  uploadFile(file: any){
    this.fileToUpload = file.files[0]
  }

  addCategoryGroup(){
    if (this.addCategoryGroupForm.valid) {
      this.uploadedRequest()
    }
    else{

    }
  }

  uploadedRequest(){
    let getFileName = 'image'
    if (this.fileToUpload) {
      let name = this.addCategoryGroupForm.get('name')?.value
      this.subUploadFile = this.imageRestService.postImage(
        this.fileToUpload!, name!, getFileName).subscribe({
        next: (response) => {
          if (response.body) {
            console.log(response.body)
            this.uploadedFile = response.body
            this.fileImageURL = this.uploadedFile.blob.uri
            console.log(this.fileImageURL)
            this.addCategoryGroupForm.controls['iconUrl'].setValue(this.fileImageURL!)
            this.postCategoryGroupRequest()
          }
          else{
            this.customError = 'Brak obiektu odpowiedzi'
            console.log('wykonało')
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
      this.postCategoryGroupRequest()
    }
    
  }

  postCategoryGroupRequest(){
    let name = this.addCategoryGroupForm.get('name')?.value
    let iconUrl = this.addCategoryGroupForm.get('iconUrl')?.value
    this.subAddCategoryGroup = this.categoryGroupRest.postCategoryGroup(name!, iconUrl!).subscribe({
      next: (response) => {
        if (response.body) {
          this.customError = undefined
          this.resetForm()
          // this.categoryManagerService.getCategoryList()
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
          console.log('wykonało')
        } 
      },
      error: (errorResponse) => {
            this.customError = errorResponse.error;
      },
      
      complete: () => {
      }
    })
  }

  resetForm(){
    this.addCategoryGroupForm.controls['name'].setValue('')
    this.addCategoryGroupForm.controls['iconUrl'].setValue('')

    this.addCategoryGroupForm.controls['name'].setErrors(null)
    this.addCategoryGroupForm.controls['iconUrl'].setErrors(null)

    this.addCategoryDone = true

    setTimeout(() => {
      this.addCategoryDone = false
  }, 4000);
  }

  get f(){
    return this.addCategoryGroupForm.controls;
  }

}
