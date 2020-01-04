import React from "react";
import NameInput from "./NameInput";
import TranslatedName from "./TranslatedName";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<div
				className="ui container"
				style={{
					padding: "25px"
				}}
			>
				<div
					className="ui content"
					style={{
						padding: "50px",
						backgroundColor: "white",
						opacity: "0.8",
						borderRadius: "50px"
					}}
				>
					{" "}
					<NameInput />
				</div>
			</div>
		</div>
	);
};

export default App;
