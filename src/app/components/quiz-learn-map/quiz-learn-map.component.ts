import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-learn-map',
  templateUrl: './quiz-learn-map.component.html',
  styleUrls: ['./quiz-learn-map.component.scss']
})
export class QuizLearnMapComponent implements OnInit {

  quizList = [
    {
      name: 'JavaScript',
      icon: '../../../assets/js.png',
      type: 'Front-end',
      progresValue: 75,
      link: '/home/quiz/1'
    },
    {
      name: 'CSS',
      icon: '../../../assets/css.png',
      type: 'Front-end',
      progresValue: 55,
      link: '/home/quiz/2'
    },
    {
      name: 'HTML',
      icon: '../../../assets/html.png',
      type: 'Front-end',
      progresValue: 85,
      link: '/home/quiz/3'
    },
    {
      name: 'C#',
      icon: '../../../assets/csharp.png',
      type: 'Back-end',
      progresValue: 95,
      link: '/home/quiz/4'
    },
    {
      name: 'SQL',
      icon: '../../../assets/sql.png',
      type: 'Back-end',
      progresValue: 25,
      link: '/home/quiz/5'
    },
    {
      name: 'C++',
      icon: '../../../assets/c++.png',
      type: 'Back-end',
      progresValue: 45,
      link: '/home/quiz/6'
    },
    {
      name: 'Python',
      icon: '../../../assets/python.png',
      type: 'Back-end',
      progresValue: 5,
      link: '/home/quiz/7'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}