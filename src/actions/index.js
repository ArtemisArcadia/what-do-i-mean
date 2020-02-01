import axios from "axios";
import {
	FETCH_NAMES,
	SIMILAR_NAMES,
	ERROR,
	CLEAR_ERRORS,
	CLEAR_NAMES
} from "./types";

export const fetchNames = formValues => {
	return async dispatch => {
		dispatch({ type: CLEAR_NAMES });
		const name = formValues.username;
		const response = await axios.get(
			`https://www.behindthename.com/api/lookup.json?name=${name}&key=mo245439977`
		);

		if (response.data.error_code) {
			console.log(response.data);
			dispatch({ type: ERROR, payload: response.data });

			return;
		}
		console.log("response: ", response.data);
		dispatch({ type: FETCH_NAMES, payload: response.data });
	};
};

export const fetchSimilarNames = (formValues, usageKey) => {
	return async dispatch => {
		const name = formValues.username;
		const usagekey = usageKey;
		const response = await axios.get(
			`https://www.behindthename.com/api/related.json?name=${name}&usage=${usagekey}&key=mo245439977`
		);
		//	console.log(response.data);
		if (response.data.error_code) {
			console.log(response.data);
			dispatch({ type: ERROR, payload: response.data });
			return;
		}
		dispatch({ type: SIMILAR_NAMES, payload: response.data });
	};
};
//for extra functionality later
export const clearErrors = () => {
	return { type: CLEAR_ERRORS };
};

//make api request to mediawiki, wikipedia api, take that response break it down and load information from one of the articles
//could embed a url from the respnse in an html tag or directly rip the information from the page and add that to the app
