'use strict';

import styles from './DatePickerStyle.css';
import utils from './utils.js';

export default React.createClass({

	displayName: 'datepicker-view',

	getInitialState: () => {
		return {
			selectedDay: moment().endOf('day'),
			viewingDay: moment().endOf('day'),
			viewingMonth: moment().endOf('month'),
			viewingYear: moment().endOf('year'),
			minDate: moment().subtract(999, 'years'),
			maxDate: moment().add(999, 'years'),
			closeOnSelect: false,
			showPicker: false
		};
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
			this.setProps(nextProps);
		}

		this._handlePassedProps(nextProps);
	},

	_handlePassedProps: function(props) {
		if (props['selected-day']) {
			this.setState({
				selectedDay: moment(props['selected-day']).endOf('day'),
				viewingMonth: moment(props['selected-day']).endOf('month'),
				viewingYear: moment(props['selected-day']).endOf('year')
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
	},

	_onFocus: function() {
		var clickHandler = (e) => {
			console.log('click');
			var hasFocus = utils.closest(e.target, 'react-datepicker');
			if (!hasFocus) {
				document.removeEventListener('click', clickHandler);
				document.removeEventListener('keyup', keyPressHandler);
				this._onBlur();
			}
		}

		var keyPressHandler = (e) => {
			console.log(e.which);

			// ENTER
			if (e.which === 13) {
				document.removeEventListener('keyup', keyPressHandler);
				this._onOkClick();
			}

			// ESC
			if (e.which === 27) {
				document.removeEventListener('keyup', keyPressHandler);
				this._onBlur();
			}

			// back
			if (e.which === 37) {
				this._handleKeyPress(-1);
			}

			// up
			if (e.which === 38) {
				this._handleKeyPress(-7);
			}

			// forward
			if (e.which === 39) {
				this._handleKeyPress(1);
			}

			// down
			if (e.which === 40) {
				this._handleKeyPress(7);
			}
		}

		document.addEventListener('keyup', keyPressHandler);
		document.addEventListener('click', clickHandler);

		this._eventDispatcher('show');
		this.setState({ showPicker: true });
	},

	_onBlur: function() {
		this._eventDispatcher('blur');
		this.setState({ showPicker: false });
	},

	_onOkClick: function() {
		this._eventDispatcher('ok', this.state.selectedDay);
		this._onBlur();
	},

	_eventDispatcher: function(type, data) {
		var event = new CustomEvent('eventStream', {
			'detail': {
				eventType: type,
				message: data
			}
		});

		this.props.element.dispatchEvent(event);
	},

	_getDate: function(type) {
		var format;

		switch (type) {
			case 'DAYOFWEEK':
				format = 'dddd';
				break;
			case 'DAYOFMONTH':
				format = 'DD';
				break;
			case 'MONTH':
				format = 'MMM';
				break;
			case 'YEAR':
				format = 'YYYY';
				break;
		}

		return this.state.selectedDay.format(format);
	},

	_getCalendarDate: function(type) {
		var format,
			state = this.state.viewingMonth;

		switch (type) {
			case 'DAYOFWEEK':
				format = 'dddd';
				state = this.state.viewingDay;
				break;
			case 'DAYOFMONTH':
				format = 'DD';
				break;
			case 'MONTH':
				format = 'MMM';
				break;
			case 'YEAR':
				format = 'YYYY';
				state = this.state.viewingYear;
				break;
		}

		return state.format(format);
	},

	_handleKeyPress: function(move) {
		var day = Number(this._getDate('DAYOFMONTH')),
			month = this.state.viewingMonth.month(),
			year = this.state.viewingYear.year(),
			e = document.getElementsByClassName(styles.selected)[0],
			moveTo = this.state.selectedDay.toISOString();

		if (moment(moveTo).add(move, 'days').isBetween(this.state.minDate, this.state.maxDate, 'day')) {
			this.setState({ selectedDay: this.state.selectedDay.add(move, 'days') });
			this._eventDispatcher('dateSelected', this.state.selectedDay);
		}
	},

	_onDayClick: function(e) {
		var day = Number(e.target.getAttribute('data-date').split('/')[2]),
			month = this.state.viewingMonth.month(),
			year = this.state.viewingYear.year(),
			closeOnSelect = this.props['close-on-select'];

		if (closeOnSelect) {
			this._onOkClick();
		}

		this.setState({ selectedDay: this.state.selectedDay.year(year).month(month).date(day) });

		this._eventDispatcher('dateSelected', this.state.selectedDay);
	},

	_onMonthClick: function(e) {
		var moveBack = e.target.classList.contains(styles['arrow-left']) ? true : false,
			update;

		if (moveBack) {
			update = this.state.viewingMonth.subtract(1, 'month')
		} else {
			update = this.state.viewingMonth.add(1, 'month')
		}

		this.setState({ viewingMonth: update });
	},

	_onYearClick: function(e) {
		var moveBack = e.target.classList.contains(styles['arrow-left']) ? true : false,
			update;

		if (moveBack) {
			update = this.state.viewingYear.subtract(1, 'year')
		} else {
			update = this.state.viewingYear.add(1, 'year')
		}

		this.setState({ viewingYear: update });
	},

	_getDaysInMonth: function() {
		var days = [];

		for (var x = 0; x < this._getFirstDayOfMonth(); x++) {
		   days.push('');
		}

		for (var x = 0; x < this.state.viewingMonth.daysInMonth(); x++) {
			days.push(this.state.viewingMonth.startOf('month').add(x, 'days').format('DD'));
		}

		return _.chunk(days, 7);
	},

	_getFirstDayOfMonth: function() {
		return Number(this.state.viewingMonth.startOf('month').format('d'));
	},

	_getCellDate: function(cell) {
		return this.state.viewingYear.year() + '/' + this.state.viewingMonth.format('MM') + '/' + cell;
	},

	_getCellDateAsISO: function(cell) {
		return moment(this._getCellDate(cell), 'YYYY/MM/DD');
	},

	_isSelectedDay: function(cell) {
		if (cell && (this.state.selectedDay.format('YYYY/MM/DD') == this._getCellDate(cell))) {
			return true;
		}
		return false;
	},

	render: function() {
		var self = this;

		if (this.state.showPicker) {
			return (
				<div className={styles['fade-in']}>
					<input type="text" onFocus={self._onFocus} />
					<div className={styles.wrapper}>
						<div className={styles.header}>{this._getDate('DAYOFWEEK')}</div>
						<div className={styles.date}>
							<div className={styles.month}>
								<span className={styles['arrow-left']} onClick={this._onMonthClick}></span>
									{this._getCalendarDate('MONTH')}
								<span className={styles['arrow-right']} onClick={this._onMonthClick}></span>
							</div>
							<div className={styles.day}>{this._getDate('DAYOFMONTH')}</div>
							<div className={styles.year}>
								<span className={styles['arrow-left']} onClick={this._onYearClick}></span>
									{this._getCalendarDate('YEAR')}
								<span className={styles['arrow-right']} onClick={this._onYearClick}></span>
							</div>
						</div>
						<table className={styles.table}>
							<thead>
								<tr>
									<th>S</th>
									<th>M</th>
									<th>T</th>
									<th>W</th>
									<th>T</th>
									<th>F</th>
									<th>S</th>
								</tr>
							</thead>
							<tbody>
								{this._getDaysInMonth().map(function(row, i) {
									return (
										<tr key={i}>
											{row.map(function(cell, j) {
												if (cell) {
													if (self._getCellDateAsISO(cell).isBetween(self.state.minDate, self.state.maxDate, 'day')) {
														return (
															<td key={j}>
																<a
																	data-date={self._getCellDate(cell)}
																	className={self._isSelectedDay(cell) ? styles.selected : null}
																	onClick={self._onDayClick}>{cell}
																</a>
															</td>
														);
													} else {
														return <td key={j}>{cell}</td>;
													}
												} else {
													return <td key={j}></td>;
												}
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
						<div className={styles.footer}>
							<div className={styles.buttons}>
								<button className={styles.btn} onClick={self._onBlur}>Cancel</button>
								<button className={styles.btn} onClick={self._onOkClick}>OK</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <input type="text" onFocus={self._onFocus} />
		}

	}

});
