export default (state = {}, action) => {
	switch (action.type) {
		case "ERROR":
			return { ...state, error: action.payload };
		case "CLEAR_ERRORS":
			return { ...state, error: undefined };
		default:
			return state;
	}
};
