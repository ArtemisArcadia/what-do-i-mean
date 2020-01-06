import React from "react";
import NameInput from "./NameInput";
import TranslatedName from "./TranslatedName";
import NameInformation from "./NameInformation";
import "./App.css";

import { Paper } from "@material-ui/core";

const App = () => {
	return (
		<div className="App">
			<div className="ui container centered">
				<Paper elevation={20} className="ui main content centered">
					{" "}
					<NameInput />
					<NameInformation />
				</Paper>
			</div>
		</div>
	);
};

export default App;
//NameInformation should display the information from the wikipedia article about someones name.
//could use it its own component
