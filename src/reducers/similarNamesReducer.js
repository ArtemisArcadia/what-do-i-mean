export default (state = {}, action) => {
	switch (action.type) {
		case 'SIMILAR_NAMES':
			return { ...state, similarNames: action.payload };
		default:
			return state;
	}
};
