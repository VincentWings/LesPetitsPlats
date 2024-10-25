/*********************************************************************************
*
* Filters
*
/*********************************************************************************/

import { Recipe } from "../models/recipe.js"; // Importing the Recipe class from the models directory
import { RecipeCard } from '../templates/recipecard.js'; // Importing the RecipeCard class

/*
import {
    displayRecipes,
    displayNumberTotalRecipes
} from '../pages/Index.js';
import {
    displayTag
} from '../vues/TagVue.js';
import {
    filtersQueries,
    getRecipesElements
} from './FiltersQueries.js';
import {
    manageTagsInput
} from './TagsInput.js';

*/

const manageFilters = (allRecipes, filteredRecipes) => {
    // filters by tags
    const filterIngredientsButton = document.getElementById('filter-ingredients');
    const filterAppliancesButton = document.getElementById('filter-appliances');
    const filterUstensilsButton = document.getElementById('filter-ustensils');
    const filterIngredientsList = document.getElementById('ingredients-list');
    const filterAppliancesList = document.getElementById('appliances-list');
    const filterUstensilsList = document.getElementById('ustensils-list');
    const filterIngredientsDatas = getRecipesElements(
        filteredRecipes,
        'ingredients'
    );
    const filterAppliancesDatas = getRecipesElements(
        filteredRecipes,
        'appliances'
    );
    const filterUstensilsDatas = getRecipesElements(filteredRecipes, 'ustensils');
    const filters = [{
            name: 'ingredients',
            button: filterIngredientsButton,
            list: filterIngredientsList,
            datas: filterIngredientsDatas,
        },
        {
            name: 'appliances',
            button: filterAppliancesButton,
            list: filterAppliancesList,
            datas: filterAppliancesDatas,
        },
        {
            name: 'ustensils',
            button: filterUstensilsButton,
            list: filterUstensilsList,
            datas: filterUstensilsDatas,
        },
    ];
    const allListButtons = document.querySelectorAll('.filter__button');
    const allListDOM = document.querySelectorAll('.filter__list-container');
    // tags (selected filters)
    const tagsContainer = document.getElementById('tags');
    const tagsList = document.querySelector('.tags__list');
    let tagsListElement = [];
    let numberTags = 0;
    let filteredRecipesByTag = filteredRecipes;

    /**
     * Manage datas to display into filters
     * when the user select a tag
     * @param {Array} recipesList
     */
    const updateFiltersDatas = (recipesList) => {
        const newFiltersDatas = [
            getRecipesElements(recipesList, 'ingredients'),
            getRecipesElements(recipesList, 'appliances'),
            getRecipesElements(recipesList, 'ustensils'),
        ];

        filters.forEach((filter, index) => {
            filter.datas = newFiltersDatas[index];
            manageFilterList(filter);
        });
    };

    /**
     * Update recipes view, number of total recipes found and filters datas
     * @param {Array} recipesList
     */
    const updateDatas = (recipesList) => {
        displayRecipes(recipesList);
        displayNumberTotalRecipes(recipesList);
        updateFiltersDatas(recipesList);
    };

    /**
     * manage open/close filter list and class for css animations
     * Close opened filter when another is open
     * @param {object} filter
     */
    const toggleFilter = (filter) => {
        const ariaExpandedAttribute = filter.button.getAttribute('aria-expanded');
        if (ariaExpandedAttribute === 'false') {
            closeAllFilters(allListButtons, allListDOM);
            // open selected filter
            filter.list.classList.add('filter__list-container--open');
            filter.button.classList.add('filter--open');
            filter.button.setAttribute('aria-expanded', true);
            manageTagsInput(filter, manageFilterList);
            manageFilterList(filter);
        } else {
            // close selected filter
            filter.list.classList.remove('filter__list-container--open');
            filter.list.classList.add('filter__list-container--close');
            filter.button.classList.remove('filter--open');
            filter.button.setAttribute('aria-expanded', false);
        }
    };

    /**
     * At open, all the datas of filtered recipes are display
     * @param {object} filter
     */
    const manageFilterList = (filter) => {
        const filterList = document.getElementById(`${filter.name}-list-items`);
        filterList.innerHTML = '';
        filter.datas.forEach((tag) => {
            const listElement = document.createElement('li');
            const filterButton = document.createElement('button');
            filterButton.setAttribute('role', 'option');
            filterButton.setAttribute('id', tag.split(' ').join('')); // remove space into filter name
            filterButton.textContent = tag;

            listElement.appendChild(filterButton);
            filterList.appendChild(listElement);

            filterButton.addEventListener('click', () => {
                addTag(filter, tag);
            });
        });
    };

    /**
     * Add tag selected by user (avoid duplicate tags)
     * @param {object} filter
     * @param {string} tagName
     */
    const addTag = (filter, tagName) => {
        if (tagsContainer.className === 'tags') {
            tagsContainer.className = 'tags--activate';
        }
        let duplicateTagsCount = 0;
        if (tagsListElement.length > 0) {
            for (let i = 0; i < tagsListElement.length; i++) {
                if (tagsListElement[i].tagName === tagName) {
                    duplicateTagsCount++;
                }
            }
        }
        if (duplicateTagsCount === 0) {
            numberTags += 1;
            const filterName =
                filter.name === 'appliances' ? 'appliance' : filter.name;
            displayTag(tagName, tagsList, removeTag);
            tagsListElement.push({
                tagName: tagName,
                filterName: filterName,
            });
            filteredRecipesByTag = filtersQueries(filteredRecipesByTag, tagName, [
                filterName,
            ]);
            updateDatas(filteredRecipesByTag);
        }
        toggleFilter(filter);
    };

    /**
     * Remove tag when user click on tag cross
     * update filterRecipesByTag only with remaining tags
     * @param {string} tagName
     */
    const removeTag = (tagName) => {
        numberTags -= 1;
        const tagNameSelectedDOM = document.getElementById(
            `${tagName.split(' ').join('')}-selected`
        );
        tagNameSelectedDOM.remove();
        tagsListElement = tagsListElement.filter(
            (item) => item.tagName !== tagName
        );
        filteredRecipesByTag = filteredRecipes;
        tagsListElement.forEach((tag) => {
            filteredRecipesByTag = filtersQueries(filteredRecipesByTag, tag.tagName, [
                tag.filterName,
            ]);
        });
        updateDatas(filteredRecipesByTag);
        if (numberTags === 0) {
            tagsContainer.className = 'tags';
            filteredRecipesByTag = filteredRecipes;
            updateDatas(filteredRecipes);
        }
    };

    /**
     * Remove all tags when user search recipe from principal search bar
     */
    const removeAllTags = () => {
        if (tagsListElement.length > 0) {
            tagsListElement.forEach((tag) => {
                const tagNameSelectedDOM = document.getElementById(
                    `${tag.tagName.split(' ').join('')}-selected`
                );
                tagNameSelectedDOM.remove();
            });
            tagsContainer.className = 'tags';
            // empty table
            tagsListElement.splice(0, tagsListElement.length);
            updateDatas(allRecipes);
            filteredRecipesByTag = filteredRecipes;
        }
    };

    // execute when call into index.js
    filters.forEach((filter) => {
        filter.button.addEventListener('click', () => {
            toggleFilter(filter);
        });
    });
    // clear tags when user make a general search into hero search bar
    const filterInput = document.getElementById('hero-search');
    const filterEmpty = document.getElementById(`empty-filter-hero-search`);
    filterInput.addEventListener('input', (event) => {
        let inputText = event.target.value;
        if (inputText.length === 1) {
            closeAllFilters(allListButtons, allListDOM);
            removeAllTags();
        }
    });
    // empty tag on search input cross click
    filterEmpty.addEventListener('click', () => {
        closeAllFilters(allListButtons, allListDOM);
        removeAllTags();
    });
};

const closeAllFilters = (filtersButtons, filtersListDOM) => {
    filtersButtons.forEach((button) => {
        button.classList.remove('filter--open');
        button.setAttribute('aria-expanded', false);
    });
    filtersListDOM.forEach((list) => {
        list.classList.remove('filter__list-container--open');
        list.classList.remove('filter__list-container--close');
    });
};

export {
    manageFilters
};
