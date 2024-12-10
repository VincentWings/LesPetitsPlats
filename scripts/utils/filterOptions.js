/*********************************************************************************
 *
 * Filters Options
 *
/*********************************************************************************/

import {
	TagManager
} from "./tags.js";
import {
	filterRecipes
} from "./filters.js";

/**
 * @typedef {Object} FilterOptions
 * @property {Object} filters
 * @property {string[]} selectedIngredients
 * @property {string[]} selectedAppliances
 * @property {string[]} selectedUstensils
 * 
 * @typedef {Object} Recipes
 * @param {FilterOptions} filterOptions
 * 
 * @typedef {string} DropdownId
 * @param {string} dropdownId
 */

export function chooseOptions(recipes, filterOptions, dropdownId) {
	const choiceTables = filterOptions.filters;
	const tagManager = new TagManager(document.querySelector(".display-tag"), "dropdown", filterOptions, recipes);

	// Helper function to manage tagged state and icons
	const updateTaggedClass = (listItems, type) => {
		const allTags = document.querySelectorAll(".tag");
		listItems.forEach((item) => {
			const text = item.textContent.trim();
			let tagged = false;

			allTags.forEach((tag) => {
				if (tag.querySelector("p").textContent.trim() === text) {
					item.classList.add("tagged");
					tagged = true;

					// Add the icon if not already present
					if (!item.querySelector(".bi-x-circle-fill")) {
						const iconDiv = document.createElement("div");
						iconDiv.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
						iconDiv.classList.add("icon-container");
						item.appendChild(iconDiv);
					}
				}
			});

			if (!tagged) {
				item.classList.remove("tagged");

				// Remove the icon if the item is no longer tagged
				const existingIcon = item.querySelector(".icon-container");
				if (existingIcon) {
					existingIcon.remove();
				}
			}
		});
	};

	// General function to handle clicks on items
	const handleItemClick = (item, text, type) => {
		let list;
		if (type === "ingredient") {
			list = choiceTables.selectedIngredients;
		} else if (type === "appliance") {
			list = choiceTables.selectedAppliances;
		} else if (type === "ustensil") {
			list = choiceTables.selectedUstensils;
		}

		const index = list.lastIndexOf(text);

		if (index !== -1) {
			list.splice(index, 1);

			const allTags = document.querySelectorAll(".tag");
			allTags.forEach((tag) => {
				if (tag.querySelector("p").textContent === text) {
					tagManager.removeTag(tag, item, "dropdown", text, type);
				}
			});
		} else {
			tagManager.createTag(text, item, "dropdown", type);
			list.push(text);
		}

		filterRecipes(recipes, filterOptions);
	};

	// Switch for different dropdowns
	switch (dropdownId) {
		case "dropdown-ingredients": {
			const listIngredients = document.getElementById(dropdownId).querySelectorAll("li");

			// Update tagged state for ingredients
			const updateTaggedClassI = () => updateTaggedClass(listIngredients, "ingredient");

			listIngredients.forEach((item) => {
				const text = item.textContent.trim();
				updateTaggedClassI();

				item.addEventListener("click", () => {
					handleItemClick(item, text, "ingredient");
					updateTaggedClassI();
				});

				item.addEventListener("keydown", (event) => {
					if (event.key === "Enter") {
						handleItemClick(item, text, "ingredient");
						updateTaggedClassI();
					}
				});
			});
			break;
		}

		case "dropdown-appliances": {
			const listAppliances = document.getElementById(dropdownId).querySelectorAll("li");

			// Update tagged state for appliances
			const updateTaggedClassA = () => updateTaggedClass(listAppliances, "appliance");

			listAppliances.forEach((item) => {
				const text = item.textContent.trim();
				updateTaggedClassA();

				item.addEventListener("click", () => {
					handleItemClick(item, text, "appliance");
					updateTaggedClassA();
				});

				item.addEventListener("keydown", (event) => {
					if (event.key === "Enter") {
						handleItemClick(item, text, "appliance");
						updateTaggedClassA();
					}
				});
			});
			break;
		}

		case "dropdown-utils": {
			const listUstensils = document.getElementById(dropdownId).querySelectorAll("li");

			// Update tagged state for utensils
			const updateTaggedClassU = () => updateTaggedClass(listUstensils, "ustensil");

			listUstensils.forEach((item) => {
				const text = item.textContent.trim();
				updateTaggedClassU();

				item.addEventListener("click", () => {
					handleItemClick(item, text, "ustensil");
					updateTaggedClassU();
				});

				item.addEventListener("keydown", (event) => {
					if (event.key === "Enter") {
						handleItemClick(item, text, "ustensil");
						updateTaggedClassU();
					}
				});
			});
			break;
		}

		default: {
			console.log("Cette liste d'éléments n'est pas prise en compte");
			break;
		}
	}
}