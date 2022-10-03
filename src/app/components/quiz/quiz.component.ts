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
  }

  checkUrl(){
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('code')
      this.questionManagerService.level = this.idParam
      console.log(this.idParam);
    });
  }

}
