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

	componentWillMount() {
		let attributes = this.props.element.attributes;

		Object.keys(attributes).forEach((key) => {
			let namedNode;

			if (key !== "length") {
				namedNode = attributes[key];
				if (namedNode.name === "data-org-timezone") {
					this.setState({ org_zone: namedNode.value });
					Store.setTimezone(namedNode.value);
				}
			}
		});

		_.delay(() => {
			utils.dispatch(this, Constants.INIT, JSON.stringify({
				utc_offset: moment().utcOffset(),
				device_zone: jstz.determine().name(),
				organization_zone: this.state.org_zone
			}));
		}, 0);
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
				utils.dispatch(this, Constants.DATE_RANGE_DEFAULT, JSON.stringify(rangeValues));
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
