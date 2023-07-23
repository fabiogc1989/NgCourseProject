import { Component } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  public recipes: Recipe[] = [
    new Recipe("Recipe test", "description test", "https://www.inspiredtaste.net/wp-content/uploads/2023/01/Easy-Bean-Salad-Recipe-Video.jpg"),
    new Recipe("Recipe test", "description test", "https://www.inspiredtaste.net/wp-content/uploads/2023/01/Easy-Bean-Salad-Recipe-Video.jpg")
  ];

  constructor() { }
}
