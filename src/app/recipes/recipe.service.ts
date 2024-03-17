import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe test',
      'description test',
      'https://www.inspiredtaste.net/wp-content/uploads/2023/01/Easy-Bean-Salad-Recipe-Video.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Chips', 20)]
    ),
    new Recipe(
      'Recipe 2 test',
      'description 2 test',
      'https://www.inspiredtaste.net/wp-content/uploads/2023/01/Easy-Bean-Salad-Recipe-Video.jpg',
      [new Ingredient('Tomatoes', 6)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
