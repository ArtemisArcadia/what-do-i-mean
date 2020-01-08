import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchNames, fetchSimilarNames, clearErrors } from "../actions/index";

import "./NameInput.css";

import { Button, Box, TextField, Fade, Paper } from "@material-ui/core";

// CommonJS
const Swal = require("sweetalert2");

class NameInput extends React.Component {
	onSubmit = async formValues => {
		console.log(formValues);
		await this.props.fetchNames(formValues);

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
				<div>
					<Paper
						elevation={3}
						style={{
							padding: "10px",
							opacity: "0.9",
							backgroundColor: "transparent"
						}}
					>
						<Paper
							className="ui huge"
							style={{ backgroundColor: "white", padding: "10px" }}
							elevation={24}
						>
							<Fade in timeout={1000}>
								<h1 className="ui header huge">
									<p className="name-input-font">
										Name: {this.props.fetchedNames.fetchedNames[0].name}
									</p>
								</h1>
							</Fade>
							<Fade in timeout={5000}>
								<h1 className="ui header huge">
									<p className="name-input-font">
										Gender: {this.props.fetchedNames.fetchedNames[0].gender}
									</p>
								</h1>
							</Fade>
							<Fade in timeout={9000}>
								<h1 className="ui header">
									<p className="name-input-font">
										{" "}
										Origin:{" "}
										{
											this.props.fetchedNames.fetchedNames[0].usages[0]
												.usage_full
										}
									</p>
								</h1>
							</Fade>
						</Paper>
					</Paper>
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
			<Fade in>
				<Box
					className="field"
					style={{
						height: "40px",
						width: "500px",
						fontFamily: "Roboto",
						fontSize: "20px"
					}}
				>
					<TextField
						fullWidth
						type="text"
						placeholder="Insert Name Here..."
						{...input}
						variant="outlined"
						color="#DDDAD3"
						size="normal"
					/>
					{input.touched && input.error && (
						<span className="name-input-font">{input.error}</span>
					)}
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
					<div style={{ padding: "10px" }}></div>

					<Field name="username" component={this.renderInput} />

					<Button
						className="centered name-input-font"
						type="submit"
						variant="contained"
						color="green"
						size="large"
					>
						<span className="name-input-font">Show Me My Name's Roots!</span>
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
		fetchedNames: state.fetchedNames,
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
