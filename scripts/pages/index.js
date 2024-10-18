/*********************************************************************************
*
* Index.js
*
/*********************************************************************************/

import { Recipe } from "../models/recipe.js";

// When the page is fully loaded, this event triggers and runs the init() function
document.addEventListener("DOMContentLoaded", function () {
  init(); // Start the initialization process
});

// Function to fetch the recipes data from the JSON file
async function getRecipes() {
  const url = "data/recipes.json"; // Path to the JSON file containing recipes

  try {
    // Fetch data from the URL
    const response = await fetch(url);

    // If there's an issue with the response, throw an error
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Convert the response to JSON format
    const data = await response.json();

    // Extract the 'recipes' array from the fetched data
    const { recipes } = data;

    // Log the recipes to the console (for debugging purposes)
    console.log(recipes);

    // Return the recipes array so it can be used later
    return recipes;
  } catch (error) {
    // If there is an error during the fetch, log it in the console
    console.error("Fetch operation failed:", error);
    return []; // Return an empty array in case of error
  }
}

// Function to display all the recipes on the page or in the console
const displayRecipes = (recipes) => {
  // Loop through each recipe in the 'recipes' array
  recipes.forEach((recipeData) => {
    // Create a new Recipe object (an instance of the Recipe class) for each recipe
    const recipe = new Recipe(recipeData);

    // Call the displayRecipe() method to show the recipe details (in the console for now)
    recipe.displayRecipe();
  });
};

// Main function to initialize the page when it loads
async function init() {
  // Wait for the recipes data to be fetched
  const recipes = await getRecipes();

  // If there are recipes in the data, call displayRecipes to show them
  if (recipes.length > 0) {
    displayRecipes(recipes); // Show the recipes
  }
}

// Start the process of fetching and displaying recipes when the page loads
init();
