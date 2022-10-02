import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  idParam?: string|null

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.takeValueFromUrl()
  }

  takeValueFromUrl(){
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('code')
      console.log(this.idParam);
    });
  }
  
  

}
