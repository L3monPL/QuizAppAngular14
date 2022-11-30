import { Component, OnInit } from '@angular/core';
import { ImageManagerRestService } from 'src/app/services/components-services/image-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { Avatar } from 'src/app/services/image-rest.service';



@Component({
  selector: 'app-edit-profil-profile',
  templateUrl: './edit-profil-profile.component.html',
  styleUrls: ['./edit-profil-profile.component.scss']
})
export class EditProfilProfileComponent implements OnInit {


  currentProfileImage?: string

  selectedItem?: any

  avatarsList?: Array<Avatar>


  constructor(
    public userData: UserDataService,
    public imageManagerRest: ImageManagerRestService
  ) { }

  ngOnInit(): void {
    // console.log(this.userData.getProfileIcon())
    this.imageManagerRest.getAvatarsList()
    this.getSubAvatars()
  }

  checkCurrentImage(){
    for (let index = 0; index < this.avatarsList!.length; index++) {
      if (this.avatarsList![index].uri == this.userData.getProfileIcon()) {
        this.currentProfileImage = this.avatarsList![index].uri
        console.log(this.currentProfileImage)
        this.selectedItem = this.currentProfileImage
      }
    }

  }

  onClickSelect(img: any){
    this.selectedItem = img.uri;
    console.log(this.selectedItem)
    // this.showLessonsFromQuizMap = null
    // this.lastId = null
  }

  getSubAvatars(){
    this.imageManagerRest.serviceAvatar.subscribe(res => {
      this.avatarsList = res
      this.checkCurrentImage()
    })
  }


}
