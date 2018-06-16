import { Injectable } from "@angular/core";
import {Http, Response} from '@angular/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
@Injectable()
export class DataStorageService{

    constructor(
        private http: Http, 
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
        return this.http.put('https://angular-http-832ee.firebaseio.com/recipes.json?auth=' + tk,this.recipeService.getRecipes());
    }

    async fetchRecipes(){
        let tk = '';
        await this.authService.getToken()
        .then(
            (token: string) => {
                tk = token;
            }
        )
        this.http.get('https://angular-http-832ee.firebaseio.com/recipes.json?auth='+tk).subscribe(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                this.recipeService.loadRecipes(recipes);
            }
        );
    }
}