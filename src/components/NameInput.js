import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchNames, fetchSimilarNames, clearErrors } from "../actions/index";
import Transition from "./Transition";

import "./NameInput.css";

import {
	Button,
	Box,
	Input,
	Container,
	TextField,
	Fade,
	Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// CommonJS
const Swal = require("sweetalert2");
/////////////////////////////////////////////////

/////////////////////////////////////////////////

class NameInput extends React.Component {
	onSubmit = async formValues => {
		console.log(formValues);
		await this.props.fetchNames(formValues);

		// const usageKey = this.props.translatedName.usages[0].usage_code;
		// this.fetchSimilarNames(formValues, usageKey);

		if (this.props.errors.error) {
			return this.renderError(this.props.errors.error);
		}
	};

	componentDidUpdate() {
		this.renderOutput();
	}

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
				<Fade in={Transition.checked} timeout={1000}>
					<Box className="ui huge">
						<h1 className="ui header huge">
							<p className="NameInputFont">
								Name: {this.props.translatedName.translatedNames[0].name}
							</p>
						</h1>

						<h1 className="ui header huge">
							<p className="NameInputFont">
								Gender: {this.props.translatedName.translatedNames[0].gender}
							</p>
						</h1>

						<h1 className="ui header">
							<p className="NameInputFont">
								{" "}
								Origin:{" "}
								{
									this.props.translatedName.translatedNames[0].usages[0]
										.usage_full
								}
							</p>
						</h1>
					</Box>
				</Fade>
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
			<Fade in>
				<Box
					className="field"
					style={{
						height: "40px",
						width: "500px",
						borderColor: "black",
						border: "60px"
					}}
				>
					{" "}
					<TextField
						fullWidth
						type="text"
						placeholder="Insert Name Here..."
						{...input}
						variant="outlined"
					/>
					{input.touched && input.error && <span>{input.error}</span>}
				</Box>
			</Fade>
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
					<h1 className="ui header">
						<p className="NameInputFont">What is your name?</p>
					</h1>

					<Field name="username" component={this.renderInput} />
					<Button type="submit" variant="contained" color="primary">
						What Does it Mean?
					</Button>
				</form>
				<div className="ui content" style={{ paddingTop: "20px" }}>
					{this.renderOutput()}
				</div>
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

//TODO: Add method for sending action for pulling information from wikipedia
