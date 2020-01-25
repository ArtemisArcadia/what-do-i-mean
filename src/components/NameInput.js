import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchNames, fetchSimilarNames, clearErrors } from "../actions/index";

import Swal from "sweetalert2";

class NameInput extends React.Component {
	onSubmit = async formValues => {
		console.log(formValues);
		await this.props
			.fetchNames(formValues)
			.then(() => {
				this.renderOutput();
				// const usageKey = this.props.translatedName.usages[0].usage_code;
				// this.fetchSimilarNames(formValues, usageKey);
			})
			.catch(response => {
				this.renderError(response);
			});

		if (this.props.errors.error) {
			console.log(this.props);
			Swal.fire({
				title: `Error: ${this.props.errors.error.error_code}`,
				text: `${this.props.errors.error.error} `,
				icon: "error",
				confirmButtonText: "Continue"
			}).then(this.props.clearErrors());
			return <div>Please enter a name</div>;
		}
		//refactor this to a error handling helper function instead of doing it in submit, for readability
		return this.errors;
	};
	renderError = error => {
		if (error) {
			// console.log(error);
			// alert(JSON.stringify(error.message) + ' An error occured when fetching the name; perhaps the API is down');
			Swal.fire({
				title: "Error!",
				text: "An error occured when making the network request: API offline",
				icon: "error",
				confirmButtonText: "Continue"
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
						<div className="header large">Name:</div>{" "}
						{this.props.translatedName.translatedNames[0].name}
					</div>
					<div className="item">
						<div className="header large">Gender:</div>
						{this.props.translatedName.translatedNames[0].gender}
					</div>
					<div className="item huge">
						{" "}
						<div className="header large">Origin: </div>
						{this.props.translatedName.translatedNames[0].usages[0].usage_full}
					</div>
				</div>
			);
		}
		return (
			<div className="ui content">
				<div className=" ui header" style={{ paddingTop: "10px" }}>
					{this.renderError}
				</div>
			</div>
		);
	};

	renderInput = ({ input, meta }) => {
		return (
			<div className="field" style={{ paddingTop: "10px" }}>
				{" "}
				<input {...input} />
				{input.touched && input.error && <span>{input.error}</span>}
			</div>
		);
	};

	render() {
		return (
			<div style={{ paddingTop: "20px" }}>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form"
					autoComplete="off"
				>
					<label className="ui header">What is your name?</label>
					<Field name="username" component={this.renderInput} />

					<button className="ui button primary">What Does It Mean?</button>
				</form>
				<div className="ui content">{this.renderOutput()}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		translatedName: state.translatedNames,
		similarNames: state.similarNames,
		errors: state.errors
	};
};

const validate = formValues => {
	const errors = {};
	if (!formValues.username) {
		errors.username = "Required";
	}
	if (!formValues.password) {
		errors.password = "Required";
	}
	return errors;
};

const formWrapped = reduxForm({ form: "nameInput", validate })(NameInput);

export default connect(mapStateToProps, {
	fetchNames,
	fetchSimilarNames,
	clearErrors
})(formWrapped);

//have do: add name changing and update to state of current name / probably,
// onsubmit do action with the submitted term and use that :to do (make an api request)
//refactor renderOutput to render a list, map over the array and render a list
//add a theme some styling
