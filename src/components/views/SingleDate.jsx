import styles from '../../DatePickerStyle.css';
import Store from '../store';
import Constants from '../constants';
import Calendar from './Calendar.jsx';

export default React.createClass({

	displayName: 'datepicker-single',

	getInitialState: () => {
		return Store.getState();
	},

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
		if (props['display-format']) {
			this.setState({
				displayFormat: props['display-format']
			});
		}

		if (props['selected-date']) {
			var date;
			if (props['selected-date-format']) {
				date = moment(props['selected-date'], props['selected-date-format']);
			} else {
				date = moment(props['selected-date']);
			}

			var viewing = date.toISOString();

			this.setState({
				selectedDate: date.endOf('day'),
				moveToDate: moment(viewing).endOf('day'),
				viewingMonth: moment(viewing).endOf('month'),
				viewingYear: moment(viewing).endOf('year')
			});
		}

		if (props['min-date']) {
			this.setState({
				minDate: moment(props['min-date'])
			});
		}

		if (props['max-date']) {
			this.setState({
				maxDate: moment(props['max-date'])
			});
		}

		if (props['close-on-select']) {
			this.setState({ closeOnSelect: true });
		}
	},

	_onBlur: function() {
		this.setState({ show: false });
		this._dispatch(Constants.BLUR, JSON.stringify({ date: this.state.selectedDate }));
	},

	_onFocus: function() {
		this.setState({ moveToDate: this.props.selectedDate });
		this.setState({ show: true });
	},

	_onUpdate: function(date) {
		this.setState({ selectedDate: date });
		this._dispatch(Constants.DATE_SELECTED, JSON.stringify({ date: date }));
	},

	_onOk: function() {
		this._onBlur();
	},

	_dispatch: function(action, payload) {
		var event = new CustomEvent('event', {
			'detail': {action, payload}
		});

		this.props.element.dispatchEvent(event);
	},

	render: function() {
		if (!this.state.show) {
			return (
				<input
					type="text"
					className="input"
					ref="datepicker-input"
					value={this.state.selectedDate.format(this.state.displayFormat)}
					onClick={this._onFocus}
					onFocus={this._onFocus}
					readOnly/>
			);
		} else {
			return (
				<div>
					<input
						type="text"
						className="input"
						ref="datepicker-input"
						value={this.state.selectedDate.format(this.state.displayFormat)}
						onClick={this._onFocus}
						onFocus={this._onFocus}
						readOnly/>
					<Calendar {...this.state}
						onBlur={this._onBlur}
						onOK={this._onOk}
						onUpdate={this._onUpdate} />
				</div>
			);
		}
	}

});
