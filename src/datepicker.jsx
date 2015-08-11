import Store from "./components/store";
import Constants from "./components/constants";
import utils from "./components/utils";
import SingleDateView from "./components/views/SingleDate.jsx";
import DateRangeView from "./components/views/DateRange.jsx";

export default class DatePickerView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { range: false };
		this._updateState = this._updateState.bind(this);
	}

	componentDidMount() {
		return utils.componentDidMount(this);
	}

	_updateState(props) {
		if (props["data-range"] === "true") {
			this.setState({ range: true });
		}

		if (props["data-default-range"]) {
			let range = props["data-default-range"],
				rangeValues = _.findWhere(Store.getConvenienceDates(), { name: range });

			this.setState({
				defaultRange: rangeValues
			});

			_.delay(() => {
				utils.dispatch(this, Constants.DATE_RANGE_DEFAULT, Store.buildOutput(rangeValues));
			}, 0);
		}
	}

	render() {
		if (this.state.range) {
			return <DateRangeView {...this.state} element={this.props.element} default={this.state.defaultRange} />;
		}

		return <SingleDateView {...this.state} element={this.props.element} />;
	}
}
