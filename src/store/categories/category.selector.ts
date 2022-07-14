import { createSelector } from "reselect"; // createSelector is a memoization for selector

import { RootState } from "../store";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories; //categories is an array

export const selectCategories = createSelector(
  // memoize here
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories //The only time when this will run is if this categoriesSlice object that we get back from this selector is different.
);

export const selectCategoriesMap = createSelector(
  // memoize again
  [selectCategories],
  (categories): CategoryMap =>
    // as long as the categories array does not change, do not rerun this method.
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items; // add items to the title in the acc object
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
