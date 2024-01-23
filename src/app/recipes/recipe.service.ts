import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
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

  getRecipes() {
    return this.recipes.slice();
  }
}
