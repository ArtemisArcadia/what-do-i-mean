import React from "react";
import { connect } from "react-redux";

class NameInformation extends React.Component {
	render() {
		const additionalInformation = false;
		if (additionalInformation) {
			return <div>Additional Information About Name Here</div>;
		}
		return <div></div>;
	}
}

const mapStateToProps = state => {
	return {};
};

export default connect(mapStateToProps)(NameInformation);

//Add in methods and logic for extracting information from wikipedia api; after making method and actions for getting informatino from api
