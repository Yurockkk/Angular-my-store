import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../../shared/data-storage.service";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent implements OnInit{

    authState: Observable<fromAuth.State>;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ){}

    ngOnInit(){
        this.authState = this.store.select('auth');
    }

    onSaveData(){
        console.log('in on save data');
        this.dataStorageService.storeRecipes().then(
            (obs: Observable<Response>) => {
                obs.subscribe(
                    (response: Response) => {
                        console.log(response);
                        
                    }
                )
            }
        )
    }

    onFetchData(){
        console.log('in on fetch data');
        this.dataStorageService.fetchRecipes();
    }

    onLogout(){
        this.authService.logout();
    }
}