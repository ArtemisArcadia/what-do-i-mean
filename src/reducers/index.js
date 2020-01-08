import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import similarNames from "./similarNamesReducer";
import fetchedNames from "./fetchedNamesReducer";
import errors from "./errorReducer";

export default combineReducers({
	form: formReducer,
	similarNames,
	fetchedNames,
	errors
});
