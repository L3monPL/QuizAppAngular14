import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-quiz-panel-list',
  templateUrl: './quick-quiz-panel-list.component.html',
  styleUrls: ['./quick-quiz-panel-list.component.scss']
})

export class QuickQuizPanelListComponent implements OnInit {

  buttonRight: any
  buttonLeft: any
  container:any

  constructor() { }

  ngOnInit(): void {
     this.buttonRight = document.getElementById('slideRight');
     this.buttonLeft = document.getElementById('slideLeft');
     this.container = document.getElementById('container');
  

  }
  right(){
    this.buttonRight.onclick = function () {
      this.container.scrollLeft += 20;
    };
  }
}
