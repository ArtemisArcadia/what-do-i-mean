export default (state = {}, action) => {
	switch (action.type) {
		case "FETCH_NAMES":
			return { ...state, fetchedNames: action.payload };
		default:
			return state;
	}
};
