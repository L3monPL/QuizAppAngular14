import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-map-list',
  templateUrl: './quiz-map-list.component.html',
  styleUrls: ['./quiz-map-list.component.scss']
})
export class QuizMapListComponent implements OnInit {

  quizMap = [
    {
      name: 'Angular Developer',
      progress: 35,
      quizList: [ //quizy zaciągnięte z userProgress
        {
          name: 'HTML',
          icon: '../../../assets/html.png',
          type: 'Front-end',
          progresValue: 85,
          link: '/home/quiz/3',
          lesson: [
            {
              name: 'Kontenery',
              description: 'Wszystko o divach w HTML',
              questions: [
                {
                  id: 1,
                  lessonLevel: 1,
                  questionConten: "2 + 2 =",
                  imageUrl: "",
                  a: "1",
                  b: "4",
                  c: "7",
                  d: "null",
                  correctAnswer: "B",
                  lessonId: 1
                },
                {
                  id: 2,
                  lessonLevel: 1,
                  questionConten: "4 + 4 =",
                  imageUrl: "",
                  a: "1",
                  b: "4",
                  c: "8",
                  d: "null",
                  correctAnswer: "C",
                  lessonId: 1
                }
              ]
            }
          ]
        },
        {
          name: 'CSS',
          icon: '../../../assets/css.png',
          type: 'Front-end',
          progresValue: 55,
          link: '/home/quiz/2',
          lesson: [
            {
              name: 'Kontenery',
              description: 'Wszystko o divach w HTML',
              questions: [
                {
                  id: 1,
                  lessonLevel: 1,
                  questionConten: "2 + 2 =",
                  imageUrl: "",
                  a: "1",
                  b: "4",
                  c: "7",
                  d: "null",
                  correctAnswer: "B",
                  lessonId: 1
                },
                {
                  id: 2,
                  lessonLevel: 1,
                  questionConten: "4 + 4 =",
                  imageUrl: "",
                  a: "1",
                  b: "4",
                  c: "8",
                  d: "null",
                  correctAnswer: "C",
                  lessonId: 1
                }
              ]
            }
          ]
        },
        {
          name: 'JavaScript',
          icon: '../../../assets/js.png',
          type: 'Front-end',
          progresValue: 75,
          link: '/home/quiz/1',
          lesson: [
            {
              name: 'Kontenery',
              description: 'Wszystko o divach w HTML',
              questions: [
                {
                  id: 1,
                  lessonLevel: 1,
                  questionConten: "2 + 2 =",
                  imageUrl: "",
                  a: "1",
                  b: "4",
                  c: "7",
                  d: "null",
                  correctAnswer: "B",
                  lessonId: 1
                },
                {
                  id: 2,
                  lessonLevel: 1,
                  questionConten: "4 + 4 =",
                  imageUrl: "",
                  a: "1",
                  b: "4",
                  c: "8",
                  d: "null",
                  correctAnswer: "C",
                  lessonId: 1
                }
              ]
            }
          ]
        },
      ]
    }
  ]

  // quizList = [
  //   {
  //     name: 'JavaScript',
  //     icon: '../../../assets/js.png',
  //     type: 'Front-end',
  //     progresValue: 75,
  //     link: '/home/quiz/1'
  //   },
  //   {
  //     name: 'CSS',
  //     icon: '../../../assets/css.png',
  //     type: 'Front-end',
  //     progresValue: 55,
  //     link: '/home/quiz/2'
  //   },
  //   {
  //     name: 'HTML',
  //     icon: '../../../assets/html.png',
  //     type: 'Front-end',
  //     progresValue: 85,
  //     link: '/home/quiz/3'
  //   },
  //   {
  //     name: 'C#',
  //     icon: '../../../assets/csharp.png',
  //     type: 'Back-end',
  //     progresValue: 95,
  //     link: '/home/quiz/4'
  //   },
  //   {
  //     name: 'SQL',
  //     icon: '../../../assets/sql.png',
  //     type: 'Back-end',
  //     progresValue: 25,
  //     link: '/home/quiz/5'
  //   },
  //   {
  //     name: 'C++',
  //     icon: '../../../assets/c++.png',
  //     type: 'Back-end',
  //     progresValue: 45,
  //     link: '/home/quiz/6'
  //   },
  //   {
  //     name: 'Python',
  //     icon: '../../../assets/python.png',
  //     type: 'Back-end',
  //     progresValue: 5,
  //     link: '/home/quiz/7'
  //   },
  // ]

  constructor() { }

  ngOnInit(): void {
  }

}
