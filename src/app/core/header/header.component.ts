import { Component } from "@angular/core";
import { DataStorageService } from "../../shared/data-storage.service";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent{ 

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ){}

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