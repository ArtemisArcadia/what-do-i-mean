import namesdb from '../apis/namesdb';

export const fetchName = async (dispatch, getState) => {
	const response = await (10 * 2);
	console.log(response);
	return response;
};

export const nameSubmitted = formValues => {
	return async dispatch => {
		const passedInName = formValues.username;

		const response = await namesdb.post('/names', { ...formValues, passedInName });
		dispatch({ type: 'NAME_SUBMITTED', payload: response.data });
	};
};

//make an api request to behindthenames api and do something with the data
//to do: sign up to the api / set up axios configuration / make api request
