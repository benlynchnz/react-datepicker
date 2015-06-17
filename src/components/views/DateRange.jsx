'use strict';

import Store from '../store';
import utils from '../utils';
import Constants from '../constants';
import Calendar from './Calendar.jsx';

export default class DatePickerRangeView extends React.Component {

	displayName: 'datepicker-range'

	constructor(props) {
		super(props);
		this.state = Store.getState();

		this._updateState = this._updateState.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._onFocus = this._onFocus.bind(this);
		this._onUpdate = this._onUpdate.bind(this);
		this._onOk = this._onOk.bind(this);
		this._getConvenienceDatesAsHTML = this._getConvenienceDatesAsHTML.bind(this);
		this._onDateChange = this._onDateChange.bind(this);
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

		if (props['default-range']) {
			let range = props['default-range'];
			this.setState({ selectedDateRange: _.findWhere(Store.getConvenienceDates(), { name: range }) });
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

		this.setState({
			fromDate: this.state.selectedDateRange.dates.from,
			toDate: this.state.selectedDateRange.dates.to
		});
	}

	_onBlur() {
		this.setState({ show: false });
		utils.dispatch(this, Constants.BLUR, JSON.stringify(this.state.selectedDateRange));
	}

	_onFocus(e) {
		let isFrom = (e.target.getAttribute('data-range') === 'from') ? true : false;

		this.setState({
			isFrom: isFrom,
			moveToDate: this.props.selectedDate,
			range: true,
			show: true
		});

		utils.dispatch(this, Constants.FOCUS);
	}

	_onUpdate(date) {
		let isFrom = this.state.isFrom,
			customRange = _.findWhere(Store.getConvenienceDates(), { name: 'Custom' });

		customRange.dates = this.state.selectedDateRange.dates;

		if (isFrom) {
			customRange.dates.from = date.startOf('day');
			this.setState({
				fromDate: date.startOf('day'),
				selectedDateRange: customRange
			});
		} else {
			customRange.dates.to = date.endOf('day');
			this.setState({
				toDate: date.endOf('day'),
				selectedDateRange: customRange
			});
		}

		this.refs['select'].getDOMNode().selectedIndex = _.findIndex(Store.getConvenienceDates(), { name: 'Custom' });
	}

	_onOk() {
		this._onBlur();
	}

	_getConvenienceDatesAsHTML() {
		let dates = Store.getConvenienceDates(),
			names = [];

		let itemDefault = (item) => {
			if (item.name === this.state.selectedDateRange.name) {
				return 'selected';
			}
		};

		dates.forEach((item) => {
			names.push('<option value="' + item.name + '"' + itemDefault(item) + '>' + item.name + '</option>');
		});

		return { __html: names.join('') };
	}

	_onDateChange(e) {
		let value = e.target.options[e.target.selectedIndex].value,
			ranges = Store.getConvenienceDates(),
			selected = _.findWhere(ranges, { name: value });

		this.setState({ selectedDateRange: selected });
		utils.dispatch(this, Constants.DATE_RANGE_CHANGE, JSON.stringify(selected));
	}

	render() {
		if (!this.state.show) {
			return (
				<div>
					<select dangerouslySetInnerHTML={this._getConvenienceDatesAsHTML()} onChange={this._onDateChange} ref="select" />
					<input type="text" className="input" ref="datepicker-input-from" data-range="from" value={this.state.selectedDateRange.dates.from.format(this.state.displayFormat)} onFocus={this._onFocus} onClick={this._onFocus} readOnly/>
					<input type="text" className="input" ref="datepicker-input-to" data-range="to" value={this.state.selectedDateRange.dates.to.format(this.state.displayFormat)} onFocus={this._onFocus} onClick={this._onFocus} readOnly/>
				</div>
			);
		} else {
			return (
				<div>
					<select dangerouslySetInnerHTML={this._getConvenienceDatesAsHTML()} onChange={this._onDateChange} ref="select" />
					<input type="text" className="input" ref="datepicker-input-from" value={this.state.selectedDateRange.dates.from.format(this.state.displayFormat)} onFocus={this._onFocus} onClick={this._onFocus} readOnly/>
					<input type="text" className="input" ref="datepicker-input-to" value={this.state.selectedDateRange.dates.to.format(this.state.displayFormat)} onFocus={this._onFocus} onClick={this._onFocus} readOnly/>
					<Calendar {...this.state}
						onBlur={this._onBlur}
						onOK={this._onOk}
						onUpdate={this._onUpdate} />
				</div>
			);
		}
	}

};
