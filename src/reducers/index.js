import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import similarNames from './similarNamesReducer';
import translatedNames from './translatedNameReducer';

export default combineReducers({ form: formReducer, similarNames, translatedNames });
