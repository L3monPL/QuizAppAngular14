import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizMapServiceService {

  quizMap = [
    {
      name: 'Angular Developer',
      icon: '../../../assets/angular.png',
      progress: 35,
      quizList: [ //quizy zaciągnięte z userProgress
        {
          id: 3,
          name: 'HTML',
          icon: '../../../assets/html.png',
          type: 'Front-end',
          progresValue: 85,
          lesson: [
            {
              name: 'Kontenery jako div',
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
            },
            {
              name: 'Zaciąganie skryptów w head',
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
          id: 2,
          name: 'CSS',
          icon: '../../../assets/css.png',
          type: 'Front-end',
          progresValue: 55,
          lesson: [
            {
              name: 'Flex-box',
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
          id: 1,
          name: 'JavaScript',
          icon: '../../../assets/js.png',
          type: 'Front-end',
          progresValue: 75,
          lesson: [
            {
              name: 'Mapowanie',
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
    },
    {
      name: 'C# Developer',
      icon: '../../../assets/csharp.png',
      progress: 35,
      quizList: [ //quizy zaciągnięte z userProgress
        {
          id: 1,
          name: 'C#',
          icon: '../../../assets/csharp.png',
          type: 'Back-end',
          progresValue: 95,
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
          id: 5,
          name: 'SQL',
          icon: '../../../assets/sql.png',
          type: 'Back-end',
          progresValue: 25,
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
    },
    {
      name: 'React Developer',
      icon: '../../../assets/react.png',
      progress: 35,
      quizList: [ //quizy zaciągnięte z userProgress
        {
          id: 3,
          name: 'HTML',
          icon: '../../../assets/html.png',
          type: 'Front-end',
          progresValue: 85,
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
          id: 2,
          name: 'CSS',
          icon: '../../../assets/css.png',
          type: 'Front-end',
          progresValue: 55,
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
          id: 1,
          name: 'JavaScript',
          icon: '../../../assets/js.png',
          type: 'Front-end',
          progresValue: 75,
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

  selectedItem = this.quizMap[0];

  constructor() { }

  onClickMapSelect(item:any){
    this.selectedItem = item;
    console.log(this.selectedItem)
  }
}
