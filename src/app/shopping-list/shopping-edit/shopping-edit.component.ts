import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  //two different ways to get value from input element,
  //1. get input value by ViewChild
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  //2. get input value by passing it as a param
  onAddItem(form: NgForm){
    const value = form.value;
    console.log(`onSubmitted, name: ${value.name}, amount: ${value.amount}`);
    const newIngredient = new Ingredient(value.name,value.amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
  

}
