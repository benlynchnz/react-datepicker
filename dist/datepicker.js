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
		var renderToElements = document.getElementsByTagName('eroad-datepicker');

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

	var _DatePickerStyleCss = __webpack_require__(2);

	var _DatePickerStyleCss2 = _interopRequireDefault(_DatePickerStyleCss);

	exports['default'] = React.createClass({

		displayName: 'datepicker-view',

		getInitialState: function getInitialState() {
			return {
				selectedDay: moment().endOf('day'),
				viewingDay: moment().endOf('day'),
				viewingMonth: moment().endOf('month'),
				viewingYear: moment().endOf('year'),
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
				this.setState({ selectedDay: moment(props['selected-day']).endOf('day') });
			}
		},

		_onFocus: function _onFocus() {
			this._eventDispatcher('show');
			this.setState({ showPicker: true });
		},

		_onCancelClick: function _onCancelClick() {
			this._eventDispatcher('close', this.state.selectedDay);
			this.setState({ showPicker: false });
		},

		_onOkClick: function _onOkClick() {
			this._eventDispatcher('close', this.state.selectedDay);
			this.setState({ showPicker: false });
		},

		_eventDispatcher: function _eventDispatcher(event, data) {
			var event = new CustomEvent(event, { 'detail': data });
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

		_onDayClick: function _onDayClick(e) {
			var day = Number(e.target.getAttribute('data-date').split('/')[2]),
			    month = this.state.viewingMonth.month(),
			    year = this.state.viewingYear.year();

			this.setState({
				selectedDay: this.state.selectedDay.year(year).month(month).date(day)
			});

			var els = document.getElementsByTagName('a');

			Array.prototype.forEach.call(els, function (item) {
				item.classList.remove(_DatePickerStyleCss2['default'].selected);
			});

			e.target.classList.add(_DatePickerStyleCss2['default'].selected);

			this._eventDispatcher('dateSelected', this.state.selectedDay);

			var closeOnSelect = this.props['close-on-select'];
			if (closeOnSelect === 'true') {
				this._onOkClick();
			}
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
			return '' + this.state.viewingYear.year() + '/' + this.state.viewingMonth.format('MM') + '/' + cell;
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
					null,
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
									{ onClick: self._onCancelClick },
									'Cancel'
								),
								React.createElement(
									'button',
									{ onClick: self._onOkClick },
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

	// removed by extract-text-webpack-plugin
	module.exports = {"wrapper":"DatePickerStyle__wrapper___3Emxc","header":"DatePickerStyle__header___IS3_k","date":"DatePickerStyle__date___1vfXM","left":"DatePickerStyle__left___g_KzY","right":"DatePickerStyle__right___22ruE","hide":"DatePickerStyle__hide___13Weh","show":"DatePickerStyle__show___SZ3Ll","month":"DatePickerStyle__month___2gpUF","day":"DatePickerStyle__day___2hqAq","year":"DatePickerStyle__year___1n785","arrow-left":"DatePickerStyle__arrow-left___3mDM7","arrow-right":"DatePickerStyle__arrow-right___CB9Tp","table":"DatePickerStyle__table___4qAHf","selected":"DatePickerStyle__selected___j7zX0","footer":"DatePickerStyle__footer___2Blrk","buttons":"DatePickerStyle__buttons___1oDgg"};

/***/ }
/******/ ])
});
;