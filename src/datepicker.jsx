import Store from "./components/store";
import Constants from "./components/constants";
import utils from "./components/utils";
import SingleDateView from "./components/views/SingleDate.jsx";
import DateRangeView from "./components/views/DateRange.jsx";
import TimePickerView from "./components/views/TimePicker.jsx";

export default class DatePickerView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { range: false, timepicker: false, passedDates: null };
		this._updateState = this._updateState.bind(this);
	}

	componentDidMount() {
		return utils.componentDidMount(this);
	}

	_updateState(props) {
		if (props["data-range"] === "true") {
			this.setState({ range: true });
		}

		if (props["data-time"] === "true") {
			this.setState({ timepicker: true });
		}

		if (props["data-dates"]) {
			let dates = props["data-dates"].split(","),
				from = moment(dates[0]),
				to = moment(dates[1]);

			let customRange = _.find(Store.getConvenienceDates(), { name: "Custom" });
			customRange.dates = {
				display: {
					from: from,
					to: to
				},
				query: {
					from: from,
					to: to
				}
			};

			this.setState({ passedDates: customRange });
			_.delay(() => {
				utils.dispatch(this, Constants.DATE_RANGE_DEFAULT, Store.buildOutput(customRange));
			}, 10);
		}

		if (props["data-default-range"] && !props["data-dates"]) {
			let range = props["data-default-range"],
				rangeValues = _.find(Store.getConvenienceDates(), { name: range });

			this.setState({
				defaultRange: rangeValues
			});

			_.delay(() => {
				utils.dispatch(this, Constants.DATE_RANGE_DEFAULT, Store.buildOutput(rangeValues));
			}, 10);
		}
	}

	render() {
		if (this.state.range) {
			return <DateRangeView {...this.state} element={this.props.element} default={this.state.defaultRange} passedDates={this.state.passedDates}/>;
		}

		if (this.state.timepicker) {
			return <TimePickerView {...this.state} element={this.props.element} />;
		}

		return <SingleDateView {...this.state} element={this.props.element} />;
	}
}
