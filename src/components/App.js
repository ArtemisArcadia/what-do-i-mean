import React from "react";
import NameInput from "./NameInput";
import TranslatedName from "./TranslatedName";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<div className="ui container">
				<div
					className="ui content"
					style={{ padding: "100px", backgroundColor: "white", opacity: "0.8" }}
				>
					{" "}
					<NameInput />
				</div>
			</div>
		</div>
	);
};

export default App;
