"use strict";

import Store from "../store";
import utils from "../utils";
import Constants from "../constants";
import Clock from "./Clock.jsx";
import styles from "../../DatePickerStyle.css";

export default class TimePickerView extends React.Component {

	constructor(props) {
		super(props);
		this.state = Store.getState();

		this._updateState = this._updateState.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._onFocus = this._onFocus.bind(this);
		this._onOk = this._onOk.bind(this);
		this._onUpdate = this._onUpdate.bind(this);
	}

	componentDidMount() {
		return utils.componentDidMount(this);
	}

	_updateState(props) {}

	_onBlur() {
		this.setState({ show: false });
		analytics.track("timepicker:hide", {
			selected_time: this.state.selectedTime.toISOString(),
			hours: this.state.selectedTime.format("h"),
			minutes: this.state.selectedTime.format("mm"),
			am_pm: this.state.selectedTime.format("a")
		});
		utils.dispatch(this, Constants.BLUR, JSON.stringify({ time: this.state.selectedTime }));
	}

	_onFocus() {
		//this.setState({ moveToDate: this.props.selectedDate });
		this.setState({ show: true });
	}

	_onUpdate(date) {
		//this.setState({ selectedDate: date });
		//utils.dispatch(this, Constants.DATE_SELECTED, JSON.stringify({ date: date }));
	}

	_onOk() {
		this._onBlur();
		utils.dispatch(this, Constants.OK, JSON.stringify({ time: this.state.selectedTime }));
	}

	render() {
		if (!this.state.show) {
			return (
				<div className={styles["input-group"]}>
					<input
						id={this.props.element.id + '-input'}
						type="text"
						className="input"
						ref="datepicker-input"
						value={this.state.selectedTime.format("h:mm a")}
						onClick={this._onFocus}
						onFocus={this._onFocus}
						readOnly/>
				</div>
			);
		} else {
			return (
				<div className={styles["input-group"]}>
					<input
						id={this.props.element.id + '-input'}
						type="text"
						className="input"
						ref="datepicker-input"
						value={this.state.selectedTime.format("h:mm a")}
						onClick={this._onFocus}
						onFocus={this._onFocus}
						readOnly/>
					<Clock {...this.state}
						onBlur={this._onBlur}
						onOK={this._onOk}
						onUpdate={this._onUpdate} />
				</div>
			);
		}
	}

};
