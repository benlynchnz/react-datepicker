'use strict';

import Store from '../store';
import utils from '../utils';
import Constants from '../constants';
import Calendar from './Calendar.jsx';

export default class DatePickerSingleView extends React.Component {

	displayName: 'datepicker-single'

	constructor(props) {
		super(props);
		this.state = Store.getState();

		this._updateState = this._updateState.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._onFocus = this._onFocus.bind(this);
		this._onOk = this._onOk.bind(this);
		this._onUpdate = this._onUpdate.bind(this);
	}

	componentDidMount() {
		return utils.componentDidMount(this);
	}

	_updateState(props) {
		if (props['display-format']) {
			this.setState({
				displayFormat: props['display-format']
			});
		}

		if (props['selected-date']) {
			let date;
			if (props['selected-date-format']) {
				date = moment(props['selected-date'], props['selected-date-format']);
			} else {
				date = moment(props['selected-date']);
			}

			let viewing = date.toISOString();

			this.setState({
				selectedDate: date.endOf('day'),
				moveToDate: moment(viewing).endOf('day'),
				viewingMonth: moment(viewing).endOf('month'),
				viewingYear: moment(viewing).endOf('year')
			});
		}

		if (props['min-date']) {
			this.setState({
				minDate: moment(props['min-date'])
			});
		}

		if (props['max-date']) {
			this.setState({
				maxDate: moment(props['max-date'])
			});
		}

		if (props['close-on-select']) {
			this.setState({ closeOnSelect: true });
		}
	}

	_onBlur() {
		this.setState({ show: false });
		utils.dispatch(this, Constants.BLUR, JSON.stringify({ date: this.state.selectedDate }));
	}

	_onFocus() {
		this.setState({ moveToDate: this.props.selectedDate });
		this.setState({ show: true });
	}

	_onUpdate(date) {
		this.setState({ selectedDate: date });
		utils.dispatch(this, Constants.DATE_SELECTED, JSON.stringify({ date: date }));
	}

	_onOk() {
		this._onBlur();
	}

	render() {
		if (!this.state.show) {
			return (
				<input
					type="text"
					className="input"
					ref="datepicker-input"
					value={this.state.selectedDate.format(this.state.displayFormat)}
					onClick={this._onFocus}
					onFocus={this._onFocus}
					readOnly/>
			);
		} else {
			return (
				<div>
					<input
						type="text"
						className="input"
						ref="datepicker-input"
						value={this.state.selectedDate.format(this.state.displayFormat)}
						onClick={this._onFocus}
						onFocus={this._onFocus}
						readOnly/>
					<Calendar {...this.state}
						onBlur={this._onBlur}
						onOK={this._onOk}
						onUpdate={this._onUpdate} />
				</div>
			);
		}
	}

};
