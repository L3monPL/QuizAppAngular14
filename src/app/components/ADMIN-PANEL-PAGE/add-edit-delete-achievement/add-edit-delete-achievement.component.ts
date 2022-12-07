import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Achievement, AchievementRestService } from 'src/app/services/achievement-rest.service';

@Component({
  selector: 'app-add-edit-delete-achievement',
  templateUrl: './add-edit-delete-achievement.component.html',
  styleUrls: ['./add-edit-delete-achievement.component.scss']
})
export class AddEditDeleteAchievementComponent implements OnInit {

  subAchievementList?: Subscription
  customErrorAchievementList?: string
  achievementList?: Array<Achievement>

  addAchievementCard = false

  subAddAchievement?: Subscription
  customErrorAddAchievement?: string

  disableBtnAddAchievement = false

  subDeleteAchievement?: Subscription
  customErrorDeleteAchievement?: string

  editAchivementShowCard = false
  currentAchivementToEdit?: number|string

  subEditAchievement?: Subscription

  addAchievementForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    description: new FormControl<string>('',Validators.required)
  });

  editAchievementForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    description: new FormControl<string>('',Validators.required)
  });

  constructor(
    private achievementRest: AchievementRestService
  ) { }

  ngOnInit(): void {
    this.getAchievementList()
  }

  getAchievementList(){
      this.subAchievementList = this.achievementRest.getAchievementList().subscribe({
        next: (response) => {
          if (response.body) {
            this.achievementList = response.body
            console.log(this.achievementList)
          }
          else{
            this.customErrorAchievementList = 'Brak obiektu odpowiedzi'
          } 
        },
        error: (errorResponse) => {
              this.customErrorAchievementList = errorResponse.error;
        },
        complete: () => {
          
        }
      })
  }

  addAchievement(){
    this.disableBtnAddAchievement = true
    if (this.addAchievementForm.valid) {
      let name = this.addAchievementForm.get('name')?.value 
      let description = this.addAchievementForm.get('description')?.value 
      this.subAddAchievement = this.achievementRest.postAchievement(name!, description!).subscribe({
        next: (response) => {
          if (response.body) {
            this.resetFormAddAchievement()
            this.getAchievementList()
            this.disableBtnAddAchievement = false
          }
          else{
            this.customErrorAddAchievement = 'Brak obiektu odpowiedzi'
            this.disableBtnAddAchievement = false
          } 
        },
        error: (errorResponse) => {
              this.customErrorAddAchievement = errorResponse.error;
              this.disableBtnAddAchievement = false
        },
        complete: () => {
          
        }
      })
    }
  }

  deleteAchievement(id: number){
    this.subDeleteAchievement = this.achievementRest.deleteAchievement(id!).subscribe({
      next: (response) => {
          this.getAchievementList()

      },
      error: (errorResponse) => {
            this.customErrorDeleteAchievement = errorResponse.error;
      },
      complete: () => {
        
      }
    })
  }

  delcineEditAchievement(id: number){
    this.currentAchivementToEdit = 'close'
    this.checkSelectedAchivementId(id)
  }

  acceptEditAchivement(id: number){
    let name = this.editAchievementForm.get('name')?.value 
    let description = this.editAchievementForm.get('description')?.value 

    if (this.editAchievementForm.valid) {
      this.subEditAchievement = this.achievementRest.patchAchievement(name!, description!, id).subscribe({
        next: (response) => {
          if (response.body) {
            this.delcineEditAchievement(id)
            this.getAchievementList()
          }
          else{
            this.customErrorAddAchievement = 'Brak obiektu odpowiedzi'
          } 
        },
        error: (errorResponse) => {
              this.customErrorAddAchievement = errorResponse.error;
        },
        complete: () => {
          
        }
      })
    }
  }

  checkSelectedAchivementId(id: number){
    let value
    if (this.currentAchivementToEdit !== id) {
      value = true
    }
    if (this.currentAchivementToEdit == id) {
      value = false
    }
    if (this.currentAchivementToEdit == 'close') {
      value = true
    }

    return value
  }

  editAchivement(achivement: Achievement){
    this.editAchivementShowCard = true
    this.currentAchivementToEdit = achivement.id

    this.editAchievementForm.controls['name'].setValue(achivement.name)
    this.editAchievementForm.controls['description'].setValue(achivement.description)
  }

  showCardAddAchievement(){
    this.addAchievementCard = true
  }
  declineAddAchievementCard(){
    this.addAchievementForm.controls['name'].setValue('')
    this.addAchievementForm.controls['description'].setValue('')

    this.addAchievementForm.controls['name'].setErrors(null)
    this.addAchievementForm.controls['description'].setErrors(null)

    this.addAchievementForm.reset()

    this.addAchievementCard = false
  }

  resetFormAddAchievement(){
    this.declineAddAchievementCard()

  }

  get f1(){
    return this.addAchievementForm.controls;
  }

  get f2(){
    return this.editAchievementForm.controls;
  }


}
