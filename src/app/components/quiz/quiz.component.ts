import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { QuestionManagerRestService } from 'src/app/services/components-services/question-manager-rest.service';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { UserProgressRestService } from 'src/app/services/user-progress-rest.service';
import { CategoryProgress, LevelProgresses } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  currentUserProgressToCategory?: CategoryProgress

  idParam?: any

  currentLvl?: LevelProgresses

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

  subSaveProgress?: Subscription
  loading = false
  customError?: string
  selectedQuizLevelName?: string

  constructor(
    private route: ActivatedRoute,
    public questionManagerService: QuestionManagerRestService,
    private router: Router,
    public userProgressRest: UserProgressRestService,
    public userDataService: UserDataService,
    private userManagerService: UserManagerRestService
  ) { }

  ngOnInit(): void {
    this.checkUrl()
    this.questionManagerService.getQuestionsList()
    if (this.questionManagerService.categoryId == undefined) {
      this.router.navigate(['./home/dashboard'])
    }
    this.takeValueFromRest()
    this.timer()
    // this.checkUser()
  }
  ngOnDestroy(): void{
    this.countDown?.unsubscribe()
  }

  checkUrl(){
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('code')
      this.questionManagerService.level = this.idParam
      // console.log(this.idParam);
      if (this.idParam == 1) {
        this.selectedQuizLevelName = 'Easy' 
      }
      if (this.idParam == 2) {
        this.selectedQuizLevelName = 'Medium' 
      }
      if (this.idParam == 3) {
        this.selectedQuizLevelName = 'Hard' 
      }
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
      // console.log("działa przed pętlą" + this.endResult + "na quizy" + this.quizList.length)
      if (this.endResult / this.quizList.length == 1) {
        // console.log("działa w pętli")
        this.checkUser()
        // console.log('checkUser init')
      }
      
    }
    // console.log(this.indexOfQuiz)
    // console.log(this.quizList.length)

    
  }

  takeValueFromRest(){
    this.questionManagerService.quizEmitterRest.subscribe(item => {
      this.quizList = item
      // console.log(this.quizList)
      if (this.quizList) {
          // console.log(this.quizList.length)
          // console.log(this.quizList[0])
          this.quizes = this.quizList[0]
      }
    })
  }

  onClickAnswerSelect(question: any){
    this.btnNextEnable = true
    this.selectedQuestion = question
    // console.log(this.selectedQuestion)
    if (question == this.quizes.a) {
      this.acceptAnswer = 'a'
      if (this.quizes.correctAnswer == this.acceptAnswer) {
        this.valueAnswer = 1
      }
      else if (this.quizes.correctAnswer != this.acceptAnswer){
        this.valueAnswer = 0
      }
      // console.log(this.valueAnswer)
    }
    if (question == this.quizes.b) {
      this.acceptAnswer = 'b'
      if (this.quizes.correctAnswer == this.acceptAnswer) {
        this.valueAnswer = 1
      }
      else if (this.quizes.correctAnswer != this.acceptAnswer){
        this.valueAnswer = 0
      }
      // console.log(this.valueAnswer)
    }
    if (question == this.quizes.c) {
      this.acceptAnswer = 'c'
      if (this.quizes.correctAnswer == this.acceptAnswer) {
        this.valueAnswer = 1
      }
      else if (this.quizes.correctAnswer != this.acceptAnswer){
        this.valueAnswer = 0
      }
      // console.log(this.valueAnswer)
    }
    if (question == this.quizes.d) {
      this.acceptAnswer = 'd'
      if (this.quizes.correctAnswer == this.acceptAnswer) {
        this.valueAnswer = 1
      }
      else if (this.quizes.correctAnswer != this.acceptAnswer){
        this.valueAnswer = 0
      }
      // console.log(this.valueAnswer)
    }
    // console.log(this.selectedQuestion)
  }

  timer(){
    this.counter = 30
    this.acceptAnswer = 'time'
    this.valueAnswer = 0 
    this.countDown?.unsubscribe()
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

  saveProgress(){
    console.log('saveProgress init')
    this.userProgressRest.postUserProgressExpGained(
      this.questionManagerService.categoryId!,
      this.quizes?.level!,
      this.selectedQuizLevelName!,
      20
    ).subscribe({
      next: (response) => {
        if (response.body) {
          this.loading = false
          this.userManagerService.checkUserProgress()
          this.userManagerService.checkRankingUsers()
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
          this.loading = false
        } 
      },
      error: (errorResponse) => {
            this.customError = errorResponse.error;
            this.loading = false
      },
      complete: () => {}
    })
  }


  checkUser(){
    // console.log(this.userDataService.user?.userProgress.categoryProgress)
    // console.log(this.idParam)

    // console.log('checkUser work')

    // this.currentUserProgressToCategory = this.userDataService.user?.userProgress.categoryProgress.find((obj) => {
    //   return obj.categoryId.toString() === this.questionManagerService.categoryId?.toString();
    // });
    // console.log(this.currentUserProgressToCategory)

    // this.currentLvl = this.currentUserProgressToCategory?.levelProgresses![this.idParam - 1]
 
    // console.log(this.currentLvl?.levelCompleted)
    // if (this.currentLvl?.levelCompleted) {
    //   let infoComplete = 'Ukończyłeś poprawie wszystkie lekcje z danego poziomu!'
    // }
    // else if (this.currentLvl?.levelCompleted == false) {
      this.saveProgress()
    // }
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