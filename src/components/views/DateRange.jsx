import Store from "../store";
import utils from "../utils";
import Constants from "../constants";
import Calendar from "./Calendar.jsx";
import MenuItems from "./DateRangesMenuItems.jsx";
import styles from "../../DatePickerStyle.css";

export default class DatePickerRangeView extends React.Component {

	constructor(props) {
		super(props);
		this.state = Store.getState();

		if (props.defaultRange) {
			this.state.selectedDateRange = props.defaultRange;
		}

		if (props.passedDates) {
			this.state.selectedDateRange = props.passedDates;
		}

		this._updateState = this._updateState.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._onFocus = this._onFocus.bind(this);
		this._onUpdate = this._onUpdate.bind(this);
		this._onOk = this._onOk.bind(this);
		this._onDateChange = this._onDateChange.bind(this);
		this._onRangeChange = this._onRangeChange.bind(this);
		this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);
		this._onArrowClick = this._onArrowClick.bind(this);
	}

	componentWillMount() {
		Store.addChangeListener(this._onChange.bind(this));
	}

	componentDidMount() {
		this._onRangeChange();
		this.setState({ ready: false });
		return utils.componentDidMount(this);
	}

	_onChange() {
		this.setState({ reload: true });
	}

	_onRangeChange() {
		let el = document.getElementById(this.props.element.id);

		let handler = (e) => {
			let action = e.detail.action;
			if (action === Constants.DATE_RANGE_CHANGE) {
				this._onDateChange(JSON.parse(e.detail.payload));
			}
		};

		el.addEventListener("event", handler);
	}

	_updateState(props) {
		if (props["data-display-format"]) {
			this.setState({
				displayFormat: props["data-display-format"]
			});
		}

		if (props["data-convenience-dates"]) {
			let opts = props["data-convenience-dates"].split(",").map((item) => {
				return item.trim();
			});
			if (opts.length) {
				this.setState({
					convenienceDateOptions: opts
				});
			}
		}

		if (props["data-selected-date"]) {
			let date;
			if (props["data-selected-date-format"]) {
				date = moment(props["data-selected-date"], props["data-selected-date-format"]);
			} else {
				date = moment(props["data-selected-date"]);
			}

			let viewing = date.toISOString();

			this.setState({
				selectedDate: date.endOf("day"),
				moveToDate: moment(viewing).endOf("day"),
				viewingMonth: moment(viewing).endOf("month"),
				viewingYear: moment(viewing).endOf("year")
			});
		}

		if (props["data-min-date"]) {
			this.setState({
				minDate: moment(props["data-min-date"])
			});
		}

		if (props["data-max-date"]) {
			this.setState({
				maxDate: moment(props["data-max-date"])
			});
		}

		if (props["data-close-on-select"]) {
			this.setState({ closeOnSelect: true });
		}

		if (props["data-hide-inputs"]) {
			this.setState({ hideInputs: true });
		}

		if (props["data-layout-vertical"]) {
			this.setState({ layoutVertical: true });
		}

		if (props["data-submit-btn"]) {
			this.setState({ hasSubmitBtn: true });
		}

		if (props["data-move-dates"]) {
			this.setState({ moveDates: true });
		}

		if (props["data-hide-ranges"]) {
			this.setState({ showRanges: false });
		}

		if (props["data-first-day-of-week"]) {
			let day = Number(props["data-first-day-of-week"]);

			this.setState({
				firstDayOfWeek: day,
				daysOfWeek: day === 0 ? ["S", "M", "T", "W", "T", "F", "S"] : ["M", "T", "W", "T", "F", "S", "S"]
			});
		}

		this.setState({
			fromDate: this.state.selectedDateRange.dates.display.from,
			toDate: this.state.selectedDateRange.dates.display.to
		});

		this.setState({ ready: true });
	}

	_onBlur() {
		this.setState({ show: false });
	}

	_onFocus(e) {
		let isFrom = (e.target.getAttribute("data-range") === "from");

		this.setState({
			isFrom: isFrom,
			moveToDate: this.props.selectedDate,
			range: true,
			show: true
		});
	}

	_onUpdate(date) {
		const isFrom = this.state.isFrom;
		const currStartDate = this.state.fromDate;
		const currEndDate = this.state.toDate;

		let customRange = {
			name: "Custom",
			period: "days",
			dates: {
				query: {
					from: isFrom ? date.startOf("day") : currStartDate,
					to: isFrom ? currEndDate : date.endOf("day")
				},
				display: {
					from: isFrom ? date.startOf("day") : currStartDate,
					to: isFrom ? currEndDate : date.endOf("day")
				}
			}
		};

		if (isFrom) {
			this.setState({
				fromDate: date.startOf("day"),
				selectedDateRange: customRange
			});
		} else {
			this.setState({
				toDate: date.endOf("day"),
				selectedDateRange: customRange
			});
		}

		this.setState({ selectedDateRange: customRange });
		utils.dispatch(this, Constants.DATE_RANGE_CHANGE, Store.buildOutput(customRange));
	}

	_onOk() {
		this._onBlur();
	}

	_onDateChange(range) {
		this.setState({ selectedDateRange: range });
	}

	_onSubmitBtnClick() {
		utils.dispatch(this, Constants.SUBMIT_CLICK, Store.buildOutput(this.state.selectedDateRange));
	}

	_onArrowClick(e) {
		let moveTo,
			direction = e.currentTarget.getAttribute("data-direction"),
			diff = 1,
			period = this.state.selectedDateRange.period,
			from = moment(this.state.selectedDateRange.dates.display.from).toISOString(),
			to = moment(this.state.selectedDateRange.dates.display.to).toISOString();

		if (direction === "forward") {
			diff = diff * -1;
		}

		if (period === "months" || period === "years" || period === "quarter") {
			moveTo = moment(from).subtract(diff, period).endOf(period);
		} else {
			moveTo = moment(to).subtract(diff, period);
		}

		let newRange = {
			name: "Custom",
			period: period,
			dates: {
				query: {
					from: moment(from).subtract(diff, period).add(1, "ms"),
					to: moveTo.add(1, "ms")
				},
				display: {
					from: moment(from).subtract(diff, period),
					to: moveTo
				}
			}
		};

		this.setState({
			fromDate: moment(from).subtract(diff, period),
			toDate: moveTo,
			selectedDateRange: newRange
		});

		utils.dispatch(this, Constants.ARROW_CLICK, Store.buildOutput(newRange));
	}

	render() {
		let ranges = Store.getConvenienceDates(),
			options = [];

		if (this.state.convenienceDateOptions.length) {
			this.state.convenienceDateOptions.forEach((item) => {
				let range = _.findWhere(ranges, { name: item });
				if (range) {
					options.push(range);
				}
			});
		} else {
			options = ranges;
		}

		let btnLayoutStyle = () => {
			let classes = styles["date-range-list-item"];

			classes += " " + styles["date-range-list-item-btn"];

			if (this.state.layoutVertical) {
				classes += " " + styles["date-range-layout-vertical"];
			}

			return classes;
		};

		let layoutStyle = () => {
			let classes = styles["date-range-list-item"];

			if (this.state.layoutVertical) {
				classes += " " + styles["date-range-layout-vertical"];
			}

			return classes;
		};

		let layoutWrapper = () => {
			let classes = styles["date-range-list"];

			if (this.state.layoutVertical) {
				classes += " " + styles["date-range-slim"];
			}

			return classes;
		};

		if (this.state.ready) {
			return (
				<div className={layoutWrapper()}>
					<ul>

						{this.state.showRanges ? (
							<li className={layoutStyle()}>
								<MenuItems element={this.props.element} ranges={options} selected={this.state.selectedDateRange} />
							</li>
						) : null }

						<li className={layoutStyle()}>
							<input type="text" data-automationid="start-date-input" style={this.state.hideInputs ? { display: "none"} : null} className={styles.input} ref="datepicker-input-from" data-range="from" value={moment(this.state.selectedDateRange.dates.display.from).format(this.state.displayFormat)} onFocus={this._onFocus} onClick={this._onFocus} readOnly />
						</li>
						<li className={layoutStyle()}>
							<input type="text" data-automationid="end-date-input" style={this.state.hideInputs ? { display: "none"} : null} className={styles.input} ref="datepicker-input-to" data-range="to" value={moment(this.state.selectedDateRange.dates.display.to).format(this.state.displayFormat)} onFocus={this._onFocus} onClick={this._onFocus} readOnly />
						</li>

						{this.state.moveDates ? (
							<div>
								<li className={btnLayoutStyle()} data-direction="back" onClick={this._onArrowClick}>
									<i className="material-icons">keyboard_arrow_left</i>
								</li>

								<li className={btnLayoutStyle()} data-direction="forward" onClick={this._onArrowClick}>
									<i className="material-icons">keyboard_arrow_right</i>
								</li>
							</div>
						) : null }

						{this.state.hasSubmitBtn ? (
							<li className={layoutStyle()}>
								<button className={styles["submit-btn"]} onClick={this._onSubmitBtnClick}>Submit</button>
							</li>
						) : null}
					</ul>
					{this.state.show ? (
						<Calendar {...this.state} onBlur={this._onBlur} onOK={this._onOk} onUpdate={this._onUpdate} />
					) : null}
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}
