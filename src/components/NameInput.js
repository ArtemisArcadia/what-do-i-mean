import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchNames, fetchSimilarNames, clearErrors } from "../actions/index";
import NameOutput from "./NameOutput";
import "./NameInput.css";

import {
	Button,
	Box,
	Container,
	TextField,
	Fade,
	Paper,
	Grid
} from "@material-ui/core";

// CommonJS
const Swal = require("sweetalert2");

class NameInput extends React.Component {
	onSubmit = async formValues => {
		await this.props.fetchNames(formValues);

		if (this.props.errors.error) {
			this.renderError(this.props.errors.error);
		}
	};

	// componentDidUpdate() {
	// 	// this.renderOutput();
	// 	console.log;
	// 	if (props.fetchedNames.fetchedNames[0])
	// 		return <NameOutput name={this.props.fetchedNames.fetchedNames[0]} />;
	// }

	renderError = async error => {
		await Swal.fire({
			title: `Error: ${this.props.errors.error.error_code}`,
			text: `${this.props.errors.error.error} `,
			icon: "error",
			confirmButtonText: "Continue"
		});
		this.props.clearErrors();
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
						color="primary"
						size="small"
					/>
					{input.touched && input.error && (
						<span className="name-input-font">{input.error}</span>
					)}
				</Box>
			</Fade>
		);
	};

	render() {
		console.log(this.props.fetchedNames);

		return (
			<Container style={{ paddingTop: 20 }}>
				<Grid container direction="column" alignItems="center" spacing={10}>
					<form
						onSubmit={this.props.handleSubmit(this.onSubmit)}
						autoComplete="off"
					>
						<Grid item xs={12}>
							<Field name="username" component={this.renderInput} />
						</Grid>
						<Grid
							item
							xs={12}
							container
							direction="row"
							justify="center"
							spacing={10}
						>
							<Grid item xs={6}>
								<Button
									// className="centered name-input-font"
									type="submit"
									variant="contained"
									color="primary"
									size="small"
								>
									<span className="name-input-font">
										Show Me My Name's Roots!
									</span>
								</Button>
							</Grid>
						</Grid>
					</form>
					<Grid item xs={12}>
						<NameOutput names={this.props.fetchedNames.fetchedNames} />
					</Grid>
				</Grid>
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
