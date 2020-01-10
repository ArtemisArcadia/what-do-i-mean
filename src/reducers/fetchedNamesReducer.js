import { FETCH_NAMES, CLEAR_NAMES } from "actions/types";

const INITIAL_STATE = { fetchedNames: false };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_NAMES:
			return { ...state, fetchedNames: action.payload };
		case CLEAR_NAMES:
			return INITIAL_STATE;
		default:
			return state;
	}
};
