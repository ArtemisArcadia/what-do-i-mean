import React from "react";

class NameInput extends React.Component {
	onInputSubmit = () => {
		console.log("name submitted");
	};

	render() {
		return (
			<div className="ui massive fluid action input">
				<input type="text" placeholder="Enter Name"></input>
				<div onClick={e => this.onInputSubmit()} className="ui button blue">
					Search
				</div>
			</div>
		);
	}
}

export default NameInput;

//to do: add name changing and update to state of current name / probably, onsubmit do action with the submitted term and use that to make an api request
