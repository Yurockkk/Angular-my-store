import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form') shoppingEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedIngredient: Ingredient;
  //two different ways to get value from input element,
  //1. get input value by ViewChild
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        console.log(`index updated! index: ${index}`);
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredientByIndex(index);
        this.shoppingEditForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      }
    );
  }

  //2. get input value by passing it as a param
  onSubmitItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.shoppingEditForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.shoppingEditForm.reset();
    this.editMode = false;
  }

  onDelete(){
    if(this.editMode){
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.editMode = false;
      this.onClear();
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  

}
