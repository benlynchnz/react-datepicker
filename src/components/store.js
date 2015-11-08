import {EventEmitter} from "events";

let today = (isDisplay) => {
	return {
		from: moment().startOf("day"),
		to: moment().add(1, "day").startOf("day").subtract(isDisplay ? 1 : 0, "ms")
	};
};

let last_x_days = (days, isDisplay) => {
	return {
		from: moment().startOf("day").subtract(days, "days"),
		to: moment().startOf("day").subtract(isDisplay ? 1 : 0, "ms")
	};
};

let yesterday = (isDisplay) => {
    return {
		from: moment().subtract(1, "days").startOf("day"),
		to: moment().subtract(1, "days").add(1, "days").startOf("day").subtract(isDisplay ? 1 : 0, "ms")
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

let last_week = (isDisplay) => {
    return {
        from: moment().startOf('isoWeek').subtract(1, "week"),
        to: moment().startOf('isoWeek').subtract(isDisplay ? 1 : 0, "ms")
    };
};

let this_week = (isDisplay) => {
	const from = moment().startOf("isoWeek");
    return {
        from: from,
        to: moment(from.toISOString()).add(7, "days").startOf("day").subtract(isDisplay ? 1 : 0, "ms")
    };
};

let convenienceDates = [
	{
		name: "Today",
		period: "days",
		dates: {
			display: today(true),
			query: today()
		}
	},
    {
		name: "Yesterday",
		period: "days",
		dates: {
			display: yesterday(true),
			query: yesterday()
		}
	},
    {
		name: "Last 7 days",
		period: "days",
		dates: {
			display: last_x_days(7, true),
			query: last_x_days(7)
		}
	},
	{
		name: "Last 30 days",
		period: "days",
		dates: {
			display: last_x_days(30, true),
			query: last_x_days(30)
		},
		default: true
	},
	{
		name: "This week",
		period: "weeks",
		dates: {
			display: this_week(true),
			query: this_week()
		}
	},
	{
		name: "Last week",
		period: "weeks",
		dates: {
			display: last_week(true),
			query: last_week()
		}
	},
	{
		name: "This month",
		period: "months",
		dates: {
			display: last_x_period(0, "month", true),
			query: last_x_period(0, "month")
		}
	},
	{
		name: "Last month",
		period: "months",
		dates: {
			display: last_x_period(1, "month", true),
			query: last_x_period(1, "month")
		}
	},
	{
		name: "This quarter",
		period: "quarter",
		dates: {
			display: last_x_period(0, "quarter", true),
			query: last_x_period(0, "quarter")
		}
	},
	{
		name: "Last quarter",
		period: "quarter",
		dates: {
			display: last_x_period(1, "quarter", true),
			query: last_x_period(1, "quarter")
		}
	},
	{
		name: "This year",
		period: "years",
		dates: {
			display: last_x_period(0, "year", true),
			query: last_x_period(0, "year")
		}
	},
	{
		name: "Last year",
		period: "years",
		dates: {
			display: last_x_period(1, "year", true),
			query: last_x_period(1, "year")
		}
	},
	{
		name: "Custom",
		period: "days",
		dates: {
			display: today(true),
			query: today()
		}
	}
];

let round5 = (x) => {
	return Math.ceil(x / 5) * 5;
};

let _state = {
	selectedDate: moment().endOf("day"),
	selectedTime: moment().minutes(round5(moment().format("mm"))),
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
	moveDates: false,
	showRanges: true,
	timepicker: false,
	show: false,
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
		const display_from = moment(range.dates.display.from).toISOString();
		const display_to = moment(range.dates.display.to).toISOString();
		const query_from = moment(range.dates.query.from).toISOString();
		let query_to = moment(range.dates.query.to).toISOString();

		if (moment(query_to).format("SSS") !== "000") {
			query_to = moment(query_to).add(1, "ms").toISOString();
		}

		let payload = {
			dates: {
				display: {
					from: display_from,
					to: display_to
				},
				query: {
					from: query_from,
					to: query_to
				}
			},
			name: range.name,
			period: range.period,
			diff_in_days: moment(query_to).diff(moment(query_from), "days"),
			diff_in_hours: moment(query_to).diff(moment(query_from), "hours")
		};

		return JSON.stringify(payload);
	}

	getDifference(range) {
		let from = moment(range.dates.from),
			to = moment(range.dates.to);

		return to.diff(from, range.period);
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
