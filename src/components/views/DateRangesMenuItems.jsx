import Constants from "../constants";
import Store from "../store";
import utils from "../utils";
import styles from "../../DatePickerStyle.css";

export default class DateRangeMenu extends React.Component {

    displayName: "datepicker-range-menu"

    constructor(props) {
        super(props);

        this.state = {};

        this._onClick = this._onClick.bind(this);
        this._onRangeClick = this._onRangeClick.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    componentDidMount() {
        this.setState({
            isReady: true
        });
    }

    _onBlur() {
        this.refs.menu.getDOMNode().style.display = "none";
	}

    _onClick() {
        this.refs.menu.getDOMNode().style.display = "block";

        let clickHandler = (e) => {
            let hasFocus = utils.closest(e.target, styles["date-ranges"]);

            if (!hasFocus) {
                document.removeEventListener("click", clickHandler);
                this._onBlur();
            }
        };

        document.addEventListener("click", clickHandler);
    }

    _onRangeClick(e) {
        let range = e.target.getAttribute("data-name"),
            selected = _.findWhere(this.props.ranges, { name: range });

		utils.dispatch(this, Constants.DATE_RANGE_CHANGE, Store.buildOutput(selected));

        this._onBlur();
    }

    render() {
        let isSelected = (item) => {
            if (item.name === this.props.selected.name) {
                return styles.selected;
            }
        };

        if (this.state.isReady) {
            return (
                <div ref="menu-wrapper">
                    <div className={styles["date-range-wrapper"]} onClick={this._onClick}>
                        <div className={styles["date-range-wrapper-text"]}>
                            {this.props.selected.name}
                        </div>
                        <div className={styles["date-range-wrapper-icon-caret"]}>
                            <i className="material-icons">arrow_drop_down</i>
                        </div>
                    </div>
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

}
