import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    
    recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            "A Test Recipe",
            "This is simply a test",
            "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fck%2F11%2F04%2Ffettuccine-olive-oil-ck-x.jpg%3Fitok%3DN9u99OOY&w=800&q=85",
            [
                new Ingredient('meat',1),
                new Ingredient('French Fries',20)
            ]
        ),
        new Recipe(
            "Big Fat Burger",
            "This is simply a test",
            "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fck%2F11%2F04%2Ffettuccine-olive-oil-ck-x.jpg%3Fitok%3DN9u99OOY&w=800&q=85",
            [
                new Ingredient('Buns',2),
                new Ingredient('meat',1)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService){

    }

    getRecipes(){
        //return a copy of recipes list
        return this.recipes.slice();
    }

    getRecipe(idex: number){
        return this.recipes[idex];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}