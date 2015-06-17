'use strict';

import styles from './DatePickerStyle.css';
import utils from './components/utils';
import Store from './components/store';
import Constants from './components/constants';

import SingleDateView from './components/views/SingleDate.jsx';
import DateRangeView from './components/views/DateRange.jsx';

export default React.createClass({

	displayName: 'datepicker-view',

	componentDidMount: function() {
		var rootNode = this.getDOMNode(),
			hasNextProps = false,
			nextProps = {},
			parentNode = rootNode.parentNode;

		Object.keys(parentNode.attributes).forEach(function(key) {
			var namedNode;

			if (key !== 'length') {
				hasNextProps = true;
				namedNode = parentNode.attributes[key];
				nextProps[namedNode.name] = namedNode.value;
			}
		});

		if (hasNextProps) {
			this._updateState(nextProps);
		}
	},

	_updateState: function(props) {
		if (props['range'] === 'true') {
			this.setState({ range: true });
		}

		this.setState({ element: this.props.element });
	},

	getInitialState: function () {
	    return {
	        range: false
	    };
	},

	render: function() {
		if (this.state.range) {
			return <DateRangeView {...this.state} />
		} else {
			return <SingleDateView {...this.state} />
		}
	}

});
