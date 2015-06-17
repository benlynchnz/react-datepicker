'use strict';

import {EventEmitter} from 'events';
import utils from './utils';

let _state = {
	selectedDate: moment().endOf('day'),
	fromDate: moment().endOf('day'),
	toDate: moment().endOf('day'),
	selectedDateRange: _.findWhere(utils.convenienceDates, { default: true }),
	moveToDate: moment().endOf('day'),
	today: moment().endOf('day'),
	viewingDay: moment().endOf('day'),
	viewingMonth: moment().endOf('month'),
	viewingYear: moment().endOf('year'),
	minDate: moment().subtract(999, 'years'),
	maxDate: moment().add(999, 'years'),
	displayFormat: 'DD MMM YYYY',
	closeOnSelect: false,
	show: false,
	powerKeys: {
		active: false,
		direction: null,
		keys: [],
		value: 0,
		duration: 'Days',
		style: {
			display: 'none'
		}
	}
};

const CHANGE = 'CHANGE';

class Store extends EventEmitter {

	getState() {
		return _state;
	}

	getConvenienceDates() {
		return utils.convenienceDates;
	}

	emitChange() {
		this.emit(CHANGE);
	}

	addChangeListener(cb) {
		this.on(CHANGE, cb);
	}

	removeChangeListener(cb) {
		this.removeListener(CHANGE, cb);
	}
}

let _Store = new Store();

export default _Store;
