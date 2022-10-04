import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionManagerRestService } from 'src/app/services/components-services/question-manager-rest.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  idParam?: any

  quizList = []
  quizes: any
  indexOfQuiz = 0

  constructor(
    private route: ActivatedRoute,
    public questionManagerService: QuestionManagerRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkUrl()
    this.questionManagerService.getQuestionsList()
    if (this.questionManagerService.categoryId == undefined) {
      this.router.navigate(['./home/dashboard'])
    }


    this.questionManagerService.quizEmitterRest.subscribe(item => {
      this.quizList = item
      // console.log(this.quizList)
      if (this.quizList) {
          console.log(this.quizList.length)
          console.log(this.quizList[0])
          this.quizes = this.quizList[0]
      }
    })


    // console.log(this.questionManagerService.questionsList!)
    // // this.questionManagerService.questionsList?.values
    // let selectedCategory = this.questionManagerService.questionsList![0]
    // console.log(selectedCategory)

    // if (this.quizList) {
    //   let selectedCategory = this.quizList![0]
    //       console.log(selectedCategory)
    // }

  }

  checkUrl(){
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('code')
      this.questionManagerService.level = this.idParam
      console.log(this.idParam);
    });
  }

  nextQuestion(){
    
    this.indexOfQuiz = this.indexOfQuiz + 1
    if (this.indexOfQuiz < this.quizList.length) {
      this.quizes = this.quizList[this.indexOfQuiz]
    }
    else if(this.indexOfQuiz >= this.quizList.length){
      //zakończ quiz
    }
    console.log(this.indexOfQuiz)
    console.log(this.quizList.length)
  }

}
