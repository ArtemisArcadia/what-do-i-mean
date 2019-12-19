import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchNames } from '../actions/index';

class NameInput extends React.Component {
	onSubmit = async formValues => {
		await this.props.fetchNames(formValues).then(() => {
			this.renderOutput();
		});
	};

	renderOutput = () => {
		if (this.props.translatedName.translatedNames) {
			console.log(this.props.translatedName.translatedNames[0]);
			return (
				<div className="ui list">
					<div className="item">
						<div className="header">Name:</div> {this.props.translatedName.translatedNames[0].name}
					</div>
					<div className="item">
						<div className="header">Gender:</div>
						{this.props.translatedName.translatedNames[0].gender}
					</div>
					<div className="item">
						{' '}
						<div className="header">Origin: </div>
						{this.props.translatedName.translatedNames[0].usages[0].usage_full}
					</div>
				</div>
			);
		}
		return (
			<div className="ui content">
				<div className=" ui header" style={{ paddingTop: '10px' }}>
					Input name for translation...
				</div>
			</div>
		);
	};

	renderInput = ({ input, meta }) => {
		return (
			<div className="field">
				{' '}
				<input {...input} />
			</div>
		);
	};

	render() {
		return (
			<div style={{ paddingTop: '20px' }}>
				<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
					<Field name="username" component={this.renderInput} />

					<button className="ui button primary">What Is IT?</button>
				</form>
				<div className="ui content">{this.renderOutput()}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { translatedName: state.translatedNames };
};
const validate = formValues => {
	const errors = {};
	return errors;
};

const formWrapped = reduxForm({ form: 'nameInput', validate })(NameInput);

export default connect(mapStateToProps, { fetchNames })(formWrapped);

//have do: add name changing and update to state of current name / probably,
// onsubmit do action with the submitted term and use that :to do (make an api request)
//refactor renderOutput to render a list, map over the array and render a list
//add a theme some styling
