import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  //two different ways to get value from input element,
  //1. get input value by ViewChild
  @ViewChild('nameInput') nameInput: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  //2. get input value by passing it as a param
  onAddItem(amountInput: HTMLInputElement){
    console.log(`onSubmitted, name: ${this.nameInput.nativeElement.value}, amount: ${amountInput.value}`);
    const ingName = this.nameInput.nativeElement.value;
    const ingAmount = Number(amountInput.value);
    const newIngredient = new Ingredient(ingName,ingAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }

}
