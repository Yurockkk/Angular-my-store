import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature: string = "recipe";
  title = 'app';
  
  onNavigate(feature: string){
    this.loadedFeature = feature;
    console.log(`in onNavigate, this.currentPage: ${this.loadedFeature}`);

  }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBfXidsB-8ij6NqNuVVo9L4rW02K03OBQ4",
      authDomain: "angular-http-832ee.firebaseapp.com"
    });
  }
}
