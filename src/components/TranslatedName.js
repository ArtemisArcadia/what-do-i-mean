import React from 'react';
import { connect } from 'react-redux';
import { fetchNames } from '../actions/index';

class TranslatedName extends React.Component {
	renderOutput = () => {
		if (!this.props.translatedNames) {
			return (
				<div className="ui content">
					<h1 className="ui header">Please input a name for translation</h1>
				</div>
			);
		}
		return 0;
	};
	render() {
		console.log(this.props.translatedNames);
		return this.renderOutput();
	}
}

const mapStateToProps = state => {
	return {
		translatedNames: state.translatedNames[0],
	};
};
export default connect(mapStateToProps, { fetchNames })(TranslatedName);
