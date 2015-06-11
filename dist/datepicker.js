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

	var _DatePickerStyleCss = __webpack_require__(4);

	var _DatePickerStyleCss2 = _interopRequireDefault(_DatePickerStyleCss);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	exports['default'] = React.createClass({

		displayName: 'datepicker-view',

		getInitialState: function getInitialState() {
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

		_createOverlay: function _createOverlay() {
			if (!document.getElementById('overlay')) {
				var el = document.createElement('div');
				el.id = 'overlay';
				el.classList.add(_DatePickerStyleCss2['default'].overlay);
				document.body.appendChild(el);
			}
		},

		_removeOverlay: function _removeOverlay() {
			var el = document.getElementById('overlay');
			if (el) {
				el.outerHTML = '';
			}
		},

		_onFocus: function _onFocus(e) {
			var _this = this;

			// var wrapper = this.refs['wrapper'].getDOMNode();

			var clickHandler = function clickHandler(e) {
				var hasFocus = !e.target.classList.contains(_DatePickerStyleCss2['default'].modal) ? true : false;
				if (!hasFocus) {
					document.removeEventListener('click', clickHandler);
					// wrapper.removeEventListener('keyup', keyUpHandler);
					_this._onBlur();
				}
			};

			this._createOverlay();

			var waitForKeys = false,
			    moveTo = this.state.selectedDate.toISOString();

			var keyUpHandler = function keyUpHandler(e) {

				var SHIFT = e.shiftKey,
				    CTRL = e.ctrlKey,
				    DELETE = e.which === 8 ? true : false,
				    ADD = e.which === 187 ? true : false,
				    SUBTRACT = e.which === 189 ? true : false,
				    LEFT = e.which === 37 ? true : false,
				    RIGHT = e.which === 39 ? true : false,
				    UP = e.which === 38 ? true : false,
				    DOWN = e.which === 40 ? true : false,
				    ENTER = e.which === 13 ? true : false,
				    ESC = e.which === 27 ? true : false,
				    YEAR = SHIFT && CTRL ? true : false,
				    MONTH = SHIFT && !CTRL ? true : false;

				if (waitForKeys) {

					if (e.which !== 16) {

						if (ESC) {
							waitForKeys = false;
							_this.setState({
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
							_this.setState({
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
							_this._updateDate(_this.state.moveToDate);
							return;
						}

						var keys = _this.state.powerKeys.keys,
						    key = String.fromCharCode(e.which).toLowerCase(),
						    duration = _this.state.powerKeys.duration,
						    direction = _this.state.powerKeys.direction,
						    moveTo = _this.state.selectedDate.toISOString(),
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

						_this.setState({
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
					_this.setState({
						powerKeys: {
							active: true,
							keys: _this.state.powerKeys.keys,
							direction: 'Add',
							duration: _this.state.powerKeys.duration
						}
					});
					return;
				}

				if (SHIFT && SUBTRACT) {
					waitForKeys = true;
					_this.setState({
						powerKeys: {
							active: true,
							keys: _this.state.powerKeys.keys,
							direction: 'Subtract',
							duration: _this.state.powerKeys.duration
						}
					});
					return;
				}

				if (YEAR && LEFT) {
					_this._onYearClick(-1);
					return;
				}

				if (YEAR && RIGHT) {
					_this._onYearClick(1);
					return;
				}

				if (MONTH && LEFT) {
					_this._onMonthClick(-1);
					return;
				}

				if (MONTH && RIGHT) {
					_this._onMonthClick(1);
					return;
				}

				if (ENTER) {
					document.removeEventListener('keyup', keyUpHandler);
					_this._onOkClick();
					return;
				}

				if (ESC) {
					document.removeEventListener('keyup', keyUpHandler);
					_this._onBlur();
					return;
				}

				if (LEFT) {
					_this._handleKeyPress(-1);
					return;
				}

				if (UP) {
					_this._handleKeyPress(-7);
					return;
				}

				if (RIGHT) {
					_this._handleKeyPress(1);
					return;
				}

				if (DOWN) {
					_this._handleKeyPress(7);
					return;
				}
			};

			document.addEventListener('keyup', keyUpHandler);
			document.addEventListener('click', clickHandler);

			this._dispatch(_constants2['default'].FOCUS);
			this.setState({ show: true });
		},

		_onBlur: function _onBlur() {
			this._dispatch(_constants2['default'].BLUR);
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

		_onOkClick: function _onOkClick() {
			this._dispatch(_constants2['default'].OK);
			this._onBlur();
		},

		_dispatch: function _dispatch(action, payload) {
			var event = new CustomEvent('event', {
				'detail': { action: action, payload: payload }
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

			return this.state.selectedDate.format(format);
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
			var moveTo = this.state.selectedDate.toISOString();

			if (moment(moveTo).add(move, 'days').isBetween(this.state.minDate, this.state.maxDate, 'day')) {
				this._updateDate(this.state.selectedDate.add(move, 'days'));
			}
		},

		_updateDate: function _updateDate(date) {
			this.setState({ selectedDate: date });
			this.refs['datepicker-input'].getDOMNode().value = this.state.selectedDate.format(this.state.displayFormat);
			this._dispatch(_constants2['default'].DATE_SELECTED, JSON.stringify({ date: this.state.selectedDate.toISOString() }));
		},

		_onDayClick: function _onDayClick(e) {
			var day = Number(e.target.getAttribute('data-date').split('/')[2]),
			    month = this.state.viewingMonth.month(),
			    year = this.state.viewingYear.year();

			this._updateDate(this.state.selectedDate.year(year).month(month).date(day));

			if (this.state.closeOnSelect) {
				this._onOkClick();
			}
		},

		_onMonthClick: function _onMonthClick(e) {
			var moveBack, update;

			if (e.target) {
				moveBack = e.target.classList.contains(_DatePickerStyleCss2['default']['arrow-left']) ? true : false;
			} else {
				moveBack = e === -1 ? true : false;
			}

			if (moveBack) {
				update = this.state.viewingMonth.subtract(1, 'month');
			} else {
				update = this.state.viewingMonth.add(1, 'month');
			}

			this.setState({ viewingMonth: update });
		},

		_onYearClick: function _onYearClick(e) {
			var moveBack, update;

			if (e.target) {
				moveBack = e.target.classList.contains(_DatePickerStyleCss2['default']['arrow-left']) ? true : false;
			} else {
				moveBack = e === -1 ? true : false;
			}

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

		_getCellDateClass: function _getCellDateClass(cell) {
			if (cell && this.state.selectedDate.format('YYYY/MM/DD') == this._getCellDate(cell)) {
				return _DatePickerStyleCss2['default'].selected;
			}

			if (cell && this.state.moveToDate && this.state.moveToDate.format('YYYY/MM/DD') == this._getCellDate(cell)) {
				return _DatePickerStyleCss2['default']['move-to'];
			}

			if (cell && this.state.today.format('YYYY/MM/DD') == this._getCellDate(cell)) {
				return _DatePickerStyleCss2['default'].today;
			}
		},

		render: function render() {
			var _this2 = this;

			if (this.state.show) {
				return React.createElement(
					'div',
					{ ref: 'wrapper' },
					React.createElement('input', { type: 'text', ref: 'datepicker-input', className: 'input', onFocus: this._onFocus, value: this.state.selectedDate.format(this.state.displayFormat) }),
					React.createElement(
						'div',
						{ className: _DatePickerStyleCss2['default'].modal },
						React.createElement(
							'div',
							{ className: _DatePickerStyleCss2['default'].wrapper, ref: 'wrapper' },
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
													if (_this2._getCellDateAsISO(cell).isBetween(_this2.state.minDate, _this2.state.maxDate, 'day')) {
														return React.createElement(
															'td',
															{ key: j },
															React.createElement(
																'a',
																{
																	'data-date': _this2._getCellDate(cell),
																	className: _this2._getCellDateClass(cell),
																	onClick: _this2._onDayClick },
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
										{ className: _DatePickerStyleCss2['default'].btn, onClick: this._onBlur },
										'Cancel'
									),
									React.createElement(
										'button',
										{ className: _DatePickerStyleCss2['default'].btn, onClick: this._onOkClick },
										'OK'
									)
								)
							),
							React.createElement(
								'div',
								{ className: _DatePickerStyleCss2['default']['power-keys'], style: this.state.powerKeys.style },
								React.createElement(
									'li',
									{ className: _DatePickerStyleCss2['default']['power-keys-item'] },
									this.state.powerKeys.direction
								),
								this.state.powerKeys.keys.length ? React.createElement(
									'li',
									{ className: _DatePickerStyleCss2['default']['power-keys-item'] },
									this.state.powerKeys.keys
								) : null,
								this.state.powerKeys.keys.length ? React.createElement(
									'li',
									{ className: _DatePickerStyleCss2['default']['power-keys-item'] },
									this.state.powerKeys.duration
								) : null
							)
						)
					)
				);
			} else {
				return React.createElement(
					'div',
					null,
					React.createElement('input', { type: 'text', className: 'input', ref: 'datepicker-input', onFocus: this._onFocus, value: this.state.selectedDate.format(this.state.displayFormat), readOnly: true })
				);
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

	var closest = function closest(elem, selector) {

	    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

	    while (elem) {
	        if (matchesSelector.bind(elem)(selector)) {
	            return true;
	        } else {
	            elem = elem.parentElement;
	        }
	    }
	    return false;
	};

	utils.closest = closest;

	exports["default"] = utils;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var constants = {
		FOCUS: "FOCUS",
		BLUR: "BLUR",
		OK: "OK",
		DATE_SELECTED: "DATE_SELECTED"
	};

	exports["default"] = constants;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin
	module.exports = {"overlay":"DatePickerStyle__overlay___2LzVe","modal":"DatePickerStyle__modal___1ErLw","fadeIn":"DatePickerStyle__fadeIn___pe3Rh","wrapper":"DatePickerStyle__wrapper___3Emxc","input":"DatePickerStyle__input___3oQ6t","header":"DatePickerStyle__header___IS3_k","date":"DatePickerStyle__date___1vfXM","left":"DatePickerStyle__left___g_KzY","right":"DatePickerStyle__right___22ruE","hide":"DatePickerStyle__hide___13Weh","show":"DatePickerStyle__show___SZ3Ll","month":"DatePickerStyle__month___2gpUF","day":"DatePickerStyle__day___2hqAq","year":"DatePickerStyle__year___1n785","arrow-left":"DatePickerStyle__arrow-left___3mDM7","arrow-right":"DatePickerStyle__arrow-right___CB9Tp","table":"DatePickerStyle__table___4qAHf","selected":"DatePickerStyle__selected___j7zX0","move-to":"DatePickerStyle__move-to___jDGLn","today":"DatePickerStyle__today___C9UIO","footer":"DatePickerStyle__footer___2Blrk","buttons":"DatePickerStyle__buttons___1oDgg","btn":"DatePickerStyle__btn___3cSbl","power-keys":"DatePickerStyle__power-keys___10dk6","power-keys-item":"DatePickerStyle__power-keys-item___1frz9"};

/***/ }
/******/ ])
});
;