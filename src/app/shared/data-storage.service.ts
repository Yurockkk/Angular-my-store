import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class DataStorageService{

    constructor(
        private httpClient: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService
    ){  }

    async storeRecipes(){
        let tk = '';
        await this.authService.getToken()
        .then(
            (token: string) => {
                tk = token;
            }
        )

        //simple way to send a request if you don't need to much customization like seting reportProgress ..etc.
        return this.httpClient.put(
            'https://angular-http-832ee.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(),
        {
            params: new HttpParams().set('auth',tk)
        });

        //customize your request using HttpRequest object, here we set reportProgress to true so that we can get progress on uploading / downloading file
        // const req = new HttpRequest(
        //     "PUT",
        //     "https://angular-http-832ee.firebaseio.com/recipes.json",
        //     this.recipeService.getRecipes(),
        //     {
        //         reportProgress: true,
        //         params: new HttpParams().set("auth",tk)
        //     }
        // );
        // return this.httpClient.request(req);
    }

    async fetchRecipes(){
        let tk = '';
        await this.authService.getToken()
        .then(
            (token: string) => {
                tk = token;
            }
        )
        this.httpClient.get<Recipe[]>(
            'https://angular-http-832ee.firebaseio.com/recipes.json',
            {
                params: new HttpParams().set('auth',tk)
            }).subscribe(
            (recipes) => {
                this.recipeService.loadRecipes(recipes);
            }
        );
    }
}