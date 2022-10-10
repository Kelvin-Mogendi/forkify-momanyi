// import { hypot } from 'core-js/core/number';
import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView.js';
import addrecipeView from './views/addrecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
// import bookmarksView from './views/bookmarksView.js';
// import bookmarksView from './views/bookmarksView.js';

///////////////////////////////////////
// console.log('dsds');

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //prettier-ignore

    //* render spinner{

    recipeView.renderSpinner();
    //update resultsview to mark selected search result
    resultsView._update(model.getSearchResultsData());
    bookmarksView._update(model.state.bookmark);
    //prettier-ignore
    //*Loading the recipe

    await model.loadRecipe(id);

    // const { recipe } = model.state;
    // controlServings();
    recipeView.render(model.state.recipe);
    // controlServings();

    //* RENDERING THE RECIPE
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //*get search results

    const query = searchView.getQuery();
    if (!query) return;

    //*  LOAD SEARCH RESULTS
    await model.loadSearchResults(query);
    // console.log(model.state.searchResults.results);

    //*render results
    resultsView.render(model.getSearchResultsData());

    //* Render initial pagination buttons
    paginationView.render(model.state.searchResults);
  } catch (error) {}
};
const controlPagination = function (goToPage) {
  console.log(goToPage);

  //* Render initial pagination buttons
  resultsView.render(model.getSearchResultsData(goToPage));
  paginationView.render(model.state.searchResults);
};

//?BOOKMARK CONTROLLER
/**
 *
 */
const bookmarkController = function () {
  //1). Adding and removing the bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.state.recipe.bookmarked;
    model.deleteBookmark(model.state.recipe.id);
  }

  //updating the resultview
  recipeView._update(model.state.recipe);

  //rendering the bookmark
  // console.log(model.state.bookmark);
  bookmarksView.render(model.state.bookmark);
};

//??second bookmark controller
const adddedbookmarkcontroller = function () {};
bookmarksView.render(model.state.bookmark);

//?SERVINGS CONROLLER
const controlServings = function (newServings) {
  //update the recipe servings in the state
  model.updateServings(newServings);
  // update the recipe view, it now contains the buttons that we want ot use to manipulate the data that we have
  // recipeView.render(model.state.recipe);
  recipeView._update(model.state.recipe);
};

//&CONTROL ADD RECIPES
/**
 *
 * @param {*} newRecipe
 */
const controllerAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addrecipeView.renderSpinner();
    // upload recipe data
    await model.uploadRecipe(newRecipe);
    // render recipe data
    recipeView.render(model.state.recipe);
    //successmessage
    console.log(model.state.recipe);
    addrecipeView.renderSuccessMessage();
    //rener bookmarks view
    bookmarksView.render(model.state.bookmark);
    //change ID in URl
    window.history.pushState(null, '', `${model.state.recipe.id}`);
    //close form window
    setTimeout(() => {
      addrecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC);
  } catch (err) {
    addrecipeView.renderError(err.message);
  }
};

//?CONTROLLER INITIALIZERS
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView._addHandlerUpdateServings(controlServings);
  recipeView._addHandlerBookmarks(bookmarkController);
  bookmarksView._addHanderlerRender(adddedbookmarkcontroller);
  addrecipeView._addHandlerFormData(controllerAddRecipe);

  searchView.addHandler(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
};

init();
