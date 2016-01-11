import styles from "../../DatePickerStyle.css";
import utils from "../utils";
import Constants from "../constants";

export default class CalendarView extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.props;

		this._createOverlay = this._createOverlay.bind(this);
		this._attachEvents = this._attachEvents.bind(this);
		this._removeOverlay = this._removeOverlay.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._onOkClick = this._onOkClick.bind(this);
		this._onDayClick = this._onDayClick.bind(this);
		this._onMonthClick = this._onMonthClick.bind(this);
		this._onYearClick = this._onYearClick.bind(this);
		this._getDate = this._getDate.bind(this);
		this._getCalendarDate = this._getCalendarDate.bind(this);
		this._getDaysInMonth = this._getDaysInMonth.bind(this);
		this._getFirstDayOfMonth = this._getFirstDayOfMonth.bind(this);
		this._getCellDate = this._getCellDate.bind(this);
		this._getCellDateAsISO = this._getCellDateAsISO.bind(this);
		this._getCellDateClass = this._getCellDateClass.bind(this);
	}

	componentWillMount() {
		if (this.props.range) {
			if (this.props.isFrom) {
				this.setState({ selectedDate: moment(this.props.selectedDateRange.dates.display.from) });
			} else {
				this.setState({
					selectedDate: moment(this.props.selectedDateRange.dates.display.to),
					minDate: moment(this.state.selectedDateRange.dates.display.from)
				});
			}
		}
	}

	componentDidMount() {
		let selectedDate = this.state.selectedDate.toISOString();

		this.setState({
			viewingDay: moment(selectedDate).endOf("day"),
			viewingMonth: moment(selectedDate).endOf("month"),
			viewingYear: moment(selectedDate).endOf("year")
		});

		this._createOverlay();
		this._attachEvents();
	}

	_attachEvents() {
		let input = this.refs["hidden-input"].getDOMNode();
		input.focus();

		let clickHandler = (e) => {
			let lostFocus = e.target.classList.contains(styles.modal);
			if (lostFocus) {
				document.removeEventListener("click", clickHandler);
				input.removeEventListener("keydown", keyUpHandler);
				this._onBlur();
			} else {
				input.focus();
			}
		};

		let waitForKeys = false;

		let keyUpHandler = (e) => {

			let keyMap = utils.keyMap(e),
				duration = this.state.powerKeys.duration,
				direction = this.state.powerKeys.direction,
				moveTo = this.state.selectedDate.toISOString(),
				keys = this.state.powerKeys.keys,
				value;

			if (waitForKeys) {

				if (keyMap.ESC || keyMap.ENTER) {
					waitForKeys = false;
					this.setState({
						powerKeys: {
							active: false,
							keys: [],
							direction: null,
							value: 0,
							duration: 'Days',
							style: {
								display: 'none'
							}
						}
					});

					if (keyMap.ENTER) {
						this.setState({ selectedDate: this.state.moveToDate });
						this.props.onUpdate(this.state.selectedDate);
						e.preventDefault();
						e.stopPropagation();
					}

					if (keyMap.ESC) {
						this.setState({ moveToDate: this.state.selectedDate });
						e.preventDefault();
						e.stopPropagation();
					}

					return;
				}

				if (keyMap.VALUE || keyMap.VALUE === 0) {
					if (keys.length) {
						keys.push(keyMap.VALUE);
					} else {
						keys = [keyMap.VALUE];
					}
				} else if (keyMap.DURATION_DAYS) {
					duration = "Days";
				} else if (keyMap.DURATION_WEEKS) {
					duration = "Weeks";
				} else if (keyMap.DURATION_MONTHS) {
					duration = "Months";
				} else if (keyMap.DURATION_YEARS) {
					duration = "Years";
				} else if (keyMap.DELETE) {
					keys.pop();
				}

				if (keyMap.ACTION_ADD) {
					direction = "Add";
				}

				if (keyMap.ACTION_SUBTRACT) {
					direction = "Subtract";
				}

				if (keyMap.RIGHT) {
					let update = Number(keys.join("")) + 1;
					keys = [update];
					if (update > 0) {
						direction = "Add";
					}
				}

				if (keyMap.LEFT) {
					let update = Number(keys.join("")) - 1;
					if (update < 0) {
						direction = "Subtract";
					}
					keys = [update];
				}

				value = keys.join("");

				if ((value > 0 && direction === "Subtract") || (value < 0 && direction === "Add")) {
					let update = Number(keys.join("")) * -1;
					keys = [update];
					value = keys.join("");
				}

				if (keys.length === 1 && Math.abs(Number(value)) === 1) {
					duration = _.trimRight(duration, "s");
				} else if (!_.endsWith(duration, "s")) {
					duration += "s";
				}

				moveTo = moment(moveTo).add(value, duration.toLowerCase());

				this.setState({
					powerKeys: {
						active: true,
						keys: keys,
						value: value,
						direction: direction,
						duration: duration
					},
					moveToDate: moveTo
				});

			} else {

				let initPowerKeys = (subtract) => {
					waitForKeys = true;
					this.setState({
						powerKeys: {
							active: true,
							keys: [],
							direction: subtract ? "Subtract" : "Add",
							duration: this.state.powerKeys.duration,
							style: { display: "block" }
						}
					});
				};

				if (keyMap.ACTION_ADD || keyMap.ACTION_SUBTRACT) {
					initPowerKeys(keyMap.ACTION_SUBTRACT);
					return;
				}

				if (keyMap.LEFT || keyMap.RIGHT) {
					initPowerKeys(keyMap.LEFT);
					return;
				}

				if (keyMap.ENTER) {
					input.removeEventListener("keydown", keyUpHandler);
					this._onOkClick();
					e.preventDefault();
					e.stopPropagation();
					return;
				}

				if (keyMap.ESC) {
					input.removeEventListener("keydown", keyUpHandler);
					this._onBlur();
					return;
				}
			}
		};

		input.addEventListener("keydown", keyUpHandler);
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
			el.outerHTML = "";
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

	_onDayClick(e) {
		let day = Number(e.target.getAttribute("data-date").split("/")[2]),
			month = this.state.viewingMonth.month(),
			year = this.state.viewingYear.year(),
			newDate = moment().year(year).month(month).date(day);

		this.props.onUpdate(newDate.endOf("day"));
		this.setState({
			selectedDate: newDate,
			moveToDate: newDate
		});

		if (this.state.range && this.state.isFrom) {
			this.setState({ toDate: newDate});
		}

		if (this.state.closeOnSelect) {
			this._onOkClick(newDate.endOf("day"));
		}
	}

	_onMonthClick(e) {
		let moveBack, update;

		if (e.target) {
			moveBack = e.target.classList.contains(styles["arrow-left"]) ? true : false;
		} else {
			moveBack = (e === -1) ? true : false;
		}

		if (moveBack) {
			update = this.state.viewingMonth.subtract(1, "month");
		} else {
			update = this.state.viewingMonth.add(1, "month");
		}


		this.setState({ viewingMonth: update, viewingYear: update });
	}

	_onYearClick(e) {
		let moveBack, update;

		if (e.target) {
			moveBack = e.target.classList.contains(styles["arrow-left"]) ? true : false;
		} else {
			moveBack = (e === -1) ? true : false;
		}

		if (moveBack) {
			update = this.state.viewingYear.subtract(1, "year");
		} else {
			update = this.state.viewingYear.add(1, "year");
		}

		let viewingMonth = this.state.viewingMonth.format("MMM");
		update.month(viewingMonth);

		this.setState({ viewingMonth: update, viewingYear: update });
	}

	_getDate(type) {
		let format;

		switch (type) {
			case "DAYOFWEEK":
				format = "dddd";
				break;
			case "DAYOFMONTH":
				format = "DD";
				break;
			case "MONTH":
				format = "MMM";
				break;
			case "YEAR":
				format = "YYYY";
				break;
		}

		return this.state.selectedDate.format(format);
	}

	_getCalendarDate(type) {
		let format,
			state = this.state.viewingMonth;

		switch (type) {
			case "DAYOFWEEK":
				format = "dddd";
				state = this.state.viewingDay;
				break;
			case "DAYOFMONTH":
				format = "DD";
				break;
			case "MONTH":
				format = "MMM";
				break;
			case "YEAR":
				format = "YYYY";
				state = this.state.viewingYear;
				break;
		}

		return state.format(format);
	}

	_getDaysInMonth() {
		let days = [];

		// If first day of month is Sunday & the user display is M - S
		// TODO: fix this ugly hack
		if (this.state.firstDayOfWeek > this._getFirstDayOfMonth()) {
			days.push("", "", "", "", "", "");
		} else {
			for (var x = this.state.firstDayOfWeek; x < this._getFirstDayOfMonth(); x++) {
				days.push("");
			}
		}

		for (var y = 0; y < this.state.viewingMonth.daysInMonth(); y++) {
			days.push(this.state.viewingMonth.startOf("month").add(y, "days").format("DD"));
		}

		return _.chunk(days, 7);
	}

	_getFirstDayOfMonth() {
		return Number(this.state.viewingMonth.startOf("month").format("d"));
	}

	_getCellDate(cell) {
		return this.state.viewingYear.year() + "/" + this.state.viewingMonth.format("MM") + "/" + cell;
	}

	_getCellDateAsISO(cell) {
		return moment(this._getCellDate(cell), "YYYY/MM/DD");
	}

	_getCellDateClass(cell) {
		if (cell && (this.state.selectedDate.format("YYYY/MM/DD") === this._getCellDate(cell))) {
			return styles.selected;
		}

		if (cell && this.state.moveToDate && (this.state.moveToDate.format("YYYY/MM/DD") === this._getCellDate(cell))) {
			return styles["move-to"];
		}

		if (cell && this.state.today.format("YYYY/MM/DD") === this._getCellDate(cell)) {
			return styles.today;
		}
	}

	render() {
		return (
			<div ref="wrapper">
					<div className={styles.modal}>
					<div className={styles.wrapper} ref="wrapper">
						<div className={styles.header}>{this._getDate("DAYOFWEEK")}</div>
						<div className={styles.date}>
							<div className={styles.month}>
								<span className={styles["arrow-left"]} onClick={this._onMonthClick}></span>
									{this._getCalendarDate("MONTH")}
								<span className={styles["arrow-right"]} onClick={this._onMonthClick}></span>
							</div>
							<div className={styles.day}>{this._getDate("DAYOFMONTH")}</div>
							<div className={styles.year}>
								<span className={styles["arrow-left"]} onClick={this._onYearClick}></span>
									{this._getCalendarDate("YEAR")}
								<span className={styles["arrow-right"]} onClick={this._onYearClick}></span>
							</div>
						</div>
						<table className={styles.table}>
							<thead>
								<tr>
									{this.state.daysOfWeek.map((day, j) => {
										return (
											<th key={j}>{day}</th>
										);
									})}
								</tr>
							</thead>
							<tbody>
								{this._getDaysInMonth().map((row, i) => {
									return (
										<tr key={i}>
											{row.map((cell, j) => {
												if (cell) {
													let min = this.state.minDate.toISOString();
													if (this._getCellDateAsISO(cell).isBetween(moment(min).subtract(1, "day"), this.state.maxDate, "day")) {
														return (
															<td key={j}>
																<a
																	data-date={this._getCellDate(cell)}
																	className={this._getCellDateClass(cell)}
																	onClick={this._onDayClick}>{cell}
																</a>
															</td>
														);
													} else {
														return <td key={j}>{cell}</td>;
													}
												} else {
													return <td key={j}></td>;
												}
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
						<div className={styles.footer}>
							<div className={styles.buttons}>
								<button className={styles.btn} onClick={this._onBlur}>Cancel</button>
								{this.state.closeOnSelect ? null : (<button className={styles.btn} onClick={this._onOkClick}>OK</button>)}
							</div>
						</div>
						<div className={styles["power-keys"]} style={this.state.powerKeys.style}>
							<li className={styles["power-keys-item"]}>{this.state.powerKeys.direction}</li>
							{(this.state.powerKeys.keys.length
								? <li className={styles["power-keys-item"]}>{Math.abs(this.state.powerKeys.value)}</li>
								: null
							)}
							{(this.state.powerKeys.keys.length
								? <li className={styles["power-keys-item"]}>{this.state.powerKeys.duration}</li>
								: null
							)}
						</div>
						<div className={styles["hidden-input"]}>
							<input type="text" ref="hidden-input" onFocus={this._onFocus} />
						</div>
					</div>
				</div>
			</div>
		);
	}

}
