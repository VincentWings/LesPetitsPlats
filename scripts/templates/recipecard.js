/*********************************************************************************
*
* Recipe Card
*
/*********************************************************************************/

// Class representing a Recipe Card
class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe; // Store the recipe object
    }

    // Method to create an HTML list of ingredients
    createIngredientsList() {
        // Check if ingredients exist and are in the correct format
        if (!this.recipe._ingredients || !Array.isArray(this.recipe._ingredients)) {
            console.error('Problem with the recipe ingredients', this.recipe); // Log an error if structure is incorrect
            return ''; // Return an empty string if ingredients are missing or malformed
        }

        // Create an unordered list element for the ingredients
        const ingredientsList = document.createElement('ul'); 
        ingredientsList.classList.add('list-group', 'p-0', 'm-0'); // Add Bootstrap classes for styling

        // Loop through each ingredient in the recipe's ingredients array
        this.recipe._ingredients.forEach(ingredient => {
            // Create a list item element for each ingredient
            const listItem = document.createElement('li');
            listItem.classList.add('d-flex', 'justify-content-between'); // Add Bootstrap flex classes

            // Create a span element for the ingredient name
            const ingredientName = document.createElement('span');
            ingredientName.textContent = ingredient.ingredient; // Set the text content to the ingredient name
            ingredientName.classList.add('recipe-card__ingredient'); // Add class for ingredient name styling

            // Create a span element for the ingredient quantity and unit
            const ingredientQuantity = document.createElement('span');
            ingredientQuantity.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''}`; // Format quantity and unit
            ingredientQuantity.classList.add('recipe-card__ingredient-quantity'); // Add class for quantity styling

            // Append ingredient name and quantity to the list item
            listItem.appendChild(ingredientName);
            listItem.appendChild(ingredientQuantity);
            // Add the list item to the ingredients list
            ingredientsList.appendChild(listItem);
        });

        return ingredientsList; // Return the completed list of ingredients
    }

    // Method to create the full recipe card
    createRecipeCard() {
        // Create a Bootstrap card element
        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'd-flex', 'flex-column', 'shadow', 'rounded-4', 'overflow-hidden'); // Add flex and styling classes

        // Create an image element for the recipe
        const img = document.createElement('img');
        img.src = `img/recettes/${this.recipe._image || 'placeholder.png'}`; // Set the image source or fallback image
        img.classList.add('card-img-top'); // Add class for image styling
        img.alt = this.recipe.name || 'Recipe image'; // Set alt text for accessibility

        // Create a card body element to hold the main content
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'flex-grow-1', 'mt-4', 'p-4'); // Add flex-grow to fill available space

        // Create and set the title of the recipe
        const recipeTitle = document.createElement('h2');
        recipeTitle.classList.add('card-title', 'mb-5'); // Add styling classes
        recipeTitle.textContent = this.recipe._name || 'Recipe Name'; // Set recipe title or fallback text

        // Create a title for the recipe description
        const descriptionTitle = document.createElement('h3');
        descriptionTitle.classList.add('mb-4'); // Add margin-bottom
        descriptionTitle.textContent = 'Recipe';

        // Create a paragraph element for the recipe description
        const description = document.createElement('p');
        description.classList.add('card-text', 'mb-5'); // Add styling classes
        description.textContent = this.recipe._description || 'No description available.'; // Set description or fallback text

        // Create a span element for the recipe duration
        const duration = document.createElement('span');
        duration.classList.add('card-text', 'text-muted', 'badge', 'rounded-pill', 'bg-primary', 'recipe-card__duration'); // Add styling classes

        // Set the duration text if the recipe includes a time property
        if (this.recipe._time) {
            duration.textContent = `${this.recipe._time} min`; // Display the recipe time
        } else {
            duration.style.display = 'none'; // Hide duration if no time is available
        }

        // Create a title for the ingredients section
        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.classList.add('mb-4'); // Add margin-bottom
        ingredientsTitle.textContent = 'Ingredients';

        // Create the ingredients list using the helper method
        const ingredientsList = this.createIngredientsList(); 

        // Add all elements to the card body in a specific order
        cardBody.appendChild(recipeTitle);
        cardBody.appendChild(descriptionTitle);
        cardBody.appendChild(description);
        cardBody.appendChild(ingredientsTitle);
        cardBody.appendChild(ingredientsList);

        // Add the duration, image, and body to the main card element
        card.appendChild(duration);
        card.appendChild(img);
        card.appendChild(cardBody);

        // Create a wrapper div for column styling and add the card to it
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('col-12', 'col-md-4', 'mb-5', 'gx-5'); // Add Bootstrap classes for column layout
        columnDiv.appendChild(card); // Insert the card into the column div

        return columnDiv; // Return the completed column div containing the recipe card
    }
}

// Using the RecipeCard class
const container = document.querySelector('.container .row'); // Select the row element inside the container

// Assuming you have a list of recipe objects (from a JSON or database)
const recipes = [ /* List of recipe objects */ ];

recipes.forEach(recipeData => {
    const recipeCard = new RecipeCard(recipeData); // Create a new RecipeCard instance for each recipe
    container.appendChild(recipeCard.createRecipeCard()); // Append each recipe card to the container
});

export {
    RecipeCard // Export the RecipeCard class for use in other files
};