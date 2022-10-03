import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionManagerRestService } from 'src/app/services/components-services/question-manager-rest.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  idParam?: any

  constructor(
    private route: ActivatedRoute,
    public questionManagerService: QuestionManagerRestService
  ) { }

  ngOnInit(): void {
    this.takeValueFromUrl()
  }

  takeValueFromUrl(){
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('code')
      this.questionManagerService.categoryId = this.idParam
      console.log(this.idParam);
    });
  }
  
  

}
