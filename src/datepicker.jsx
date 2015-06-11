'use strict';

import styles from './DatePickerStyle.css';
import utils from './utils';
import constants from './constants';

export default React.createClass({

	displayName: 'datepicker-view',

	getInitialState: () => {
		return {
			selectedDate: moment().endOf('day'),
			moveToDate: null,
			today: moment().endOf('day'),
			viewingDay: moment().endOf('day'),
			viewingMonth: moment().endOf('month'),
			viewingYear: moment().endOf('year'),
			minDate: moment().subtract(999, 'years'),
			maxDate: moment().add(999, 'years'),
			displayFormat: 'DD MMM YYYY',
			closeOnSelect: false,
			show: false,
			powerKeys: {
				active: false,
				direction: null,
				keys: [],
				duration: 'Days',
				style: {
					display: 'none'
				}
			}
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
		if (props['display-format']) {
			this.setState({
				displayFormat: props['display-format']
			});
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
	},

	_createOverlay: function() {
		if (!document.getElementById('overlay')) {
			var el = document.createElement('div');
			el.id = 'overlay';
			el.classList.add(styles.overlay);
			document.body.appendChild(el);
		}
	},

	_removeOverlay: function() {
		var el = document.getElementById('overlay');
		if (el) {
			el.outerHTML = '';
		}
	},

	_onFocus: function(e) {
		// var wrapper = this.refs['wrapper'].getDOMNode();

		var clickHandler = (e) => {
			var hasFocus = !e.target.classList.contains(styles.modal) ? true : false;
			if (!hasFocus) {
				document.removeEventListener('click', clickHandler);
				// wrapper.removeEventListener('keyup', keyUpHandler);
				this._onBlur();
			}
		}

		this._createOverlay();

		var waitForKeys = false,
			moveTo = this.state.selectedDate.toISOString();

		var keyUpHandler = (e) => {

			var SHIFT    = e.shiftKey,
				CTRL     = e.ctrlKey,
				DELETE   = e.which === 8 ? true : false,
				ADD      = e.which === 187 ? true : false,
				SUBTRACT = e.which === 189 ? true : false,
				LEFT     = e.which === 37 ? true : false,
				RIGHT    = e.which === 39 ? true : false,
				UP       = e.which === 38 ? true : false,
				DOWN     = e.which === 40 ? true : false,
				ENTER    = e.which === 13 ? true : false,
				ESC      = e.which === 27 ? true : false,
				YEAR     = SHIFT && CTRL ? true : false,
				MONTH    = SHIFT && !CTRL ? true : false;

			if (waitForKeys) {

				if (e.which !== 16) {

					if (ESC) {
						waitForKeys = false;
						this.setState({
							powerKeys: {
								active: false,
								keys: [],
								direction: null,
								duration: 'Days',
								style: {
									display: 'none'
								}
							}
						});
						return;
					}

					if (ENTER) {
						waitForKeys = false;
						this.setState({
							powerKeys: {
								active: false,
								keys: [],
								direction: null,
								duration: 'Days',
								style: {
									display: 'none'
								}
							}
						});
						this._updateDate(this.state.moveToDate);
						return;
					}

					var keys = this.state.powerKeys.keys,
						key = String.fromCharCode(e.which).toLowerCase(),
						duration = this.state.powerKeys.duration,
						direction = this.state.powerKeys.direction,
						moveTo = this.state.selectedDate.toISOString(),
						value;

					if (!isNaN(Number(key))) {
						if (keys.length) {
							keys.push(key);
						} else {
							keys = [key];
						}
					} else if (key === 'd') {
						duration = 'Days';
					} else if (key === 'w') {
						duration = 'Weeks';
					} else if (key === 'm') {
						duration = 'Months';
					} else if (key === 'y') {
						duration = 'Years';
					} else if (DELETE) {
						keys.pop();
					}

					value = Number(keys.join(''));

					if (keys.length === 1 && value === 1) {
						duration = _.trimRight(duration, 's');
					} else if (!_.endsWith(duration, 's')) {
						duration += 's';
					}

					if (SHIFT && ADD) {
						direction = 'Add';
					}

					if (SHIFT && SUBTRACT) {
						direction = 'Subtract';
					}

					console.log(direction, value, duration.toLowerCase());

					if (direction.indexOf('Add') !== -1) {
						moveTo = moment(moveTo).add(value, duration.toLowerCase());
					} else {
						moveTo = moment(moveTo).subtract(value, duration.toLowerCase());
					}

					this.setState({
						powerKeys: {
							active: true,
							keys: keys,
							direction: direction,
							duration: duration
						},
						moveToDate: moveTo
					});
				}

				return;
			}

			if (SHIFT && ADD) {
				waitForKeys = true;
				this.setState({
					powerKeys: {
						active: true,
						keys: this.state.powerKeys.keys,
						direction: 'Add',
						duration: this.state.powerKeys.duration
					}
				});
				return;
			}

			if (SHIFT && SUBTRACT) {
				waitForKeys = true;
				this.setState({
					powerKeys: {
						active: true,
						keys: this.state.powerKeys.keys,
						direction: 'Subtract',
						duration: this.state.powerKeys.duration
					}
				});
				return;
			}

			if (YEAR && LEFT) {
				this._onYearClick(-1);
				return;
			}

			if (YEAR && RIGHT) {
				this._onYearClick(1);
				return;
			}

			if (MONTH && LEFT) {
				this._onMonthClick(-1);
				return;
			}

			if (MONTH && RIGHT) {
				this._onMonthClick(1);
				return;
			}

			if (ENTER) {
				document.removeEventListener('keyup', keyUpHandler);
				this._onOkClick();
				return;
			}

			if (ESC) {
				document.removeEventListener('keyup', keyUpHandler);
				this._onBlur();
				return;
			}

			if (LEFT) {
				this._handleKeyPress(-1);
				return;
			}

			if (UP) {
				this._handleKeyPress(-7);
				return;
			}

			if (RIGHT) {
				this._handleKeyPress(1);
				return;
			}

			if (DOWN) {
				this._handleKeyPress(7);
				return;
			}
		}

		document.addEventListener('keyup', keyUpHandler);
		document.addEventListener('click', clickHandler);

		this._dispatch(constants.FOCUS);
		this.setState({ show: true });
	},

	_onBlur: function() {
		this._dispatch(constants.BLUR);
		this.setState({
			show: false,
			powerKeys: {
				active: false,
				keys: [],
				duration: 'Days',
				style: {
					display: 'none'
				}
			}
		});
		this._removeOverlay();
	},

	_onOkClick: function() {
		this._dispatch(constants.OK);
		this._onBlur();
	},

	_dispatch: function(action, payload) {
		var event = new CustomEvent('event', {
			'detail': {action, payload}
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

		return this.state.selectedDate.format(format);
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
		var moveTo = this.state.selectedDate.toISOString();

		if (moment(moveTo).add(move, 'days').isBetween(this.state.minDate, this.state.maxDate, 'day')) {
			this._updateDate(this.state.selectedDate.add(move, 'days'));
		}
	},

	_updateDate: function(date) {
		this.setState({ selectedDate: date });
		this.refs['datepicker-input'].getDOMNode().value = this.state.selectedDate.format(this.state.displayFormat);
		this._dispatch(constants.DATE_SELECTED, JSON.stringify({ date: this.state.selectedDate.toISOString() }));
	},

	_onDayClick: function(e) {
		var day = Number(e.target.getAttribute('data-date').split('/')[2]),
			month = this.state.viewingMonth.month(),
			year = this.state.viewingYear.year();

		this._updateDate(this.state.selectedDate.year(year).month(month).date(day));

		if (this.state.closeOnSelect) {
			this._onOkClick();
		}
	},

	_onMonthClick: function(e) {
		var moveBack, update;

		if (e.target) {
			moveBack = e.target.classList.contains(styles['arrow-left']) ? true : false;
		} else {
			moveBack = (e === -1) ? true : false;
		}

		if (moveBack) {
			update = this.state.viewingMonth.subtract(1, 'month')
		} else {
			update = this.state.viewingMonth.add(1, 'month')
		}

		this.setState({ viewingMonth: update });
	},

	_onYearClick: function(e) {
		var moveBack, update;

		if (e.target) {
			moveBack = e.target.classList.contains(styles['arrow-left']) ? true : false;
		} else {
			moveBack = (e === -1) ? true : false;
		}

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

	_getCellDateClass: function(cell) {
		if (cell && (this.state.selectedDate.format('YYYY/MM/DD') == this._getCellDate(cell))) {
			return styles.selected;
		}

		if (cell && this.state.moveToDate && (this.state.moveToDate.format('YYYY/MM/DD') == this._getCellDate(cell))) {
			return styles['move-to'];
		}

		if (cell && this.state.today.format('YYYY/MM/DD') == this._getCellDate(cell)) {
			return styles.today;
		}
	},

	render: function() {
		if (this.state.show) {
			return (
				<div ref="wrapper">
					<input type="text" ref="datepicker-input" className="input" onFocus={this._onFocus} value={this.state.selectedDate.format(this.state.displayFormat)} />
						<div className={styles.modal}>
						<div className={styles.wrapper} ref="wrapper">
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
									{this._getDaysInMonth().map((row, i) => {
										return (
											<tr key={i}>
												{row.map((cell, j) => {
													if (cell) {
														if (this._getCellDateAsISO(cell).isBetween(this.state.minDate, this.state.maxDate, 'day')) {
															return (
																<td key={j}>
																	<a
																		data-date={this._getCellDate(cell)}
																		className={this._getCellDateClass(cell)}
																		onClick={this._onDayClick}>{cell}
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
									<button className={styles.btn} onClick={this._onBlur}>Cancel</button>
									<button className={styles.btn} onClick={this._onOkClick}>OK</button>
								</div>
							</div>
							<div className={styles['power-keys']} style={this.state.powerKeys.style}>
								<li className={styles['power-keys-item']}>{this.state.powerKeys.direction}</li>
								{(this.state.powerKeys.keys.length
									? <li className={styles['power-keys-item']}>{this.state.powerKeys.keys}</li>
									: null
								)}
								{(this.state.powerKeys.keys.length
									? <li className={styles['power-keys-item']}>{this.state.powerKeys.duration}</li>
									: null
								)}
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<input type="text" className="input" ref="datepicker-input" onFocus={this._onFocus} value={this.state.selectedDate.format(this.state.displayFormat)} readOnly/>
				</div>
			);
		}

	}

});
