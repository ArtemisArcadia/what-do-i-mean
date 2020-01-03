import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchNames, fetchSimilarNames, clearErrors } from "../actions/index";

// CommonJS
const Swal = require("sweetalert2");

class NameInput extends React.Component {
	onSubmit = async formValues => {
		console.log(formValues);
		await this.props.fetchNames(formValues);
		this.renderOutput();
		// const usageKey = this.props.translatedName.usages[0].usage_code;
		// this.fetchSimilarNames(formValues, usageKey);

		if (this.props.errors.error) {
			return this.renderError(this.props.errors.error);
		}
	};

	renderError = async error => {
		await Swal.fire({
			title: `Error: ${this.props.errors.error.error_code}`,
			text: `${this.props.errors.error.error} `,
			icon: "error",
			confirmButtonText: "Continue"
		});
		this.props.clearErrors();
		return <div>Please enter a name</div>;
	};

	renderOutput = () => {
		try {
			return (
				<div className="ui huge">
					<h1 className="ui header huge">
						Name :
						<div className="sub header large">
							{this.props.translatedName.translatedNames[0].name}
						</div>
					</h1>
					<h2 className="ui header">
						Gender :
						<div className="sub header large">
							{this.props.translatedName.translatedNames[0].gender}
						</div>
					</h2>
					<h3 className="ui header">
						Origin :
						<div className="sub header large">
							{
								this.props.translatedName.translatedNames[0].usages[0]
									.usage_full
							}
						</div>
					</h3>
				</div>
			);
		} catch (error) {
			return (
				<div className="ui content">
					<div className=" ui header" style={{ paddingTop: "10px" }}>
						{this.renderError}
					</div>
				</div>
			);
		}
	};

	renderInput = ({ input, meta }) => {
		return (
			<div className="field" style={{ paddingTop: "10px" }}>
				{" "}
				<input type="text" placeholder="Insert Name Here..." {...input} />
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

// <div className="ui list huge">
// 	<div className="item large">
// 		<div className="header huge">Name:</div>{" "}
// 		{this.props.translatedName.translatedNames[0].name}
// 	</div>
// 	<div className="item large">
// 		<div className="header large">Gender:</div>
// 		{this.props.translatedName.translatedNames[0].gender}
// 	</div>
// 	<div className="item large">
// 		{" "}
// 		<div className="header ">Origin: </div>
// 		{this.props.translatedName.translatedNames[0].usages[0].usage_full}
// 	</div>
// </div>
