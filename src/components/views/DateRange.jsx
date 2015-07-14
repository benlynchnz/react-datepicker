import Store from "../store";
import utils from "../utils";
import Constants from "../constants";
import Calendar from "./Calendar.jsx";
import MenuItems from "./DateRangesMenuItems.jsx";
import styles from "../../DatePickerStyle.css";

export default class DatePickerRangeView extends React.Component {

	displayName: "datepicker-range"

	constructor(props) {
		super(props);
		this.state = Store.getState();

		this._updateState = this._updateState.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._onFocus = this._onFocus.bind(this);
		this._onUpdate = this._onUpdate.bind(this);
		this._onOk = this._onOk.bind(this);
		this._onDateChange = this._onDateChange.bind(this);
		this._onRangeChange = this._onRangeChange.bind(this);
	}

	componentDidMount() {
		this._onRangeChange();
		this.setState({ ready: false });
		return utils.componentDidMount(this);
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
			let opts = props["data-convenience-dates"].split(",");
			if (opts.length) {
				this.setState({
					convenienceDateOptions: opts
				});
			}
		}

		if (props["data-default-range"]) {
			let range = props["data-default-range"],
				rangeValues = _.findWhere(Store.getConvenienceDates(), { name: range });

			this.setState({ selectedDateRange: rangeValues });

			_.delay(() => {
				utils.dispatch(this, Constants.DATE_RANGE_CHANGE, JSON.stringify(rangeValues));
			}, 0);
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

		this.setState({
			fromDate: this.state.selectedDateRange.dates.from,
			toDate: this.state.selectedDateRange.dates.to
		});

		this.setState({ ready: true });
	}

	_onBlur() {
		this.setState({ show: false });
		utils.dispatch(this, Constants.BLUR, JSON.stringify(this.state.selectedDateRange));
	}

	_onFocus(e) {
		let isFrom = (e.target.getAttribute("data-range") === "from") ? true : false;

		this.setState({
			isFrom: isFrom,
			moveToDate: this.props.selectedDate,
			range: true,
			show: true
		});

		utils.dispatch(this, Constants.FOCUS);
	}

	_onUpdate(date) {
		let isFrom = this.state.isFrom,
			customRange = _.findWhere(Store.getConvenienceDates(), { name: "Custom" });

		customRange.dates = this.state.selectedDateRange.dates;

		if (isFrom) {
			customRange.dates.from = date.startOf("day");
			this.setState({
				fromDate: date.startOf("day"),
				selectedDateRange: customRange
			});
		} else {
			customRange.dates.to = date.endOf("day");
			this.setState({
				toDate: date.endOf("day"),
				selectedDateRange: customRange
			});
		}

		// this.refs['select'].getDOMNode().selectedIndex = _.findIndex(Store.getConvenienceDates(), { name: 'Custom' });
	}

	_onOk() {
		this._onBlur();
	}

	_onDateChange(range) {
		this.setState({ selectedDateRange: range });
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

		let defaultRange = _.findWhere(options, { name: this.state.selectedDateRange.name });

		if (this.state.ready) {
			return (
				<div className={styles["date-range-list"]}>
					<ul>
						<li className={styles["date-range-list-item"]}>
							<MenuItems element={this.props.element} default={defaultRange} ranges={options} />
						</li>
						<li className={styles["date-range-list-item"]}>
							<input type="text" style={this.state.hideInputs ? { display: "none"} : null} className={styles.input} ref="datepicker-input-from" data-range="from" value={moment(this.state.selectedDateRange.dates.from).format(this.state.displayFormat)} onFocus={this._onFocus} onClick={this._onFocus} />
						</li>
						<li className={styles["date-range-list-item"]}>
							<input type="text" style={this.state.hideInputs ? { display: "none"} : null} className={styles.input} ref="datepicker-input-to" data-range="to" value={moment(this.state.selectedDateRange.dates.to).format(this.state.displayFormat)} onFocus={this._onFocus} onClick={this._onFocus} />
						</li>
					</ul>
					{this.state.show ? (<Calendar {...this.state} onBlur={this._onBlur} onOK={this._onOk} onUpdate={this._onUpdate} />) : null}
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}
