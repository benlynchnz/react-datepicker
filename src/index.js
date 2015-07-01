'use strict';

// Polyfill CustomEvent for IE
try {
	new CustomEvent("test");
} catch(e) {
	let CustomEvent = (event, params) => {
		let evt;
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};

		evt = document.createEvent("CustomEvent");
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	};

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
}

import DatePicker from './datepicker.jsx';

// if (typeof document !== 'undefined') {
// 	var renderToElements = document.getElementsByClassName('react-datepicker');
//
// 	Array.prototype.forEach.call(renderToElements, (el) => {
// 	    React.render(<DatePicker element={el}/>, el);
// 	});
// }

let renderHandler = (e) => {
	var renderToElements = document.getElementsByClassName('react-datepicker');

	Array.prototype.forEach.call(renderToElements, (el) => {
	    React.render(<DatePicker element={el}/>, el);
	});
};

document.addEventListener('render', renderHandler);

export default DatePicker;
