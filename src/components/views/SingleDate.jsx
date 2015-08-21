'use strict';

import Store from '../store';
import utils from '../utils';
import Constants from '../constants';
import Calendar from './Calendar.jsx';
import styles from "../../DatePickerStyle.css";

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
		if (props['data-display-format']) {
			this.setState({
				displayFormat: props['data-display-format']
			});
		}

		if (props['data-selected-date']) {
			let date,
				isUTC = props['data-selected-date'].indexOf('UTC') !== -1,
				dateString = props['data-selected-date'];

			if (props['data-selected-date-format']) {
				date = moment(dateString, props['data-selected-date-format']);
			} else {
				date = moment(dateString);
			}

			if (isUTC) {
				let offset = date.utcOffset();
				date = date.add(offset, 'minutes');
			}

			let viewing = date.toISOString();

			this.setState({
				selectedDate: date.endOf('day'),
				moveToDate: moment(viewing).endOf('day'),
				viewingMonth: moment(viewing).endOf('month'),
				viewingYear: moment(viewing).endOf('year')
			});
		}

		if (props['data-min-date']) {
			this.setState({
				minDate: moment(props['data-min-date'])
			});
		}

		if (props['data-max-date']) {
			this.setState({
				maxDate: moment(props['data-max-date'])
			});
		}

		if (props['data-close-on-select']) {
			this.setState({ closeOnSelect: true });
		}

		if (props["data-first-day-of-week"]) {
			let day = Number(props["data-first-day-of-week"]);

			this.setState({
				firstDayOfWeek: day,
				daysOfWeek: day === 0 ? ["S","M","T","W","T","F","S"] : ["M","T","W","T","F","S","S"]
			});
		}
	}

	_onBlur() {
		this.setState({ show: false });
	}

	_onFocus() {
		this.setState({ moveToDate: this.props.selectedDate });
		this.setState({ show: true });
	}

	_onUpdate(date) {
		this.setState({ selectedDate: date });
		utils.dispatch(this, Constants.DATE_SELECTED, JSON.stringify({ date: date }));
	}

	_onOk(date) {
		this._onBlur();
	}

	render() {
		if (!this.state.show) {
			return (
				<div className={styles["input-group"]}>
					<input
						id={this.props.element.id + '-input'}
						type="text"
						className="input"
						ref="datepicker-input"
						data-iso={this.state.selectedDate.toISOString()}
						value={this.state.selectedDate.format(this.state.displayFormat)}
						onClick={this._onFocus}
						onFocus={this._onFocus}
						readOnly/>
				</div>
			);
		} else {
			return (
				<div className={styles["input-group"]}>
					<input
						id={this.props.element.id + '-input'}
						type="text"
						className="input"
						ref="datepicker-input"
						data-iso={this.state.selectedDate.toISOString()}
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
