import React from "react";
import NameInput from "./NameInput";
import NameInformation from "./NameInformation";
import "./App.css";

import { Paper } from "@material-ui/core";

const App = () => {
	return (
		<div className="App">
			<Paper elevation={24} className="title">
				<p className="title-font">&radic;Name</p>
			</Paper>
			<Paper
				elevation={24}
				className="ui main content centered"
				style={{ backgroundColor: "transparent" }}
			>
				{" "}
				<NameInput />
				<NameInformation />
			</Paper>
		</div>
	);
};

export default App;
//NameInformation should display the information from the wikipedia article about someones name.
//could use it its own component
