import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { QuestionManagerRestService } from 'src/app/services/components-services/question-manager-rest.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  idParam?: any

  quizList = []
  quizes: any
  indexOfQuiz = 0
  progressBarQuizLength = 0
  selectedQuestion = []
  acceptAnswer?: string
  valueAnswer = 0
  endResult = 0
  getResultValue?: number

  btnNextEnable = false
  btnShowResult = false

  countDown?: Subscription
  counter?: number
  tick = 1000;

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
    this.takeValueFromRest()
    this.timer()
  }
  ngOnDestroy(): void{
    this.countDown?.unsubscribe()
  }

  checkUrl(){
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('code')
      this.questionManagerService.level = this.idParam
      console.log(this.idParam);
    });
  }

  nextQuestion(){
    this.endResult = this.endResult + this.valueAnswer
    
    this.indexOfQuiz = this.indexOfQuiz + 1
    this.progressBarQuizLength = ((this.indexOfQuiz)/this.quizList.length)*100

    this.timer()

    if (this.indexOfQuiz < this.quizList.length) {
      this.quizes = this.quizList[this.indexOfQuiz]
      this.btnNextEnable = false
    }
    else if(this.indexOfQuiz >= this.quizList.length){
      this.btnShowResult = true
      this.getResultValue = (this.endResult / this.quizList.length) * 100
    }
    console.log(this.indexOfQuiz)
    console.log(this.quizList.length)

    
  }

  takeValueFromRest(){
    this.questionManagerService.quizEmitterRest.subscribe(item => {
      this.quizList = item
      // console.log(this.quizList)
      if (this.quizList) {
          console.log(this.quizList.length)
          console.log(this.quizList[0])
          this.quizes = this.quizList[0]
      }
    })
  }

  onClickAnswerSelect(question: any){
    this.btnNextEnable = true
    this.selectedQuestion = question
    console.log(this.selectedQuestion)
    if (question == this.quizes.a) {
      this.acceptAnswer = 'a'
      if (this.quizes.correctAnswer == this.acceptAnswer) {
        this.valueAnswer = 1
      }
      else if (this.quizes.correctAnswer != this.acceptAnswer){
        this.valueAnswer = 0
      }
      console.log(this.valueAnswer)
    }
    if (question == this.quizes.b) {
      this.acceptAnswer = 'b'
      if (this.quizes.correctAnswer == this.acceptAnswer) {
        this.valueAnswer = 1
      }
      else if (this.quizes.correctAnswer != this.acceptAnswer){
        this.valueAnswer = 0
      }
      console.log(this.valueAnswer)
    }
    if (question == this.quizes.c) {
      this.acceptAnswer = 'c'
      if (this.quizes.correctAnswer == this.acceptAnswer) {
        this.valueAnswer = 1
      }
      else if (this.quizes.correctAnswer != this.acceptAnswer){
        this.valueAnswer = 0
      }
      console.log(this.valueAnswer)
    }
    if (question == this.quizes.d) {
      this.acceptAnswer = 'd'
      if (this.quizes.correctAnswer == this.acceptAnswer) {
        this.valueAnswer = 1
      }
      else if (this.quizes.correctAnswer != this.acceptAnswer){
        this.valueAnswer = 0
      }
      console.log(this.valueAnswer)
    }
    // console.log(this.selectedQuestion)
  }

  timer(){
    this.counter = 30
    this.acceptAnswer = 'time'
    this.valueAnswer = 0 
    if (this.counter > 0) {
      this.countDown = timer(0, this.tick).subscribe(() => 
      {
        --this.counter!
        if (this.counter == 0) {
          this.countDown?.unsubscribe()
          this.nextQuestion()
        }
      }) 
    }
  }


}


@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}