let utils = {};

let closest = (elem, selector) => {

   let matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

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

let keyMap = (e) => {

	let code = e.which,
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
		ACTION_ADD = ((SHIFT && ADD) || NUMPAD_ADD),
		ACTION_SUBTRACT = ((SHIFT && SUBTRACT) || NUMPAD_SUBTRACT),
		ONE = (code === 49 || code === 97),
		TWO = (code === 50 || code === 98),
		THREE = (code === 51 || code === 99),
		FOUR = (code === 52 || code === 100),
		FIVE = (code === 53 || code === 101),
		SIX = (code === 54 || code === 102),
		SEVEN = (code === 55 || code === 103),
		EIGHT = (code === 56 || code === 104),
		NINE = (code === 57 || code === 105),
		ZERO = (code === 96 || code === 48),
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

let END_OF_TODAY = moment().endOf("day");

let last_x_days = (days) => {
	return {
		from: moment().subtract(days, "days").startOf("day"),
		to: moment()
	};
};

let yesterday = () => {
    return {
		from: moment().subtract(1, "days").startOf("day"),
		to: moment().subtract(1, "days").add(1, "days").startOf("day")
	};
};

let last_x_period = (amount, period) => {
    const from = moment().subtract(amount, period).startOf(period);
    const to = moment(from.toISOString()).add(amount, period).endOf(period);
	return {
		from: from,
		to: to
	};
};

let last_week = () => {
    return {
        from: moment().startOf('isoWeek').subtract(1, 'week'),
        to: moment().startOf('isoWeek')
    };
};

let convenienceDates = [
	{
		name: "Today",
		dates: last_x_days(0)
	},
    {
		name: "Yesterday",
		dates: yesterday()
	},
    {
		name: "Last 7 days",
		dates: last_x_days(7)
	},
	{
		name: "Last 30 days",
		dates: last_x_days(30),
		default: true
	},
	{
		name: "This week",
		dates: last_x_period(0, 'isoWeek')
	},
	{
		name: "Last week",
		dates: last_week()
	},
	{
		name: "This month",
		dates: last_x_period(0, 'month')
	},
	{
		name: "Last month",
		dates: last_x_period(1, 'month')
	},
	{
		name: "This quarter",
		dates: last_x_period(0, 'quarter')
	},
	{
		name: "Last quarter",
		dates: last_x_period(1, 'quarter')
	},
	{
		name: "This year",
		dates: last_x_period(0, 'year')
	},
	{
		name: "Last year",
		dates: last_x_period(1, 'year')
	},
	{
		name: "Custom",
		dates: last_x_days(0)
	}
];

utils.convenienceDates = convenienceDates;

let componentDidMount = (ctx) => {
    let rootNode = React.findDOMNode(ctx),
		hasNextProps = false,
		nextProps = {},
		parentNode = rootNode.parentNode;

	Object.keys(parentNode.attributes).forEach(function(key) {
		let namedNode;

		if (key !== "length") {
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

let dispatch = (ctx, action, payload) => {
    let event = new CustomEvent("event", {
        "detail": {action, payload}
    });

    ctx.props.element.dispatchEvent(event);
};

utils.dispatch = dispatch;

export default utils;
