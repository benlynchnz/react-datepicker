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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _datepickerJsx = __webpack_require__(1);

	var _datepickerJsx2 = _interopRequireDefault(_datepickerJsx);

	// Polyfill CustomEvent for IE
	try {
		new CustomEvent("test");
	} catch (e) {
		var _CustomEvent = function _CustomEvent(event, params) {
			var evt = undefined;
			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};

			evt = document.createEvent("CustomEvent");
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		};

		_CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = _CustomEvent;
	}

	if (typeof document !== "undefined") {
		var renderToElements = document.getElementsByTagName("react-datepicker");

		Array.prototype.forEach.call(renderToElements, function (el) {
			React.render(React.createElement(_datepickerJsx2["default"], { element: el }), el);
		});
	}

	exports["default"] = _datepickerJsx2["default"];
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _componentsUtils = __webpack_require__(2);

	var _componentsUtils2 = _interopRequireDefault(_componentsUtils);

	var _componentsViewsSingleDateJsx = __webpack_require__(3);

	var _componentsViewsSingleDateJsx2 = _interopRequireDefault(_componentsViewsSingleDateJsx);

	var _componentsViewsDateRangeJsx = __webpack_require__(4);

	var _componentsViewsDateRangeJsx2 = _interopRequireDefault(_componentsViewsDateRangeJsx);

	var DatePickerView = (function (_React$Component) {
		function DatePickerView(props) {
			_classCallCheck(this, DatePickerView);

			_get(Object.getPrototypeOf(DatePickerView.prototype), 'constructor', this).call(this, props);
			this.state = { range: false };
			this._updateState = this._updateState.bind(this);
		}

		_inherits(DatePickerView, _React$Component);

		_createClass(DatePickerView, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				return _componentsUtils2['default'].componentDidMount(this);
			}
		}, {
			key: '_updateState',
			value: function _updateState(props) {
				if (props['range'] === 'true') {
					this.setState({ range: true });
				}
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.state.range) {
					return React.createElement(_componentsViewsDateRangeJsx2['default'], this.state);
				} else {
					return React.createElement(_componentsViewsSingleDateJsx2['default'], this.state);
				}
			}
		}]);

		return DatePickerView;
	})(React.Component);

	exports['default'] = DatePickerView;
	;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
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

	var keyMap = function keyMap(e) {

		var code = e.which,
		    SHIFT = e.shiftKey,
		    CTRL = e.ctrlKey,
		    DELETE = code === 8,
		    ADD = code === 187,
		    NUMPAD_ADD = code === 107,
		    NUMPAD_SUBTRACT = code === 109,
		    SUBTRACT = code === 189,
		    LEFT = code === 37,
		    RIGHT = code === 39,
		    UP = code === 38,
		    DOWN = code === 40,
		    ENTER = code === 13,
		    ESC = code === 27,
		    YEAR = SHIFT && CTRL,
		    MONTH = SHIFT && !CTRL,
		    DURATION_DAYS = code === 68,
		    DURATION_WEEKS = code === 87,
		    DURATION_MONTHS = code === 77,
		    DURATION_YEARS = code === 89,
		    ACTION_ADD = SHIFT && ADD || NUMPAD_ADD,
		    ACTION_SUBTRACT = SHIFT && SUBTRACT || NUMPAD_SUBTRACT,
		    ONE = code === 49 || code === 97,
		    TWO = code === 50 || code === 98,
		    THREE = code === 51 || code === 99,
		    FOUR = code === 52 || code === 100,
		    FIVE = code === 53 || code === 101,
		    SIX = code === 54 || code === 102,
		    SEVEN = code === 55 || code === 103,
		    EIGHT = code === 56 || code === 104,
		    NINE = code === 57 || code === 105,
		    ZERO = code === 96 || code === 48,
		    VALUE = null;

		if (ONE) {
			VALUE = 1;
		}

		if (TWO) {
			VALUE = 2;
		}

		if (THREE) {
			VALUE = 3;
		}

		if (FOUR) {
			VALUE = 4;
		}

		if (FIVE) {
			VALUE = 5;
		}

		if (SIX) {
			VALUE = 6;
		}

		if (SEVEN) {
			VALUE = 7;
		}

		if (EIGHT) {
			VALUE = 8;
		}

		if (NINE) {
			VALUE = 9;
		}

		if (ZERO) {
			VALUE = 0;
		}

		return {
			SHIFT: SHIFT,
			ADD: ADD,
			SUBTRACT: SUBTRACT,
			DELETE: DELETE,
			CTRL: CTRL,
			LEFT: LEFT,
			RIGHT: RIGHT,
			UP: UP,
			DOWN: DOWN,
			ENTER: ENTER,
			ESC: ESC,
			YEAR: YEAR,
			MONTH: MONTH,
			DURATION_DAYS: DURATION_DAYS,
			DURATION_WEEKS: DURATION_WEEKS,
			DURATION_MONTHS: DURATION_MONTHS,
			DURATION_YEARS: DURATION_YEARS,
			ACTION_ADD: ACTION_ADD,
			ACTION_SUBTRACT: ACTION_SUBTRACT,
			VALUE: VALUE
		};
	};

	utils.keyMap = keyMap;

	var END_OF_TODAY = moment().endOf('day');

	var last_x_days = function last_x_days(days) {
		return {
			from: moment().subtract(days, 'days').startOf('day'),
			to: END_OF_TODAY
		};
	};

	var last_x_period = function last_x_period(amount, period) {
		return {
			from: moment().subtract(amount, period).startOf(period),
			to: moment().subtract(amount, period).endOf(period)
		};
	};

	var convenienceDates = [{
		name: 'Last 7 days',
		dates: last_x_days(7)
	}, {
		name: 'Last 30 days',
		dates: last_x_days(30),
		'default': true
	}, {
		name: 'This week',
		dates: last_x_period(0, 'isoweek')
	}, {
		name: 'Last week',
		dates: last_x_period(1, 'week')
	}, {
		name: 'This month',
		dates: last_x_period(0, 'month')
	}, {
		name: 'Last month',
		dates: last_x_period(1, 'month')
	}, {
		name: 'This quarter',
		dates: last_x_period(0, 'quarter')
	}, {
		name: 'Last quarter',
		dates: last_x_period(1, 'quarter')
	}, {
		name: 'This year',
		dates: last_x_period(0, 'year')
	}, {
		name: 'Last year',
		dates: last_x_period(1, 'year')
	}, {
		name: 'Custom',
		dates: { from: null, to: null }
	}];

	utils.convenienceDates = convenienceDates;

	var componentDidMount = function componentDidMount(ctx) {
		var rootNode = React.findDOMNode(ctx),
		    hasNextProps = false,
		    nextProps = {},
		    parentNode = rootNode.parentNode;

		Object.keys(parentNode.attributes).forEach(function (key) {
			var namedNode = undefined;

			if (key !== 'length') {
				hasNextProps = true;
				namedNode = parentNode.attributes[key];
				nextProps[namedNode.name] = namedNode.value;
			}
		});

		if (hasNextProps) {
			ctx._updateState(nextProps);
		}

		ctx.setState({ element: ctx.props.element });
	};

	utils.componentDidMount = componentDidMount;

	var dispatch = function dispatch(ctx, action, payload) {
		var event = new CustomEvent('event', {
			'detail': { action: action, payload: payload }
		});

		ctx.props.element.dispatchEvent(event);
	};

	utils.dispatch = dispatch;

	exports['default'] = utils;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _store = __webpack_require__(5);

	var _store2 = _interopRequireDefault(_store);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(6);

	var _constants2 = _interopRequireDefault(_constants);

	var _CalendarJsx = __webpack_require__(7);

	var _CalendarJsx2 = _interopRequireDefault(_CalendarJsx);

	var DatePickerSingleView = (function (_React$Component) {
		function DatePickerSingleView(props) {
			_classCallCheck(this, DatePickerSingleView);

			_get(Object.getPrototypeOf(DatePickerSingleView.prototype), 'constructor', this).call(this, props);
			this.state = _store2['default'].getState();

			this._updateState = this._updateState.bind(this);
			this._onBlur = this._onBlur.bind(this);
			this._onFocus = this._onFocus.bind(this);
			this._onOk = this._onOk.bind(this);
			this._onUpdate = this._onUpdate.bind(this);
		}

		_inherits(DatePickerSingleView, _React$Component);

		_createClass(DatePickerSingleView, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				return _utils2['default'].componentDidMount(this);
			}
		}, {
			key: '_updateState',
			value: function _updateState(props) {
				if (props['display-format']) {
					this.setState({
						displayFormat: props['display-format']
					});
				}

				if (props['selected-date']) {
					var date = undefined;
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
			}
		}, {
			key: '_onBlur',
			value: function _onBlur() {
				this.setState({ show: false });
				_utils2['default'].dispatch(this, _constants2['default'].BLUR, JSON.stringify({ date: this.state.selectedDate }));
			}
		}, {
			key: '_onFocus',
			value: function _onFocus() {
				this.setState({ moveToDate: this.props.selectedDate });
				this.setState({ show: true });
			}
		}, {
			key: '_onUpdate',
			value: function _onUpdate(date) {
				this.setState({ selectedDate: date });
				_utils2['default'].dispatch(this, _constants2['default'].DATE_SELECTED, JSON.stringify({ date: date }));
			}
		}, {
			key: '_onOk',
			value: function _onOk() {
				this._onBlur();
			}
		}, {
			key: 'render',
			value: function render() {
				if (!this.state.show) {
					return React.createElement('input', {
						type: 'text',
						className: 'input',
						ref: 'datepicker-input',
						value: this.state.selectedDate.format(this.state.displayFormat),
						onClick: this._onFocus,
						onFocus: this._onFocus,
						readOnly: true });
				} else {
					return React.createElement(
						'div',
						null,
						React.createElement('input', {
							type: 'text',
							className: 'input',
							ref: 'datepicker-input',
							value: this.state.selectedDate.format(this.state.displayFormat),
							onClick: this._onFocus,
							onFocus: this._onFocus,
							readOnly: true }),
						React.createElement(_CalendarJsx2['default'], _extends({}, this.state, {
							onBlur: this._onBlur,
							onOK: this._onOk,
							onUpdate: this._onUpdate }))
					);
				}
			}
		}]);

		return DatePickerSingleView;
	})(React.Component);

	exports['default'] = DatePickerSingleView;
	;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _store = __webpack_require__(5);

	var _store2 = _interopRequireDefault(_store);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(6);

	var _constants2 = _interopRequireDefault(_constants);

	var _CalendarJsx = __webpack_require__(7);

	var _CalendarJsx2 = _interopRequireDefault(_CalendarJsx);

	var DatePickerRangeView = (function (_React$Component) {
		function DatePickerRangeView(props) {
			_classCallCheck(this, DatePickerRangeView);

			_get(Object.getPrototypeOf(DatePickerRangeView.prototype), 'constructor', this).call(this, props);
			this.state = _store2['default'].getState();

			this._updateState = this._updateState.bind(this);
			this._onBlur = this._onBlur.bind(this);
			this._onFocus = this._onFocus.bind(this);
			this._onUpdate = this._onUpdate.bind(this);
			this._onOk = this._onOk.bind(this);
			this._getConvenienceDatesAsHTML = this._getConvenienceDatesAsHTML.bind(this);
			this._onDateChange = this._onDateChange.bind(this);
		}

		_inherits(DatePickerRangeView, _React$Component);

		_createClass(DatePickerRangeView, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				return _utils2['default'].componentDidMount(this);
			}
		}, {
			key: '_updateState',
			value: function _updateState(props) {
				if (props['display-format']) {
					this.setState({
						displayFormat: props['display-format']
					});
				}

				if (props['default-range']) {
					var range = props['default-range'];
					this.setState({ selectedDateRange: _.findWhere(_store2['default'].getConvenienceDates(), { name: range }) });
				}

				if (props['selected-date']) {
					var date = undefined;
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
			}
		}, {
			key: '_onBlur',
			value: function _onBlur() {
				this.setState({ show: false });
				_utils2['default'].dispatch(this, _constants2['default'].BLUR, JSON.stringify(this.state.selectedDateRange));
			}
		}, {
			key: '_onFocus',
			value: function _onFocus(e) {
				var isFrom = e.target.getAttribute('data-range') === 'from' ? true : false;

				this.setState({
					isFrom: isFrom,
					moveToDate: this.props.selectedDate,
					range: true,
					show: true
				});

				_utils2['default'].dispatch(this, _constants2['default'].FOCUS);
			}
		}, {
			key: '_onUpdate',
			value: function _onUpdate(date) {
				var isFrom = this.state.isFrom,
				    customRange = _.findWhere(_store2['default'].getConvenienceDates(), { name: 'Custom' });

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

				this.refs['select'].getDOMNode().selectedIndex = _.findIndex(_store2['default'].getConvenienceDates(), { name: 'Custom' });
			}
		}, {
			key: '_onOk',
			value: function _onOk() {
				this._onBlur();
			}
		}, {
			key: '_getConvenienceDatesAsHTML',
			value: function _getConvenienceDatesAsHTML() {
				var _this = this;

				var dates = _store2['default'].getConvenienceDates(),
				    names = [];

				var itemDefault = function itemDefault(item) {
					if (item.name === _this.state.selectedDateRange.name) {
						return 'selected';
					}
				};

				dates.forEach(function (item) {
					names.push('<option value="' + item.name + '"' + itemDefault(item) + '>' + item.name + '</option>');
				});

				return { __html: names.join('') };
			}
		}, {
			key: '_onDateChange',
			value: function _onDateChange(e) {
				var value = e.target.options[e.target.selectedIndex].value,
				    ranges = _store2['default'].getConvenienceDates(),
				    selected = _.findWhere(ranges, { name: value });

				this.setState({ selectedDateRange: selected });
				_utils2['default'].dispatch(this, _constants2['default'].DATE_RANGE_CHANGE, JSON.stringify(selected));
			}
		}, {
			key: 'render',
			value: function render() {
				if (!this.state.show) {
					return React.createElement(
						'div',
						null,
						React.createElement('select', { dangerouslySetInnerHTML: this._getConvenienceDatesAsHTML(), onChange: this._onDateChange, ref: 'select' }),
						React.createElement('input', { type: 'text', className: 'input', ref: 'datepicker-input-from', 'data-range': 'from', value: this.state.selectedDateRange.dates.from.format(this.state.displayFormat), onFocus: this._onFocus, onClick: this._onFocus, readOnly: true }),
						React.createElement('input', { type: 'text', className: 'input', ref: 'datepicker-input-to', 'data-range': 'to', value: this.state.selectedDateRange.dates.to.format(this.state.displayFormat), onFocus: this._onFocus, onClick: this._onFocus, readOnly: true })
					);
				} else {
					return React.createElement(
						'div',
						null,
						React.createElement('select', { dangerouslySetInnerHTML: this._getConvenienceDatesAsHTML(), onChange: this._onDateChange, ref: 'select' }),
						React.createElement('input', { type: 'text', className: 'input', ref: 'datepicker-input-from', value: this.state.selectedDateRange.dates.from.format(this.state.displayFormat), onFocus: this._onFocus, onClick: this._onFocus, readOnly: true }),
						React.createElement('input', { type: 'text', className: 'input', ref: 'datepicker-input-to', value: this.state.selectedDateRange.dates.to.format(this.state.displayFormat), onFocus: this._onFocus, onClick: this._onFocus, readOnly: true }),
						React.createElement(_CalendarJsx2['default'], _extends({}, this.state, {
							onBlur: this._onBlur,
							onOK: this._onOk,
							onUpdate: this._onUpdate }))
					);
				}
			}
		}]);

		return DatePickerRangeView;
	})(React.Component);

	exports['default'] = DatePickerRangeView;
	;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _events = __webpack_require__(8);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _state = {
		selectedDate: moment().endOf('day'),
		fromDate: moment().endOf('day'),
		toDate: moment().endOf('day'),
		selectedDateRange: _.findWhere(_utils2['default'].convenienceDates, { 'default': true }),
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

	var CHANGE = 'CHANGE';

	var Store = (function (_EventEmitter) {
		function Store() {
			_classCallCheck(this, Store);

			if (_EventEmitter != null) {
				_EventEmitter.apply(this, arguments);
			}
		}

		_inherits(Store, _EventEmitter);

		_createClass(Store, [{
			key: 'getState',
			value: function getState() {
				return _state;
			}
		}, {
			key: 'getConvenienceDates',
			value: function getConvenienceDates() {
				return _utils2['default'].convenienceDates;
			}
		}, {
			key: 'emitChange',
			value: function emitChange() {
				this.emit(CHANGE);
			}
		}, {
			key: 'addChangeListener',
			value: function addChangeListener(cb) {
				this.on(CHANGE, cb);
			}
		}, {
			key: 'removeChangeListener',
			value: function removeChangeListener(cb) {
				this.removeListener(CHANGE, cb);
			}
		}]);

		return Store;
	})(_events.EventEmitter);

	var _Store = new Store();

	exports['default'] = _Store;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var constants = {
		FOCUS: "FOCUS",
		BLUR: "BLUR",
		OK: "OK",
		DATE_SELECTED: "DATE_SELECTED",
		DATE_RANGE_CHANGE: "DATE_RANGE_CHANGE",
		CALENDAR_HIDE: "CALENDAR_HIDE"
	};

	exports["default"] = constants;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _DatePickerStyleCss = __webpack_require__(9);

	var _DatePickerStyleCss2 = _interopRequireDefault(_DatePickerStyleCss);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var CalendarView = (function (_React$Component) {
		function CalendarView(props) {
			_classCallCheck(this, CalendarView);

			_get(Object.getPrototypeOf(CalendarView.prototype), 'constructor', this).call(this, props);
			this.state = this.props;

			this._createOverlay = this._createOverlay.bind(this);
			this._attachEvents = this._attachEvents.bind(this);
			this._removeOverlay = this._removeOverlay.bind(this);
			this._onBlur = this._onBlur.bind(this);
			this._onOkClick = this._onOkClick.bind(this);
			this._onDayClick = this._onDayClick.bind(this);
			this._onMonthClick = this._onMonthClick.bind(this);
			this._onYearClick = this._onYearClick.bind(this);
			this._getDate = this._getDate.bind(this);
			this._getCalendarDate = this._getCalendarDate.bind(this);
			this._getDaysInMonth = this._getDaysInMonth.bind(this);
			this._getFirstDayOfMonth = this._getFirstDayOfMonth.bind(this);
			this._getCellDate = this._getCellDate.bind(this);
			this._getCellDateAsISO = this._getCellDateAsISO.bind(this);
			this._getCellDateClass = this._getCellDateClass.bind(this);
		}

		_inherits(CalendarView, _React$Component);

		_createClass(CalendarView, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				if (this.props.range) {
					if (this.props.isFrom) {
						this.setState({ selectedDate: this.props.selectedDateRange.dates.from });
					} else {
						this.setState({ selectedDate: this.props.selectedDateRange.dates.to });
					}
				}
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var selectedDate = this.state.selectedDate.toISOString();

				this.setState({
					viewingDay: moment(selectedDate).endOf('day'),
					viewingMonth: moment(selectedDate).endOf('month'),
					viewingYear: moment(selectedDate).endOf('year')
				});

				this._createOverlay();
				this._attachEvents();
			}
		}, {
			key: '_attachEvents',
			value: function _attachEvents() {
				var _this = this;

				var input = this.refs['hidden-input'].getDOMNode();
				input.focus();

				var clickHandler = function clickHandler(e) {
					var lostFocus = e.target.classList.contains(_DatePickerStyleCss2['default'].modal);
					if (lostFocus) {
						document.removeEventListener('click', clickHandler);
						input.removeEventListener('keydown', keyUpHandler);
						_this._onBlur();
					} else {
						input.focus();
					}
				};

				var waitForKeys = false,
				    moveTo = this.state.selectedDate.toISOString();

				var keyUpHandler = function keyUpHandler(e) {

					var keyMap = _utils2['default'].keyMap(e),
					    duration = _this.state.powerKeys.duration,
					    direction = _this.state.powerKeys.direction,
					    moveTo = _this.state.selectedDate.toISOString(),
					    keys = _this.state.powerKeys.keys,
					    key = keyMap.KEY,
					    value = undefined;

					if (waitForKeys) {

						if (keyMap.ESC || keyMap.ENTER) {
							waitForKeys = false;
							_this.setState({
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
								_this.setState({ selectedDate: _this.state.moveToDate });
								_this.props.onUpdate(_this.state.selectedDate);
								e.preventDefault();
								e.stopPropagation();
							}

							if (keyMap.ESC) {
								_this.setState({ moveToDate: _this.state.selectedDate });
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

						if (value > 0 && direction === 'Subtract' || value < 0 && direction === 'Add') {
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

						_this.setState({
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

						var initPowerKeys = function initPowerKeys(subtract) {
							waitForKeys = true;
							_this.setState({
								powerKeys: {
									active: true,
									keys: [],
									direction: subtract ? 'Subtract' : 'Add',
									duration: _this.state.powerKeys.duration,
									style: { display: 'block' }
								}
							});
						};

						if (keyMap.ACTION_ADD || keyMap.ACTION_SUBTRACT) {
							initPowerKeys(keyMap.ACTION_SUBTRACT);
							return;
						}

						if (keyMap.LEFT || keyMap.RIGHT) {
							initPowerKeys(keyMap.LEFT);
							return;
						}

						if (keyMap.ENTER) {
							input.removeEventListener('keydown', keyUpHandler);
							_this._onOkClick();
							e.preventDefault();
							e.stopPropagation();
							return;
						}

						if (keyMap.ESC) {
							input.removeEventListener('keydown', keyUpHandler);
							_this._onBlur();
							return;
						}
					}
				};

				input.addEventListener('keydown', keyUpHandler);
				document.addEventListener('click', clickHandler);
			}
		}, {
			key: '_createOverlay',
			value: function _createOverlay() {
				if (!document.getElementById('overlay')) {
					var el = document.createElement('div');
					el.id = 'overlay';
					el.classList.add(_DatePickerStyleCss2['default'].overlay);
					document.body.appendChild(el);
				}
			}
		}, {
			key: '_removeOverlay',
			value: function _removeOverlay() {
				var el = document.getElementById('overlay');
				if (el) {
					el.outerHTML = '';
				}
			}
		}, {
			key: '_onBlur',
			value: function _onBlur() {
				this.props.onBlur();
				this._removeOverlay();
			}
		}, {
			key: '_onOkClick',
			value: function _onOkClick() {
				this.props.onOK();
				this._removeOverlay();
			}
		}, {
			key: '_onDayClick',
			value: function _onDayClick(e) {
				var day = Number(e.target.getAttribute('data-date').split('/')[2]),
				    month = this.state.viewingMonth.month(),
				    year = this.state.viewingYear.year(),
				    newDate = moment().year(year).month(month).date(day);

				this.props.onUpdate(newDate.endOf('day'));
				this.setState({
					selectedDate: newDate,
					moveToDate: newDate
				});
			}
		}, {
			key: '_onMonthClick',
			value: function _onMonthClick(e) {
				var moveBack = undefined,
				    update = undefined;

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
			}
		}, {
			key: '_onYearClick',
			value: function _onYearClick(e) {
				var moveBack = undefined,
				    update = undefined;

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
			}
		}, {
			key: '_getDate',
			value: function _getDate(type) {
				var format = undefined;

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
			}
		}, {
			key: '_getCalendarDate',
			value: function _getCalendarDate(type) {
				var format = undefined,
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
			}
		}, {
			key: '_getDaysInMonth',
			value: function _getDaysInMonth() {
				var days = [];

				for (var x = 0; x < this._getFirstDayOfMonth(); x++) {
					days.push('');
				}

				for (var x = 0; x < this.state.viewingMonth.daysInMonth(); x++) {
					days.push(this.state.viewingMonth.startOf('month').add(x, 'days').format('DD'));
				}

				return _.chunk(days, 7);
			}
		}, {
			key: '_getFirstDayOfMonth',
			value: function _getFirstDayOfMonth() {
				return Number(this.state.viewingMonth.startOf('month').format('d'));
			}
		}, {
			key: '_getCellDate',
			value: function _getCellDate(cell) {
				return this.state.viewingYear.year() + '/' + this.state.viewingMonth.format('MM') + '/' + cell;
			}
		}, {
			key: '_getCellDateAsISO',
			value: function _getCellDateAsISO(cell) {
				return moment(this._getCellDate(cell), 'YYYY/MM/DD');
			}
		}, {
			key: '_getCellDateClass',
			value: function _getCellDateClass(cell) {
				if (cell && this.state.selectedDate.format('YYYY/MM/DD') == this._getCellDate(cell)) {
					return _DatePickerStyleCss2['default'].selected;
				}

				if (cell && this.state.moveToDate && this.state.moveToDate.format('YYYY/MM/DD') == this._getCellDate(cell)) {
					return _DatePickerStyleCss2['default']['move-to'];
				}

				if (cell && this.state.today.format('YYYY/MM/DD') == this._getCellDate(cell)) {
					return _DatePickerStyleCss2['default'].today;
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				return React.createElement(
					'div',
					{ ref: 'wrapper' },
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
									Math.abs(this.state.powerKeys.value)
								) : null,
								this.state.powerKeys.keys.length ? React.createElement(
									'li',
									{ className: _DatePickerStyleCss2['default']['power-keys-item'] },
									this.state.powerKeys.duration
								) : null
							),
							React.createElement(
								'div',
								{ className: _DatePickerStyleCss2['default']['hidden-input'] },
								React.createElement('input', { type: 'text', ref: 'hidden-input', onFocus: this._onFocus })
							)
						)
					)
				);
			}
		}]);

		return CalendarView;
	})(React.Component);

	exports['default'] = CalendarView;
	;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin
	module.exports = {"overlay":"DatePickerStyle__overlay___2LzVe","modal":"DatePickerStyle__modal___1ErLw","fadeIn":"DatePickerStyle__fadeIn___pe3Rh","wrapper":"DatePickerStyle__wrapper___3Emxc","input":"DatePickerStyle__input___3oQ6t","hidden-input":"DatePickerStyle__hidden-input___2-B40","header":"DatePickerStyle__header___IS3_k","date":"DatePickerStyle__date___1vfXM","left":"DatePickerStyle__left___g_KzY","right":"DatePickerStyle__right___22ruE","hide":"DatePickerStyle__hide___13Weh","show":"DatePickerStyle__show___SZ3Ll","month":"DatePickerStyle__month___2gpUF","day":"DatePickerStyle__day___2hqAq","year":"DatePickerStyle__year___1n785","arrow-left":"DatePickerStyle__arrow-left___3mDM7","arrow-right":"DatePickerStyle__arrow-right___CB9Tp","table":"DatePickerStyle__table___4qAHf","selected":"DatePickerStyle__selected___j7zX0","move-to":"DatePickerStyle__move-to___jDGLn","today":"DatePickerStyle__today___C9UIO","footer":"DatePickerStyle__footer___2Blrk","buttons":"DatePickerStyle__buttons___1oDgg","btn":"DatePickerStyle__btn___3cSbl","power-keys":"DatePickerStyle__power-keys___10dk6","power-keys-item":"DatePickerStyle__power-keys-item___1frz9"};

/***/ }
/******/ ])
});
;