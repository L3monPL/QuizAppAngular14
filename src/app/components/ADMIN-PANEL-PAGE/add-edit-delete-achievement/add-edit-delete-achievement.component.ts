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
  currentAchivementToEdit?: number

  addAchievementForm = new FormGroup({
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

  checkSelectedAchivementId(id: number){
    let value
    if (this.currentAchivementToEdit !== id) {
      value = true
    }
    if (this.currentAchivementToEdit == id) {
      value = false
    }
    return value
  }

  editAchivement(id: number){
    this.editAchivementShowCard = true
    this.currentAchivementToEdit = id
  }

  showCardAddAchievement(){
    this.addAchievementCard = true
  }
  declineAddAchievementCard(){
    this.addAchievementCard = false
  }

  resetFormAddAchievement(){
    this.addAchievementCard = false
  }

  get f1(){
    return this.addAchievementForm.controls;
  }


}
