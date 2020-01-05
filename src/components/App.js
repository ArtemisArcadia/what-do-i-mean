import React from "react";
import NameInput from "./NameInput";
import TranslatedName from "./TranslatedName";
import NameInformation from "./NameInformation";
import "./App.css";

const App = () => {
	return (
		<div className="App">
			<div className="ui container centered">
				<div
					className="ui content centered"
					style={{
						padding: "50px",
						paddingLeft: "50px",
						paddingRight: "50px",
						backgroundColor: "white",
						opacity: "0.9",
						borderRadius: "25px"
					}}
				>
					{" "}
					<NameInput />
					<NameInformation />
				</div>
			</div>
		</div>
	);
};

export default App;
//NameInformation should display the information from the wikipedia article about someones name.
//could use it its own component
