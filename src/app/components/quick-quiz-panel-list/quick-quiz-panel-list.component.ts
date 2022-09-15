import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quick-quiz-panel-list',
  templateUrl: './quick-quiz-panel-list.component.html',
  styleUrls: ['./quick-quiz-panel-list.component.scss']
})

export class QuickQuizPanelListComponent implements OnInit {

  quizList = [
    {
      name: 'JavaScript',
      icon: '../../../assets/js.png',
      type: 'Front-end',
      progresValue: 75,
    },
    {
      name: 'CSS',
      icon: '../../../assets/css.png',
      type: 'Front-end',
      progresValue: 55,
    },
    {
      name: 'HTML',
      icon: '../../../assets/html.png',
      type: 'Front-end',
      progresValue: 85,
    },
    {
      name: 'C#',
      icon: '../../../assets/csharp.png',
      type: 'Back-end',
      progresValue: 95,
    },
    {
      name: 'SQL',
      icon: '../../../assets/sql.png',
      type: 'Back-end',
      progresValue: 25,
    },
    {
      name: 'C++',
      icon: '../../../assets/c++.png',
      type: 'Back-end',
      progresValue: 45,
    },
    {
      name: 'Python',
      icon: '../../../assets/python.png',
      type: 'Back-end',
      progresValue: 5,
    },

  ]

  constructor() { }

  ngOnInit(): void {

  }


}
