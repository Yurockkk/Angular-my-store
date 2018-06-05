import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature: string = "recipe";
  title = 'app';
  onNavigate(feature: string){
    this.loadedFeature = feature;
    console.log(`in onNavigate, this.currentPage: ${this.loadedFeature}`);

  }
}
