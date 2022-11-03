import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryRestService } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { ImageRestService } from 'src/app/services/image-rest.service';
import { QuestionRestService } from 'src/app/services/question-rest.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  subAddCategory?: Subscription
  customError?: string

  addCategoryDone = false

  subUploadFile?: Subscription
  fileToUpload?: File

  uploadedFile: any
  fileImageURL?: string

  addCategoryForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    description: new FormControl<string>('',Validators.required),
    iconUrl: new FormControl<string|null>('https://cdn-icons-png.flaticon.com/512/5705/5705144.png',Validators.required),
    questionsPerLesson: new FormControl<number|null>(null,Validators.required),
    lessonsPerLevel: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    public questionRestService: QuestionRestService,
    public categoryManagerService: CategoryManagerRestService,
    public categoryRestService: CategoryRestService,
    public imageRestService: ImageRestService
  ) { }

  ngOnInit(): void {
  }

  get f(){
    return this.addCategoryForm.controls;
  }

  resetForm(){
    this.addCategoryForm.controls['name'].setValue('')
    this.addCategoryForm.controls['description'].setValue('')
    this.addCategoryForm.controls['iconUrl'].setValue('')
    this.addCategoryForm.controls['questionsPerLesson'].setValue(null)
    this.addCategoryForm.controls['lessonsPerLevel'].setValue(null)

    this.addCategoryForm.controls['name'].setErrors(null)
    this.addCategoryForm.controls['description'].setErrors(null)
    this.addCategoryForm.controls['iconUrl'].setErrors(null)
    this.addCategoryForm.controls['questionsPerLesson'].setErrors(null)
    this.addCategoryForm.controls['lessonsPerLevel'].setErrors(null)


    this.addCategoryDone = true

    setTimeout(() => {
      this.addCategoryDone = false
  }, 4000);
  }

  postQuestionToCategory(){
    if (this.addCategoryForm.valid) {
      this.uploadedRequest()
      // console.log('działa')

    }
    else{
      // console.log('wypełnij danymi')
    }
  }

  uploadFile(file: any){
    this.fileToUpload = file.files[0]

    console.log(file.files[0])

    console.log(file.files[0].name)

  }

  uploadedRequest(){
    if (this.fileToUpload) {
      let name = this.addCategoryForm.get('name')?.value
      this.subUploadFile = this.imageRestService.postImage(
        this.fileToUpload!, name!).subscribe({
        next: (response) => {
          if (response.body) {
            console.log(response.body)
            this.uploadedFile = response.body
            this.fileImageURL = this.uploadedFile.blob.uri
            console.log(this.fileImageURL)
            this.addCategoryForm.controls['iconUrl'].setValue(this.fileImageURL!)
            this.postCategoryRequest()
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
      this.postCategoryRequest()
    }
    
  }

  postCategoryRequest(){
    let name = this.addCategoryForm.get('name')?.value
    let description = this.addCategoryForm.get('description')?.value
    let iconUrl = this.addCategoryForm.get('iconUrl')?.value
    let questionsPerLesson = this.addCategoryForm.get('questionsPerLesson')?.value
    let lessonsPerLevel = this.addCategoryForm.get('lessonsPerLevel')?.value
    this.subAddCategory = this.categoryRestService.postCategory(
      name!, description!, iconUrl!, questionsPerLesson!, lessonsPerLevel!
      ).subscribe({
      next: (response) => {
        if (response.body) {
          this.customError = undefined
          this.resetForm()
          this.categoryManagerService.getCategoryList()
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

}
