import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/global-services/user-data.service';



@Component({
  selector: 'app-edit-profil-profile',
  templateUrl: './edit-profil-profile.component.html',
  styleUrls: ['./edit-profil-profile.component.scss']
})
export class EditProfilProfileComponent implements OnInit {

  images =[
    {
      profileImg: "https://wsblearnstorage.blob.core.windows.net/imagecontainer/User_Icon_0"
    },
    {
      profileImg: "https://wsblearnstorage.blob.core.windows.net/imagecontainer/Quiz Form"
    },
    {
      profileImg: "https://wsblearnstorage.blob.core.windows.net/imagecontainer/WSB XD"
    },
    // {
    //   profileImg: "https://wsblearnstorage.blob.core.windows.net/imagecontainer/User_Icon_0"
    // },
    // {
    //   profileImg: "https://wsblearnstorage.blob.core.windows.net/imagecontainer/User_Icon_0"
    // },
    // {
    //   profileImg: "https://wsblearnstorage.blob.core.windows.net/imagecontainer/User_Icon_0"
    // },
    // {
    //   profileImg: "https://wsblearnstorage.blob.core.windows.net/imagecontainer/User_Icon_0"
    // },
  ]

  currentProfileImage?: string

  selectedItem?: any


  constructor(
    public userData: UserDataService,
  ) { }

  ngOnInit(): void {
    // console.log(this.userData.getProfileIcon())
    this.checkCurrentImage()
  }

  checkCurrentImage(){
    for (let index = 0; index < this.images.length; index++) {
      if (this.images[index].profileImg == this.userData.getProfileIcon()) {
        this.currentProfileImage = this.images[index].profileImg
        console.log(this.currentProfileImage)
        this.selectedItem = this.currentProfileImage
      }
    }

  }

  onClickSelect(img: any){
    this.selectedItem = img.profileImg;
    console.log(this.selectedItem)
    // this.showLessonsFromQuizMap = null
    // this.lastId = null
  }

}
