export default (state = {}, action) => {
	switch (action.type) {
		case 'NAME_SUBMITTED':
			return { ...state, names: action.payload };
		default:
			return state;
	}
};
