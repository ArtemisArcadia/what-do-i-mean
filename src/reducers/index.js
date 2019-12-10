import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import names from './nameReducer';

export default combineReducers({ form: formReducer, names });
