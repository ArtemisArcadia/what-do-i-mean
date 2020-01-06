import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		height: 180
	},
	container: {
		display: "flex"
	},
	paper: {
		margin: theme.spacing(1)
	},
	svg: {
		width: 100,
		height: 100
	},
	polygon: {
		fill: theme.palette.common.white,
		stroke: theme.palette.divider,
		strokeWidth: 1
	}
}));

export default function Transition() {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked(prev => !prev);
	};
}
