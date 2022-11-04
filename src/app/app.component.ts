import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QuizAppAngular';

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.navigationChangeListeinig()
  }

  valueSpeed = 0
  display?: any
  time: number = 0
  interval: any
  loading: boolean = false
  private subscribe: Subscription | null = null
  private navigationChangeListeinig() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display=this.time
    }, 1000);
    this.subscribe = this.router.events.subscribe(event => {
      // console.log(event)
      

      

      switch (true) {
        case event instanceof NavigationStart:
          // clearInterval(this.interval)
          // this.display = 0
          // this.interval = 0
          this.interval = setInterval(() => {
            if (this.time === 0) {
              this.time++;
            } else {
              this.time++;
            }
            this.display=this.time
            // console.log(this.display)
            this.valueSpeed = this.valueSpeed + 1
            // console.log(this.valueSpeed)
            if (this.valueSpeed! > 15) {
              this.loading = true
            }
            else{
              this.loading = false
            }
          }, 100);
          
          
          
          break;
        case event instanceof NavigationEnd:
          this.loading = false
          clearInterval(this.interval)
          this.valueSpeed = 0
          
          // setTimeout(() => this.loading = false,300)
          break;
        case event instanceof NavigationCancel:
          // setTimeout(() => this.loading = false,300)
          this.loading = false
          break;
        case event instanceof NavigationError:
          // setTimeout(() => this.loading = false,300)
          this.loading = false
          break;
        default:
          break;
      }
    })
  }
}
