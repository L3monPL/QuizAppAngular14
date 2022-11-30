import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageManagerRestService } from 'src/app/services/components-services/image-manager-rest.service';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { Avatar } from 'src/app/services/image-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';



@Component({
  selector: 'app-edit-profil-profile',
  templateUrl: './edit-profil-profile.component.html',
  styleUrls: ['./edit-profil-profile.component.scss']
})
export class EditProfilProfileComponent implements OnInit, OnDestroy {


  currentProfileImage?: string

  selectedItem?: any

  avatarsList?: Array<Avatar>

  subEditAvatar?: Subscription
  subGetAvatar?: Subscription
  customErrorAvatarSet?: string
  currentUserId?: number

  constructor(
    public userData: UserDataService,
    public imageManagerRest: ImageManagerRestService,
    public userRestService: UserRestService,
    public userManagerService: UserManagerRestService
  ) { }
  ngOnDestroy(): void {
    this.subEditAvatar?.unsubscribe()
    this.subGetAvatar?.unsubscribe()
  }

  ngOnInit(): void {
    // console.log(this.userData.getProfileIcon())
    this.imageManagerRest.getAvatarsList()
    this.getSubAvatars()

    this.currentUserId = this.userManagerService.currentUserProgressValue?.id

    this.userManagerService.serviceCurrentUser.subscribe(res => {
      this.currentUserId = this.userManagerService.currentUserProgressValue?.id
    })
  }

  checkCurrentImage(){
    for (let index = 0; index < this.avatarsList!.length; index++) {
      if (this.avatarsList![index].uri == this.userData.getProfileIcon()) {
        this.currentProfileImage = this.avatarsList![index].uri
        // console.log(this.currentProfileImage)
        this.selectedItem = this.currentProfileImage
      }
    }

  }

  onClickSelect(img: any){
    this.selectedItem = img.uri;
    // console.log(this.selectedItem)
    // this.showLessonsFromQuizMap = null
    // this.lastId = null
  }

  getSubAvatars(){
    this.subGetAvatar = this.imageManagerRest.serviceAvatar.subscribe(res => {
      this.avatarsList = res
      this.checkCurrentImage()
    })
  }

  changeAvatar(){
    console.log(this.selectedItem)
    

    

    this.subEditAvatar = this.userRestService.postUserAvatar(this.currentUserId! ,this.selectedItem!).subscribe({
      next: (response) => {
        if (response.body) {
          this.userManagerService.checkUserProgress()
        }
        else{
          this.customErrorAvatarSet = 'Brak obiektu odpowiedzi'
        } 
      },
      error: (errorResponse) => {
            this.customErrorAvatarSet = errorResponse.error;
            console.log(this.customErrorAvatarSet)
      },
      complete: () => {}
    })
  }


}
