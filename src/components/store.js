import {EventEmitter} from "events";

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
    const to = moment(from.toISOString()).endOf(period);
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
    return {
        from: moment().startOf('isoWeek'),
        to: moment().add(6, "days").startOf("day")
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
		dates: this_week()//last_x_period(0, 'isoWeek')
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

	setTimezone(zone) {
		moment.tz.setDefault(zone);
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
