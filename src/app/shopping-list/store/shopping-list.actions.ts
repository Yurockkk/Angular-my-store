import {Action} from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredinet implements Action{

    constructor(public payload){}
    
    readonly type = ADD_INGREDIENT;
}

export type ShoppingListActions = AddIngredinet;

