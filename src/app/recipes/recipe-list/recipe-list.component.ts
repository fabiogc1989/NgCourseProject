import { Component, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Recipe test',
      'description test',
      'https://www.inspiredtaste.net/wp-content/uploads/2023/01/Easy-Bean-Salad-Recipe-Video.jpg'
    ),
    new Recipe(
      'Recipe 2 test',
      'description 2 test',
      'https://www.inspiredtaste.net/wp-content/uploads/2023/01/Easy-Bean-Salad-Recipe-Video.jpg'
    ),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
