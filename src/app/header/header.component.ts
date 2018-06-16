import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Response } from "@angular/http";
import { Observable } from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent{ 

    constructor(private dataStorageService: DataStorageService){}

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
}