'use strict';

import styles from './DatePickerStyle.css';
import utils from './utils';
import constants from './constants';

export default React.createClass({

	displayName: 'datepicker-view',

	getInitialState: () => {
		return {
			selectedDate: moment().endOf('day'),
			moveToDate: moment().endOf('day'),
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
				value: 0,
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

	componentDidUpdate: function (prevProps, prevState) {
		this._keepFocus();
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

	_keepFocus: function() {
		var input = this.refs['hidden-input'];
		if (input) {
			input.getDOMNode().focus();
		}
	},

	_onFocus: function(e) {
		var input = e.target;
		var clickHandler = (e) => {
			var lostFocus = e.target.classList.contains(styles.modal);
			if (lostFocus) {
				document.removeEventListener('click', clickHandler);
				input.removeEventListener('keydown', keyUpHandler);
				this._onBlur();
			} else {
				this._keepFocus();
			}
		}

		this._createOverlay();

		var waitForKeys = false,
			moveTo = this.state.selectedDate.toISOString();

		var keyUpHandler = (e) => {

			var keyMap = utils.keyMap(e),
				duration = this.state.powerKeys.duration,
				direction = this.state.powerKeys.direction,
				moveTo = this.state.selectedDate.toISOString(),
				keys = this.state.powerKeys.keys,
				key = keyMap.KEY,
				value;

			if (waitForKeys) {

				if (keyMap.ESC || keyMap.ENTER) {
					waitForKeys = false;
					this.setState({
						powerKeys: {
							active: false,
							keys: [],
							direction: null,
							value: 0,
							duration: 'Days',
							style: {
								display: 'none'
							}
						}
					});

					if (keyMap.ENTER) {
						this._updateDate(this.state.moveToDate);
						e.preventDefault();
						e.stopPropagation();
					}

					if (keyMap.ESC) {
						this.setState({ moveToDate: this.state.selectedDate });
						e.preventDefault();
						e.stopPropagation();
					}

					return;
				}

				if (keyMap.VALUE || keyMap.VALUE === 0) {
					if (keys.length) {
						keys.push(keyMap.VALUE);
					} else {
						keys = [keyMap.VALUE];
					}
				} else if (keyMap.DURATION_DAYS) {
					duration = 'Days';
				} else if (keyMap.DURATION_WEEKS) {
					duration = 'Weeks';
				} else if (keyMap.DURATION_MONTHS) {
					duration = 'Months';
				} else if (keyMap.DURATION_YEARS) {
					duration = 'Years';
				} else if (keyMap.DELETE) {
					keys.pop();
				}

				if (keyMap.ACTION_ADD) {
					direction = 'Add';
				}

				if (keyMap.ACTION_SUBTRACT) {
					direction = 'Subtract';
				}

				if (keyMap.RIGHT) {
					var update = Number(keys.join('')) + 1;
					keys = [update];
					if (update > 0) {
						direction = 'Add';
					}
				}

				if (keyMap.LEFT) {
					var update = Number(keys.join('')) - 1;
					if (update < 0) {
						direction = 'Subtract';
					}
					keys = [update];
				}

				value = keys.join('');

				if ((value > 0 && direction === 'Subtract') || (value < 0 && direction === 'Add')) {
					var update = Number(keys.join('')) * -1;
					keys = [update];
					value = keys.join('');
				}

				if (keys.length === 1 && Math.abs(Number(value)) === 1) {
					duration = _.trimRight(duration, 's');
				} else if (!_.endsWith(duration, 's')) {
					duration += 's';
				}

				moveTo = moment(moveTo).add(value, duration.toLowerCase());

				this.setState({
					powerKeys: {
						active: true,
						keys: keys,
						value: value,
						direction: direction,
						duration: duration
					},
					moveToDate: moveTo
				});

			} else {

				var initPowerKeys = (subtract) => {
					waitForKeys = true;
					this.setState({
						powerKeys: {
							active: true,
							keys: [],
							direction: subtract ? 'Subtract' : 'Add',
							duration: this.state.powerKeys.duration
						}
					});
				}

				if (keyMap.ACTION_ADD || keyMap.ACTION_SUBTRACT) {
					initPowerKeys(keyMap.ACTION_SUBTRACT);
				}

				if (keyMap.LEFT || keyMap.RIGHT) {
					initPowerKeys(keyMap.LEFT);
				}

				if (keyMap.ENTER) {
					input.removeEventListener('keydown', keyUpHandler);
					this._updateDate(this.state.moveToDate);
					this._onOkClick();
					e.preventDefault();
					e.stopPropagation();
				}

				if (keyMap.ESC) {
					input.removeEventListener('keydown', keyUpHandler);
					this._onBlur();
				}
			}
		}

		input.addEventListener('keydown', keyUpHandler);
		document.addEventListener('click', clickHandler);

		this.setState({ show: true });
		this._dispatch(constants.FOCUS);
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
			},
			moveToDate: this.state.selectedDate
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

	_updateDate: function(date, moveTo) {
		if (moveTo) {
			this.setState({ moveToDate: date });
		} else {
			this.setState({ selectedDate: date });
			this.refs['datepicker-input'].getDOMNode().value = this.state.selectedDate.format(this.state.displayFormat);
			this._dispatch(constants.DATE_SELECTED, JSON.stringify({ date: this.state.selectedDate.toISOString() }));
		}
	},

	_onDayClick: function(e) {
		var day = Number(e.target.getAttribute('data-date').split('/')[2]),
			month = this.state.viewingMonth.month(),
			year = this.state.viewingYear.year();

		this._updateDate(this.state.selectedDate.year(year).month(month).date(day));

		this.setState({
			powerKeys: {
				active: false,
				keys: [],
				duration: 'Days',
				style: {
					display: 'none'
				}
			},
			moveToDate: this.state.selectedDate
		});

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
					<input type="text" ref="datepicker-input" className="input" value={this.state.selectedDate.format(this.state.displayFormat)} />
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
									? <li className={styles['power-keys-item']}>{Math.abs(this.state.powerKeys.value)}</li>
									: null
								)}
								{(this.state.powerKeys.keys.length
									? <li className={styles['power-keys-item']}>{this.state.powerKeys.duration}</li>
									: null
								)}
							</div>
							<div className={styles['hidden-input']}>
								<input type="text" ref="hidden-input" onFocus={this._onFocus} />
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<input type="text" className="input" ref="datepicker-input" onFocus={this._onFocus} onClick={this._onFocus} value={this.state.selectedDate.format(this.state.displayFormat)} readOnly/>
				</div>
			);
		}

	}

});
