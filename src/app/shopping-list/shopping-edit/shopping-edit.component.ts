import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form') shoppingEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;
  //two different ways to get value from input element,
  //1. get input value by ViewChild
  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if(data.editedIngredientIndex > -1){
          this.editedIngredient = data.editedIngredient;
          this.editMode = true;
          this.shoppingEditForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          })
        }else{
          this.editMode = false;
        }
      }
    )
  }

  //2. get input value by passing it as a param
  onSubmitItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredinet(newIngredient));
    }
    form.reset();
    this.editMode = false;
  }

  onClear(){
    this.shoppingEditForm.reset();
    this.editMode = false;
  }

  onDelete(){
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
      this.editMode = false;
      this.onClear();
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  

}
