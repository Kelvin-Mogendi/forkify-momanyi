import { async } from 'regenerator-runtime';
import { getJSON, sendJSON } from './helpers';
import { API_URL, RES_PER_PAGE, KEY } from './config';
// import { entries } from 'core-js/core/array';
// import { search } from 'core-js/fn/symbol';

export const state = {
  recipe: {},
  //prettier-ignore
  searchResults: { results: [],  query: '',  resultsPerPage: RES_PER_PAGE,  page: 1, },
  bookmark: [],
};

const CreateRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    // description: recipe.description,
    // unit: recipe.unit,
    // quantity: recipe.quantity,
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${KEY}`);
    state.recipe = CreateRecipeObject(data);
    // sole.log(promiseValue);
    // console.log(data);

    //this
    if (state.bookmark.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    // console.log(data);
  } catch (err) {
    throw err;
    alert(`${err} this is so wrong man  `);
  }
  //   console.log(state.recipe);
};

//* LOAD SEARCH RESULTS

export const loadSearchResults = async function (query) {
  try {
    state.searchResults.query = query;
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    // console.log(data.data.recipes);

    state.searchResults.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (error) {
    alert(error);
    throw error;
  }
};
// loadSearchResults('pasta');

export const getSearchResultsData = function (page = state.searchResults.page) {
  state.searchResults.page = page;
  const start = (page - 1) * state.searchResults.resultsPerPage;
  const end = page * state.searchResults.resultsPerPage;
  return state.searchResults.results.slice(start, end);
};

//prettier-ignore
//??this method will reach into the state(RECIPE INGREDIENTS and then update)Now what this function will do is to reach into the state, and in particular into the recipe ingredients, and then change the quantity in each ingredient. So we have state.recipe, and then we have that ingredients array, ingredients. And so again, in each ingredient, we now want to change the quantity property.
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
ing.quantity =(ing.quantity * newServings) / state.recipe.servings;

});;
// console.log(state.recipe.ingredients);
  state.recipe.servings = newServings;
  // console.log(state.recipe.servings);
};
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

export const addBookMark = function (recipe) {
  //add bookmark
  state.bookmark.push(recipe);
  // mark current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const localbookmarks = localStorage.getItem('bookmarks');
  if (localbookmarks) state.bookmark = JSON.parse(localbookmarks);
  // console.log(localbookmarks);
  // addBookMark();
};
init();
const clearBookmarks = function () {
  localStorage.clear(state.bookmark);
};
// clearBookmarks();

//!UPLOADING RECIPE CODE

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(ing => ing.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'wrong ingredient format, please re-enter the ingredient using the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data2 = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = CreateRecipeObject(data2);
    console.log(data2);
    addBookMark(state.recipe);
    // console.log(recipe);
    console.log(1);
  } catch (err) {
    throw err;
  }
};
