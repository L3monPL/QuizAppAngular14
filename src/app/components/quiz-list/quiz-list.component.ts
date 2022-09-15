import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

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
      icon: '../../../assets/js.png',
      type: 'Back-end',
      progresValue: 25,
    },
    {
      name: 'C++',
      icon: '../../../assets/js.png',
      type: 'Back-end',
      progresValue: 45,
    },
    {
      name: 'Python',
      icon: '../../../assets/js.png',
      type: 'Back-end',
      progresValue: 5,
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
