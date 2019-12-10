import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { nameSubmitted } from '../actions/index';

class NameInput extends React.Component {
	onSubmit = formValues => {
		this.props.nameSubmitted(formValues);

		console.log('you submitted the name' + this.props);
	};

	renderInput = ({ input, meta }) => {
		return (
			<div className="field">
				{' '}
				<input {...input} />
			</div>
		);
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
				<Field name="username" component={this.renderInput} />

				<button className="ui button primary">What Is IT?</button>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return { name: state.names };
};
const validate = formValues => {
	const errors = {};
	return errors;
};

const formWrapped = reduxForm({ form: 'nameInput', validate })(NameInput);

export default connect(mapStateToProps, { nameSubmitted })(formWrapped);

//have do: add name changing and update to state of current name / probably,
// onsubmit do action with the submitted term and use that :to do (make an api request)
