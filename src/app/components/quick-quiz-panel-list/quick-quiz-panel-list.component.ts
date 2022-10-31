import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CategoryRestService } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';

@Component({
  selector: 'app-quick-quiz-panel-list',
  templateUrl: './quick-quiz-panel-list.component.html',
  styleUrls: ['./quick-quiz-panel-list.component.scss']
})


export class QuickQuizPanelListComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
     onResize(event: any){
      this.setSizeOptions(window.innerWidth)
   }

  value?: number
  valueFirst?: number
  items: any
  itemsRest?: any
  mobile?: boolean
  mobileMini?: boolean

  constructor(
    public categoryRest: CategoryRestService,
    public categoryManagerService: CategoryManagerRestService
  ) { }

  ngOnInit(): void {
    this.categoryManagerService.getCategoryList()
    // this.items = this.categoryRest.categoryList!
    this.categoryManagerService.serviceCategory.subscribe(res => {
      this.itemsRest = this.categoryRest.categoryList!
       // console.log(this.categoryRest.categoryList)
    if(window.innerWidth < 400){
      this.mobile = true
      this.mobileMini = true
      this.value = 2
      this.valueFirst = 0
    }
    if(window.innerWidth < 800 && window.innerWidth >= 400){
      this.mobile = true
      this.mobileMini = false
      this.value = 3
      this.valueFirst = 0
    }
    if(window.innerWidth >= 800){
      this.mobile = false
      this.mobileMini = false
      this.value = 5
      this.valueFirst = 0
    }
    this.items = this.itemsRest!.slice(this.valueFirst, this.value)
    console.log(this.items)

    // this.setSizeOptions(window.innerWidth)
    })
   
  }

  setSizeOptions(width: number){
  if(window.innerWidth < 400){
    this.mobile = true
    this.mobileMini = true
    this.value = 2
    this.valueFirst = 0
    this.items = this.itemsRest!.slice(this.valueFirst, this.value)
    console.log('mobile mini')
    console.log(this.value, this.valueFirst)
  }
  if(window.innerWidth < 800 && window.innerWidth >= 400){
    this.mobile = true
    this.mobileMini = false
    this.value = 3
    this.valueFirst = 0
    this.items = this.itemsRest!.slice(this.valueFirst, this.value)
    console.log('mobile')
    console.log(this.value, this.valueFirst)
  }
  if(window.innerWidth >= 800){
    this.mobile = false
    this.mobileMini = false
    this.value = 5
    this.valueFirst = 0
    this.items = this.itemsRest!.slice(this.valueFirst, this.value)
    console.log('desktop')
    console.log(this.value, this.valueFirst)
  }
  }
  element = [
    {
      user: "elo1"
    },
    {
      user: "elo2"
    },
    {
      user: "elo3"
    },
    {
      user: "elo4"
    },
    {
      user: "elo5"
    },
    {
      user: "elo6"
    },
    {
      user: "elo7"
    },
    {
      user: "elo8"
    },
    {
      user: "elo9"
    },
    {
      user: "elo10"
    },
    {
      user: "elo11"
    },
  ]

  left(){
    if (this.valueFirst! > 0 && this.mobileMini == false) {
      this.valueFirst! -= 3
      this.value! -= 3
      this.items = this.itemsRest!.slice(this.valueFirst, this.value)
      console.log('left')
    }
    if (this.valueFirst! > 0 && this.mobileMini == true) {
      this.valueFirst! -= 1
      this.value! -= 1
      this.items = this.itemsRest!.slice(this.valueFirst, this.value)
    }
  }
  right(){
    if (this.itemsRest!.length! > this.value! && this.mobileMini == false) {
      this.valueFirst! += 3
      this.value! += 3
      this.items = this.itemsRest!.slice(this.valueFirst, this.value)
      console.log('left') 
    }
    if (this.itemsRest!.length! > this.value! && this.mobileMini == true) {
      this.valueFirst! += 1
      this.value! += 1
      this.items = this.categoryRest.categoryList!.slice(this.valueFirst, this.value)
    }
  }


}
