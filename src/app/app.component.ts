import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Course_Project';
  loadedFeature = 'recipe';

  onNavigation(feature: string) {
    this.loadedFeature = feature;
  }
}
