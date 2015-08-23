import styles from "../../DatePickerStyle.css";
import clock from "../../Clock.css";

export default class ClockView extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.props;

		this._createOverlay = this._createOverlay.bind(this);
		this._removeOverlay = this._removeOverlay.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._onOkClick = this._onOkClick.bind(this);
		this._getTime = this._getTime.bind(this);
		this._onHoursClick = this._onHoursClick.bind(this);
		this._onMinutesClick = this._onMinutesClick.bind(this);
		this._onPointClick = this._onPointClick.bind(this);
		this._onAMPMClick = this._onAMPMClick.bind(this);
	}

	componentDidMount() {
		this.setState({ viewingHours: true, viewingMinutes: false });

		this._createOverlay();
		this._attachEvents();
	}

	_attachEvents() {
		let clickHandler = (e) => {
			let lostFocus = e.target.classList.contains(styles.modal);
			if (lostFocus) {
				document.removeEventListener("click", clickHandler);
				this._onBlur();
			}
		};

		document.addEventListener("click", clickHandler);
	}

	_createOverlay() {
		if (!document.getElementById("overlay")) {
			let el = document.createElement("div");
			el.id = "overlay";
			el.classList.add(styles.overlay);
			document.body.appendChild(el);
		}
	}

	_removeOverlay() {
		let el = document.getElementById("overlay");
		if (el) {
			el.outerHTML = '';
		}
	}

	_onBlur() {
		this.props.onBlur();
		this._removeOverlay();
	}

	_onOkClick() {
		this.props.onOK();
		this._removeOverlay();
	}

	_getTime(format) {
		return this.state.selectedTime.format(format);
	}

	_onHoursClick() {
		this.setState({ viewingHours: true, viewingMinutes: false });
	}

	_onMinutesClick() {
		this.setState({ viewingHours: false, viewingMinutes: true });
	}

	_onAMPMClick(e) {
		let period = e.currentTarget.getAttribute("data-period"),
			currentPeriod = this.state.selectedTime.format("a");

		if (period !== currentPeriod) {
			this.setState({ selectedTime: this.state.selectedTime.subtract(12, "hours")});
		}
	}

	_onPointClick(e) {
		let point = e.currentTarget.getAttribute("data-point"),
			period = this.state.viewingHours ? "HH" : "mm";

		let isPM = this.state.selectedTime.format("a") === "pm" ? true : false;

		if (isPM && period === "HH") {
			point = Number(point) + 12;
			if (point === 24) {
				point = 12;
			}
		}

		if (!isPM && period === "HH" && point >= 12) {
			point = Number(point) - 12;
		}

		if (period === "HH") {
			this.setState({
				viewingHours: !this.state.viewingHours,
				viewingMinutes: !this.state.viewingMinutes,
				selectedTime: this.state.selectedTime.hours(point)
			});
		} else {
			this.setState({ selectedTime: this.state.selectedTime.minutes(point) });
		}
	}

	render() {
		let buildClockPoints = (period) => {
			let buildStyles = (point) => {
				let classes = clock["clock-face-point"];
				classes += " " + clock[period + point];

				if (period === "h" && (this._getTime("h") === point)) {
					classes += " " + clock.selected;
				}

				if (period === "m" && (this._getTime("mm") === point)) {
					classes += " " + clock.selected;
				}

				return classes;
			};

			let hours = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
				minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"],
				arr = hours;

			if (period === "m") {
				arr = minutes;
			}

			return arr.map((item, i) => {
				return (
					<div
						key={i}
						onClick={this._onPointClick}
						data-point={item}
						className={buildStyles(item)}>{item}
					</div>
				);
			});

		};

		let ampmClasses = (period) => {
			let classes = clock.ampm;

			if (this.state.selectedTime.format("a") === period) {
				classes += " " + clock.selected;
			}

			return classes;
		};

		return (
			<div ref="wrapper">
					<div className={styles.modal}>
					<div className={styles.wrapper} ref="wrapper">
						<div className={clock.header}>
							<ul className={clock.time}>
								<li
									className={this.state.viewingHours ? clock.selected : null} onClick={this._onHoursClick}>{this._getTime("h")}
								</li>
								<li className={clock.ignore}>:</li>
								<li
									className={this.state.viewingMinutes ? clock.selected : null} onClick={this._onMinutesClick}>{this._getTime("mm")}
								</li>
								<li className={clock.ampm}>
									<div className={ampmClasses("am")} data-period="am" onClick={this._onAMPMClick}>AM</div>
									<div className={ampmClasses("pm")} data-period="pm" 		onClick={this._onAMPMClick}>PM</div>
								</li>
							</ul>
						</div>
						<div className={clock.wrapper}>
							<div className={clock["clock-face"]}>
								{buildClockPoints(this.state.viewingHours ? "h" : "m")}
								<div className={clock.center}></div>
							</div>
						</div>

						<div className={styles.footer}>
							<div className={styles.buttons}>
								<button className={styles.btn} onClick={this._onBlur}>Cancel</button>
								{this.state.closeOnSelect ? null : (<button className={styles.btn} onClick={this._onOkClick}>OK</button>)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
