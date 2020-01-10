import React from "react";

import { styled } from "@material-ui/core/styles";
import { Button, Box, TextField, Fade, Paper } from "@material-ui/core";

const TransparentPaper = styled(Paper)({
	padding: "10px",
	opacity: "0.9",
	backgroundColor: "transparent"
});

const NameOutput = ({ names }) => {
	console.log("output", names);
	function renderError(error) {
		console.log();
		this.props.clearErrors();
	}

	if (names) {
		const TIME_OUT = 1000;

		return (
			<Box>
				<TransparentPaper elevation={24}>
					<Paper
						className="ui huge"
						style={{ backgroundColor: "white", padding: "10px" }}
						elevation={24}
					>
						<Fade in timeout={TIME_OUT}>
							<h1 className="ui header huge">
								<p className="name-input-font">Name: {names[0].name}</p>
							</h1>
						</Fade>
						<Fade in timeout={TIME_OUT * 3}>
							<h1 className="ui header huge">
								<p className="name-input-font">Gender: {names[0].gender}</p>
							</h1>
						</Fade>
						<Fade in timeout={TIME_OUT * 5}>
							<h1 className="ui header">
								<p className="name-input-font">
									{" "}
									Origin: {names[0].usages[0].usage_full}
								</p>
							</h1>
						</Fade>
					</Paper>
				</TransparentPaper>
			</Box>
		);
	}
	return <div />;
};

export default NameOutput;
