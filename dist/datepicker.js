(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _datepickerJsx = __webpack_require__(1);

	var _datepickerJsx2 = _interopRequireDefault(_datepickerJsx);

	if (typeof document !== 'undefined') {
		var renderToElements = document.getElementsByTagName('react-datepicker');

		Array.prototype.forEach.call(renderToElements, function (el) {
			React.render(React.createElement(_datepickerJsx2['default'], { element: el }), el);
		});
	}

	exports['default'] = _datepickerJsx2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _DatePickerStyleCss = __webpack_require__(3);

	var _DatePickerStyleCss2 = _interopRequireDefault(_DatePickerStyleCss);

	var _utilsJs = __webpack_require__(2);

	var _utilsJs2 = _interopRequireDefault(_utilsJs);

	exports['default'] = React.createClass({

		displayName: 'datepicker-view',

		getInitialState: function getInitialState() {
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

		componentDidMount: function componentDidMount() {
			var rootNode = this.getDOMNode(),
			    hasNextProps = false,
			    nextProps = {},
			    parentNode = rootNode.parentNode;

			Object.keys(parentNode.attributes).forEach(function (key) {
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

		_handlePassedProps: function _handlePassedProps(props) {
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

		_onFocus: function _onFocus() {
			var _this = this;

			var clickHandler = function clickHandler(e) {
				console.log('click');
				var hasFocus = _utilsJs2['default'].closest(e.target, 'react-datepicker');
				if (!hasFocus) {
					document.removeEventListener('click', clickHandler);
					document.removeEventListener('keyup', keyPressHandler);
					_this._onBlur();
				}
			};

			var keyPressHandler = function keyPressHandler(e) {
				console.log(e.which);

				// ENTER
				if (e.which === 13) {
					document.removeEventListener('keyup', keyPressHandler);
					_this._onOkClick();
				}

				// ESC
				if (e.which === 27) {
					document.removeEventListener('keyup', keyPressHandler);
					_this._onBlur();
				}

				// back
				if (e.which === 37) {
					_this._handleKeyPress(-1);
				}

				// up
				if (e.which === 38) {
					_this._handleKeyPress(-7);
				}

				// forward
				if (e.which === 39) {
					_this._handleKeyPress(1);
				}

				// down
				if (e.which === 40) {
					_this._handleKeyPress(7);
				}
			};

			document.addEventListener('keyup', keyPressHandler);
			document.addEventListener('click', clickHandler);

			this._eventDispatcher('show');
			this.setState({ showPicker: true });
		},

		_onBlur: function _onBlur() {
			this._eventDispatcher('blur');
			this.setState({ showPicker: false });
		},

		_onOkClick: function _onOkClick() {
			this._eventDispatcher('ok', this.state.selectedDay);
			this._onBlur();
		},

		_eventDispatcher: function _eventDispatcher(type, data) {
			var event = new CustomEvent('eventStream', {
				'detail': {
					eventType: type,
					message: data
				}
			});

			this.props.element.dispatchEvent(event);
		},

		_getDate: function _getDate(type) {
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

		_getCalendarDate: function _getCalendarDate(type) {
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

		_handleKeyPress: function _handleKeyPress(move) {
			var day = Number(this._getDate('DAYOFMONTH')),
			    month = this.state.viewingMonth.month(),
			    year = this.state.viewingYear.year(),
			    e = document.getElementsByClassName(_DatePickerStyleCss2['default'].selected)[0],
			    moveTo = this.state.selectedDay.toISOString();

			if (moment(moveTo).add(move, 'days').isBetween(this.state.minDate, this.state.maxDate, 'day')) {
				this.setState({ selectedDay: this.state.selectedDay.add(move, 'days') });
				this._eventDispatcher('dateSelected', this.state.selectedDay);
			}
		},

		_onDayClick: function _onDayClick(e) {
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

		_onMonthClick: function _onMonthClick(e) {
			var moveBack = e.target.classList.contains(_DatePickerStyleCss2['default']['arrow-left']) ? true : false,
			    update;

			if (moveBack) {
				update = this.state.viewingMonth.subtract(1, 'month');
			} else {
				update = this.state.viewingMonth.add(1, 'month');
			}

			this.setState({ viewingMonth: update });
		},

		_onYearClick: function _onYearClick(e) {
			var moveBack = e.target.classList.contains(_DatePickerStyleCss2['default']['arrow-left']) ? true : false,
			    update;

			if (moveBack) {
				update = this.state.viewingYear.subtract(1, 'year');
			} else {
				update = this.state.viewingYear.add(1, 'year');
			}

			this.setState({ viewingYear: update });
		},

		_getDaysInMonth: function _getDaysInMonth() {
			var days = [];

			for (var x = 0; x < this._getFirstDayOfMonth(); x++) {
				days.push('');
			}

			for (var x = 0; x < this.state.viewingMonth.daysInMonth(); x++) {
				days.push(this.state.viewingMonth.startOf('month').add(x, 'days').format('DD'));
			}

			return _.chunk(days, 7);
		},

		_getFirstDayOfMonth: function _getFirstDayOfMonth() {
			return Number(this.state.viewingMonth.startOf('month').format('d'));
		},

		_getCellDate: function _getCellDate(cell) {
			return this.state.viewingYear.year() + '/' + this.state.viewingMonth.format('MM') + '/' + cell;
		},

		_getCellDateAsISO: function _getCellDateAsISO(cell) {
			return moment(this._getCellDate(cell), 'YYYY/MM/DD');
		},

		_isSelectedDay: function _isSelectedDay(cell) {
			if (cell && this.state.selectedDay.format('YYYY/MM/DD') == this._getCellDate(cell)) {
				return true;
			}
			return false;
		},

		render: function render() {
			var self = this;

			if (this.state.showPicker) {
				return React.createElement(
					'div',
					{ className: _DatePickerStyleCss2['default']['fade-in'] },
					React.createElement('input', { type: 'text', onFocus: self._onFocus }),
					React.createElement(
						'div',
						{ className: _DatePickerStyleCss2['default'].wrapper },
						React.createElement(
							'div',
							{ className: _DatePickerStyleCss2['default'].header },
							this._getDate('DAYOFWEEK')
						),
						React.createElement(
							'div',
							{ className: _DatePickerStyleCss2['default'].date },
							React.createElement(
								'div',
								{ className: _DatePickerStyleCss2['default'].month },
								React.createElement('span', { className: _DatePickerStyleCss2['default']['arrow-left'], onClick: this._onMonthClick }),
								this._getCalendarDate('MONTH'),
								React.createElement('span', { className: _DatePickerStyleCss2['default']['arrow-right'], onClick: this._onMonthClick })
							),
							React.createElement(
								'div',
								{ className: _DatePickerStyleCss2['default'].day },
								this._getDate('DAYOFMONTH')
							),
							React.createElement(
								'div',
								{ className: _DatePickerStyleCss2['default'].year },
								React.createElement('span', { className: _DatePickerStyleCss2['default']['arrow-left'], onClick: this._onYearClick }),
								this._getCalendarDate('YEAR'),
								React.createElement('span', { className: _DatePickerStyleCss2['default']['arrow-right'], onClick: this._onYearClick })
							)
						),
						React.createElement(
							'table',
							{ className: _DatePickerStyleCss2['default'].table },
							React.createElement(
								'thead',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement(
										'th',
										null,
										'S'
									),
									React.createElement(
										'th',
										null,
										'M'
									),
									React.createElement(
										'th',
										null,
										'T'
									),
									React.createElement(
										'th',
										null,
										'W'
									),
									React.createElement(
										'th',
										null,
										'T'
									),
									React.createElement(
										'th',
										null,
										'F'
									),
									React.createElement(
										'th',
										null,
										'S'
									)
								)
							),
							React.createElement(
								'tbody',
								null,
								this._getDaysInMonth().map(function (row, i) {
									return React.createElement(
										'tr',
										{ key: i },
										row.map(function (cell, j) {
											if (cell) {
												if (self._getCellDateAsISO(cell).isBetween(self.state.minDate, self.state.maxDate, 'day')) {
													return React.createElement(
														'td',
														{ key: j },
														React.createElement(
															'a',
															{
																'data-date': self._getCellDate(cell),
																className: self._isSelectedDay(cell) ? _DatePickerStyleCss2['default'].selected : null,
																onClick: self._onDayClick },
															cell
														)
													);
												} else {
													return React.createElement(
														'td',
														{ key: j },
														cell
													);
												}
											} else {
												return React.createElement('td', { key: j });
											}
										})
									);
								})
							)
						),
						React.createElement(
							'div',
							{ className: _DatePickerStyleCss2['default'].footer },
							React.createElement(
								'div',
								{ className: _DatePickerStyleCss2['default'].buttons },
								React.createElement(
									'button',
									{ className: _DatePickerStyleCss2['default'].btn, onClick: self._onBlur },
									'Cancel'
								),
								React.createElement(
									'button',
									{ className: _DatePickerStyleCss2['default'].btn, onClick: self._onOkClick },
									'OK'
								)
							)
						)
					)
				);
			} else {
				return React.createElement('input', { type: 'text', onFocus: self._onFocus });
			}
		}

	});
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var utils = {};

	function closest(elem, selector) {

	    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

	    while (elem) {
	        if (matchesSelector.bind(elem)(selector)) {
	            return true;
	        } else {
	            elem = elem.parentElement;
	        }
	    }
	    return false;
	}

	utils.closest = closest;

	exports["default"] = utils;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin
	module.exports = {"wrapper":"DatePickerStyle__wrapper___3Emxc","fadeIn":"DatePickerStyle__fadeIn___pe3Rh","fade-in":"DatePickerStyle__fade-in___1p2zN","header":"DatePickerStyle__header___IS3_k","date":"DatePickerStyle__date___1vfXM","left":"DatePickerStyle__left___g_KzY","right":"DatePickerStyle__right___22ruE","hide":"DatePickerStyle__hide___13Weh","show":"DatePickerStyle__show___SZ3Ll","month":"DatePickerStyle__month___2gpUF","day":"DatePickerStyle__day___2hqAq","year":"DatePickerStyle__year___1n785","arrow-left":"DatePickerStyle__arrow-left___3mDM7","arrow-right":"DatePickerStyle__arrow-right___CB9Tp","table":"DatePickerStyle__table___4qAHf","selected":"DatePickerStyle__selected___j7zX0","footer":"DatePickerStyle__footer___2Blrk","buttons":"DatePickerStyle__buttons___1oDgg","btn":"DatePickerStyle__btn___3cSbl"};

/***/ }
/******/ ])
});
;