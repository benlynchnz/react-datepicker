import styles from '../../DatePickerStyle.css';
import Store from '../store';
import Constants from '../constants';
import Calendar from './Calendar.jsx';

export default React.createClass({

	displayName: 'datepicker-range',

	getInitialState: () => {
		return Store.getState();
	},

	componentDidMount: function() {
		var rootNode = this.getDOMNode(),
			hasNextProps = false,
			nextProps = {},
			parentNode = rootNode.parentNode;

		Object.keys(parentNode.attributes).forEach(function(key) {
			var namedNode;

			if (key !== 'length') {
				hasNextProps = true;
				namedNode = parentNode.attributes[key];
				nextProps[namedNode.name] = namedNode.value;
			}
		});

		if (hasNextProps) {
			this._updateState(nextProps);
		}
	},

	_updateState: function(props) {
		if (props['display-format']) {
			this.setState({
				displayFormat: props['display-format']
			});
		}

		if (props['default-range']) {
			var range = props['default-range'];
			this.setState({ selectedDateRange: _.findWhere(Store.getConvenienceDates(), { name: range }) });
		}

		if (props['selected-date']) {
			var date;
			if (props['selected-date-format']) {
				date = moment(props['selected-date'], props['selected-date-format']);
			} else {
				date = moment(props['selected-date']);
			}

			var viewing = date.toISOString();

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
	},

	_onBlur: function() {
		this.setState({ show: false });
		this._dispatch(Constants.BLUR, JSON.stringify(this.state.selectedDateRange));
	},

	_onFocus: function(e) {
		var isFrom = (e.target.getAttribute('data-range') === 'from') ? true : false;

		this.setState({
			isFrom: isFrom,
			moveToDate: this.props.selectedDate,
			range: true,
			show: true
		});

		this._dispatch(Constants.FOCUS);
	},

	_onUpdate: function(date) {
		var isFrom = this.state.isFrom;

		var customRange = _.findWhere(Store.getConvenienceDates(), { name: 'Custom' });

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
	},

	_onOk: function() {
		this._onBlur();
	},

	_getConvenienceDatesAsHTML: function() {
		var dates = Store.getConvenienceDates(),
			names = [],
			self = this;

		function itemDefault(item) {
			if (item.name === self.state.selectedDateRange.name) {
				return 'selected';
			}
		};

		dates.forEach(function(item) {
			names.push('<option value="' + item.name + '"' + itemDefault(item) + '>' + item.name + '</option>');
		});

		return { __html: names.join('') };
	},

	_onDateChange: function(e) {
		var value = e.target.options[e.target.selectedIndex].value,
			ranges = Store.getConvenienceDates(),
			selected = _.findWhere(ranges, { name: value });

		this.setState({ selectedDateRange: selected });
		this._dispatch(Constants.DATE_RANGE_CHANGE, JSON.stringify(selected));
	},

	_dispatch: function(action, payload) {
		var event = new CustomEvent('event', {
			'detail': {action, payload}
		});

		this.props.element.dispatchEvent(event);
	},

	render: function() {
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

});

