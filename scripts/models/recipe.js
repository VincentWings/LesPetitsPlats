/*********************************************************************************
*
* Recipe.js
*
/*********************************************************************************/

class Recipe {
    /**
     * Constructor to initialize the Recipe object with data
     * 
     * @param {Object} data - The data object containing recipe information
     */
    constructor(data) {
        this._id = data.id; // Unique identifier for the recipe
        this._image = data.image; // Path to the recipe image
        this._name = data.name; // Name of the recipe
        this._servings = data.servings; // Number of servings this recipe provides
        this._ingredients = data.ingredients; // Array of ingredients needed for the recipe
        this._time = data.time; // Preparation time in minutes
        this._description = data.description; // Description or steps to make the recipe
        this._appliance = data.appliance; // Required kitchen appliance for the recipe
        this._ustensils = data.ustensils; // Array of utensils needed
    }

    /**
     * Method to display ingredients as a formatted string
     * 
     * @returns {string} - Returns a formatted string with all ingredients, quantities, and units
     */
    displayIngredients() {
        // Maps through each ingredient and formats it as "ingredient: quantity unit"
        return this._ingredients.map(ingredient => {
            const quantity = ingredient.quantity ? `: ${ingredient.quantity}` : ''; // Adds quantity if it exists
            const unit = ingredient.unit ? ` ${ingredient.unit}` : ''; // Adds unit if it exists
            return `${ingredient.ingredient}${quantity}${unit}`; // Returns the formatted ingredient string
        }).join(', '); // Joins all ingredients with a comma and space
    }

    /**
     * Method to display utensils as a formatted string
     * 
     * @returns {string} - Returns a comma-separated string of utensils
     */
    displayUstensils() {
        return this._ustensils.join(', '); // Joins all utensils with a comma and space
    }

    /**
     * Method to log all recipe information to the console
     * 
     * Logs a detailed overview of the recipe including name, ID, image, servings,
     * ingredients, preparation time, description, appliance, and utensils.
     */
    displayRecipe() {
        console.log(`
            Name: ${this._name} // Name of the recipe
            ID: ${this._id} // Unique identifier for this recipe
            Image: ${this._image} // Path or URL to the recipe image
            Servings: ${this._servings} // Number of people this recipe serves
            Ingredients: ${this.displayIngredients()} // List of ingredients formatted with quantities and units
            Preparation Time: ${this._time} minutes // Total time needed to prepare the recipe
            Description: ${this._description} // Instructions or description for making the recipe
            Appliance: ${this._appliance} // Kitchen appliance needed
            Utensils: ${this.displayUstensils()} // List of utensils needed, formatted as a string
        `);
    }
}

// Export the Recipe class so it can be imported and used in other files
export { Recipe };