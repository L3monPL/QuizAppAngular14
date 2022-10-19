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

  loading: boolean = false
  private subscribe: Subscription | null = null
  private navigationChangeListeinig() {
    this.subscribe = this.router.events.subscribe(event => {
      console.log(event)
      switch (true) {
        case event instanceof NavigationStart:
          this.loading = true
          break;
        case event instanceof NavigationEnd:
          this.loading = false
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
