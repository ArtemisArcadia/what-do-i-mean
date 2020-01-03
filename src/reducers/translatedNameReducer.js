export default (state = {}, action) => {
	switch (action.type) {
		case "NAME_TRANSLATED":
			return { ...state, translatedNames: action.payload };
		default:
			return state;
	}
};
