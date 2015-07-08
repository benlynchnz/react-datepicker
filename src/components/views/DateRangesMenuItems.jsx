"use strict";

import Store from '../store';
import Constants from '../constants';
import utils from '../utils';

import styles from '../../DatePickerStyle.css';

export default class DateRangeMenu extends React.Component {

    displayName: 'datepicker-range-menu'

    constructor(props) {
        super(props);

        this.state = {};

        this._onClick = this._onClick.bind(this);
        this._onRangeClick = this._onRangeClick.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    componentDidMount() {
        this.setState({
            default: this.props.default,
            isReady: true
        });
    }

    _onBlur() {
        let menu = this.refs["menu"].getDOMNode().style.display = "none";
	}

    _onClick(e) {
        this.refs["menu"].getDOMNode().style.display = "block";
    }

    _onRangeClick(e) {
        let range = e.target.getAttribute("data-name"),
            selected = _.findWhere(this.props.ranges, { name: range });

        this.setState({
            default: selected,
            selectedDateRange: selected
        });

		utils.dispatch(this, Constants.DATE_RANGE_CHANGE, JSON.stringify(selected));

        this._onBlur();
    }

    render() {
        let isSelected = (item) => {
            if (item.name === this.state.default.name) {
                return styles.selected;
            }
        };

        if (this.state.isReady) {
            return (
                <div ref="menu-wrapper">
                    <div className={styles["date-range-wrapper"]} onClick={this._onClick}><img src='./icons/calendar-blank.png' />{this.state.default.name}</div>
                    <ul className={styles["date-ranges"]} ref="menu">
                        {this.props.ranges.map((item, i) => {
                            return (
                                <li
                                    className={isSelected(item)}
                                    key={i}
                                    data-name={item.name}
                                    onClick={this._onRangeClick}>
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

};
