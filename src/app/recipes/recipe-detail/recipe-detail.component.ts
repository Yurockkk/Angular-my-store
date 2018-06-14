import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = parseInt(params['id']);
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList(){
    console.log("in userAddIngredients");
    // for(let ingredient of this.recipe.ingredients){
    //   this.shoppingListService.addIngredient(ingredient);
    // }
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onDeleteRecipe(){
    console.log('in onDeleteRecipe');
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'],{relativeTo: this.route});
  }

}
