import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CategoryRestService } from 'src/app/services/category-rest.service';

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
  mobile?: boolean

  constructor(
    public categoryRest: CategoryRestService
  ) { }

  ngOnInit(): void {
    if(window.innerWidth < 800){
      this.mobile = true
      this.value = 3
      this.valueFirst = 0
    }
    if(window.innerWidth >= 800){
      this.mobile = false
      this.value = 5
      this.valueFirst = 0
    }
    this.items = this.element.slice(this.valueFirst, this.value)
    console.log(this.items)

    this.setSizeOptions(window.innerWidth)
  }

  setSizeOptions(width: number){
  if(window.innerWidth < 800){
    this.mobile = true
    this.value = 3
    this.valueFirst = 0
    console.log('mobile')
    console.log(this.value, this.valueFirst)
  }
  if(window.innerWidth >= 800){
    this.mobile = false
    this.value = 5
    this.valueFirst = 0
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
    if (this.valueFirst! > 0) {
      this.valueFirst! -= 3
      this.value! -= 3
      this.items = this.element.slice(this.valueFirst, this.value)
      console.log('left')
    }
  }
  right(){
    if (this.element.length > this.value!) {
      this.valueFirst! += 3
      this.value! += 3
      this.items = this.element.slice(this.valueFirst, this.value)
      console.log('left') 
    }
  }


}
