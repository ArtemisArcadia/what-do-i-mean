import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchNames, fetchSimilarNames, clearErrors } from "../actions/index";
import NameOutput from "./NameOutput";
import Swal from "sweetalert2";
import "./NameInput.css";

import {
	Button,
	Box,
	Container,
	TextField,
	Fade,
	Grid,
	Paper
} from "@material-ui/core";

class NameInput extends React.Component {
	onSubmit = async formValues => {
		await this.props.fetchNames(formValues);

		if (this.props.errors.error) {
			this.renderError(this.props.errors.error);
		}
	};

	renderError = async error => {
		const lower = this.props.errors.error.error;
		const upper = lower.replace(/^\w/, c => c.toUpperCase());

		await Swal.fire({
			title: `Error : ${this.props.errors.error.error_code}`,
			text: upper,
			icon: "error",
			confirmButtonText: "Continue"
		});
		this.props.clearErrors();
	};

	renderInput = ({ input, meta: { touched, error, invalid } }) => {
		return (
			<Fade in>
				<Box
					className="field"
					style={{
						height: "40px",
						width: "500px",
						fontFamily: "Roboto",
						fontSize: "20px",
						color: "white"
					}}
				>
					<TextField
						id="filled-input"
						fullWidth
						type="text"
						helperText={touched && error}
						error={touched && error}
						placeholder="Insert Name Here..."
						{...input}
						variant="outlined"
						color="secondary"
						size
					/>
					{input.touched && input.error && (
						<Box component="span" className="name-input-font">
							{input.error}
						</Box>
					)}
				</Box>
			</Fade>
		);
	};

	render() {
		return (
			<Container style={{ paddingTop: 20 }}>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					autoComplete="off"
				>
					<Grid container direction="column" alignItems="center" spacing={2}>
						<Grid item xs={12}>
							<Paper style={{ paddingBottom: 13 }}>
								<Field name="username" component={this.renderInput} />
							</Paper>
						</Grid>

						<Grid item xs={12} container direction="row" justify="center">
							<Grid
								container
								item
								xs={12}
								alignItems="center"
								justify="center"
								style={{ textAlign: "center" }}
							>
								<Button type="submit" variant="contained" color="primary">
									<Box component="span" className="name-input-font">
										Show Me My Name's Roots!
									</Box>
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<NameOutput names={this.props.fetchedNames.fetchedNames} />
				</form>
			</Container>
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
