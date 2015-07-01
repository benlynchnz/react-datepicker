'use strict';

import utils from './components/utils';
import SingleDateView from './components/views/SingleDate.jsx';
import DateRangeView from './components/views/DateRange.jsx';

export default class DatePickerView extends React.Component {

	displayName: 'datepicker-view'

	constructor(props) {
		super(props);
		this.state = { range: false };
		this._updateState = this._updateState.bind(this);
	}

	componentDidMount() {
		return utils.componentDidMount(this);
	}

	_updateState(props) {
		if (props['data-range'] === 'true') {
			this.setState({ range: true });
		}
	}

	render() {
		if (this.state.range) {
			return <DateRangeView {...this.state} element={this.props.element} />
		}

		return <SingleDateView {...this.state} element={this.props.element} />
	}
};
