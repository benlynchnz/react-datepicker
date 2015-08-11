import {EventEmitter} from "events";

let today = () => {
	return {
		from: moment().startOf("day"),
		to: moment().add(1, "day").startOf("day")
	};
};

let last_x_days = (days) => {
	return {
		from: moment().subtract(days, "days").startOf("day"),
		to: moment().subtract(days, "days").startOf("day").add(days, "days")
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
    const to = moment(from.toISOString()).endOf(period).add(1, "ms");
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

let this_week = () => {
	const from = moment().startOf("isoWeek");
    return {
        from: from,
        to: moment(from.toISOString()).add(7, "days").startOf("day")
    };
};

let convenienceDates = [
	{
		name: "Today",
		period: "days",
		dates: today()
	},
    {
		name: "Yesterday",
		period: "days",
		dates: yesterday()
	},
    {
		name: "Last 7 days",
		period: "days",
		dates: last_x_days(7)
	},
	{
		name: "Last 30 days",
		period: "days",
		dates: last_x_days(30),
		default: true
	},
	{
		name: "This week",
		period: "weeks",
		dates: this_week()
	},
	{
		name: "Last week",
		period: "weeks",
		dates: last_week()
	},
	{
		name: "This month",
		period: "months",
		dates: last_x_period(0, 'month')
	},
	{
		name: "Last month",
		period: "months",
		dates: last_x_period(1, 'month')
	},
	{
		name: "This quarter",
		period: "quarter",
		dates: last_x_period(0, 'quarter')
	},
	{
		name: "Last quarter",
		period: "quarter",
		dates: last_x_period(1, 'quarter')
	},
	{
		name: "This year",
		period: "years",
		dates: last_x_period(0, 'year')
	},
	{
		name: "Last year",
		period: "years",
		dates: last_x_period(1, 'year')
	},
	{
		name: "Custom",
		period: "days",
		dates: today()
	}
];

let _state = {
	selectedDate: moment().endOf("day"),
	fromDate: moment().endOf("day"),
	toDate: moment().endOf("day"),
	selectedDateRange: _.findWhere(convenienceDates, { default: true }),
	convenienceDateOptions: [],
	moveToDate: moment().endOf("day"),
	today: moment().endOf("day"),
	viewingDay: moment().endOf("day"),
	viewingMonth: moment().endOf("month"),
	viewingYear: moment().endOf("year"),
	minDate: moment().subtract(999, "years"),
	maxDate: moment().add(999, "years"),
	displayFormat: "DD MMM YYYY",
	closeOnSelect: false,
	daysOfWeek: ["M", "T", "W", "T", "F", "S", "S"],
	firstDayOfWeek: 1,
	show: false,
	zone: {
		org: null,
		device: jstz.determine().name()
	},
	powerKeys: {
		active: false,
		direction: null,
		keys: [],
		value: 0,
		duration: "Days",
		style: {
			display: "none"
		}
	}
};

const CHANGE = "CHANGE";

class Store extends EventEmitter {

	getState() {
		return _state;
	}

	getConvenienceDates() {
		return convenienceDates;
	}

	buildOutput(range) {
		let from = moment(range.dates.from),
			to = moment(range.dates.to);

		let payload = {
			dates: {
				from: from.toISOString(),
				to: to.toISOString()
			},
			name: range.name,
			period: range.period,
			diff_in_days: to.diff(from, "days")
		};

		return JSON.stringify(payload);
	}

	getDifference(range) {
		let from = moment(range.dates.from),
			to = moment(range.dates.to);

		return to.diff(from, range.period);
	}

	getTimezone() {
		return _state.zone.org;
	}

	emitChange() {
		this.emit(CHANGE);
	}

	addChangeListener(cb) {
		this.on(CHANGE, cb);
	}

	removeChangeListener(cb) {
		this.removeListener(CHANGE, cb);
	}
}

let _Store = new Store();

export default _Store;
