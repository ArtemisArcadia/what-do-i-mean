import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchNames } from '../actions/index';

// CommonJS
const Swal = require('sweetalert2');

class NameInput extends React.Component {
	onSubmit = async formValues => {
		await this.props
			.fetchNames(formValues)
			.then(() => {
				this.renderOutput();
			})
			.catch(response => {
				this.renderError(response);
			});
		return this.errors;
	};
	renderError = error => {
		if (error) {
			// console.log(error);
			// alert(JSON.stringify(error.message) + ' An error occured when fetching the name; perhaps the API is down');
			Swal.fire({
				title: 'Error!',
				text: 'An error occured when making the network request: API offline',
				icon: 'error',
				confirmButtonText: 'Continue',
			});
		} else {
			return;
		}
	};

	renderOutput = () => {
		if (this.props.translatedName.translatedNames) {
			console.log(this.props.translatedName.translatedNames[0]);
			return (
				<div className="ui list">
					<div className="item">
						<div className="header">Name:</div> {this.props.translatedName.translatedNames[0].name}
					</div>
					<div className="item">
						<div className="header">Gender:</div>
						{this.props.translatedName.translatedNames[0].gender}
					</div>
					<div className="item">
						{' '}
						<div className="header">Origin: </div>
						{this.props.translatedName.translatedNames[0].usages[0].usage_full}
					</div>
				</div>
			);
		}
		return (
			<div className="ui content">
				<div className=" ui header" style={{ paddingTop: '10px' }}>
					Input name for translation...
					{this.renderError}
				</div>
			</div>
		);
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
			<div style={{ paddingTop: '20px' }}>
				<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form" autoComplete="off">
					<Field name="username" component={this.renderInput} />

					<button className="ui button primary">What Is IT?</button>
				</form>
				<div className="ui content">{this.renderOutput()}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { translatedName: state.translatedNames };
};
const validate = formValues => {
	const errors = {};
	return errors;
};

const formWrapped = reduxForm({ form: 'nameInput', validate })(NameInput);

export default connect(mapStateToProps, { fetchNames })(formWrapped);

//have do: add name changing and update to state of current name / probably,
// onsubmit do action with the submitted term and use that :to do (make an api request)
//refactor renderOutput to render a list, map over the array and render a list
//add a theme some styling
