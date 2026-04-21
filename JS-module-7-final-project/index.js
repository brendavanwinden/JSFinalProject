'use strict';
const prompt = require("prompt-sync")();

const cakeRecipes = require("./cake-recipes.json");

// Your functions here

// first assignment

const getAuthors = [];

cakeRecipes.forEach(({Author}) => {
  if(getAuthors.includes(Author)) {
    return;
  }
  getAuthors.push(Author);
})

console.log(getAuthors);

// second assignment
let { Name: Recipe } = cakeRecipes[0];

// Loop through all recipes and log their names
cakeRecipes.forEach(({ Name }) => {
   console.log(Name);
});

console.log(Recipe);

// third assignment filter

function getRecipesByAuthor(author) {
  const recipesByAuthor = cakeRecipes.filter(({ Author }) => Author === author);
  return recipesByAuthor.map(({ Name, Author }) => ({ Name, Author }));
}

console.log(getRecipesByAuthor('Barney Desmazery'));

// fourth assignment .filter & .some
/* Create a function that returns a list of recipes that contain a given ingredient. 
The function takes a list of recipes as input and an ingredient as a string. 
Use the .filter() method to filter the recipes and the .some() method 
to check if the ingredient list contains the given ingredient (input).  */ 

function getRecipesByIngredient(ingredient) {
  const recipesWithIngredient = cakeRecipes.filter(({ Ingredients }) => Ingredients.some(ing => ing.toLowerCase().includes(ingredient.toLowerCase())));
  return recipesWithIngredient.map(({ Name }) => ({ Name }));
};

console.log(getRecipesByIngredient('140g caster sugar'));

// fifth assignment .find & .includes
/* Create a function that takes a list of recipes and a name (string) as input. 
The function returns a single recipe that matches the given name. 
Use the .find() and .includes() method. */

function findRecipeByName(recipes, name) {
  return recipes.find(recipe => recipe.Name.includes(name));
}

console.log(".find() and .includes() methods:");
console.log(findRecipeByName(cakeRecipes, 'Christmas cupcakes'));

/* sixth assignment .reduce 
Finally, create a function that returns all ingredients of a given recipe list into a single array. You can use this function, for example, when you want to create a grocery list. Use the .reduce() method to flatten the recipe array. */

function groceryList(recipeName) {
  const recipe = findRecipeByName(cakeRecipes, recipeName);
  if (!recipe || !recipe.Ingredients) {
    return [];
  }
  return recipe.Ingredients.reduce((groceryList, ingredient) => {
    if (!groceryList.includes(ingredient)) {
      groceryList.push(ingredient);
    }
    return groceryList;
  }, []); 
}

console.log("Grocery list for Christmas cupcakes:");
console.log(groceryList('Christmas cupcakes'));

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(getAuthors);
      break;
    case 2:
      const author = prompt("Enter author name: ");
      console.log(getRecipesByAuthor(author));
      break;
    case 3:
      const ingredient = prompt("Enter ingredient: ");
      console.log(getRecipesByIngredient(ingredient));
      break;
    case 4:
      const recipeName = prompt("Enter recipe name: ");
      console.log(findRecipeByName(cakeRecipes, recipeName));
        break;
    case 5:
      const savedRecipeName = prompt("Enter recipe name to get ingredients: ");
      console.log(groceryList(savedRecipeName));
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);