import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import names from './nameReducer';
import translatedNames from './translatedNameReducer';

export default combineReducers({ form: formReducer, names, translatedNames });
