import React from "react";
import { render } from "react-dom";

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

let renderHandler = () => {
	let reactComp = document.getElementsByTagName('react-datepicker'),
		classComp = document.getElementsByClassName('react-datepicker');

	Array.prototype.forEach.call(reactComp, (el) => {
	    // React.render(<DatePicker element={el}/>, el);
			render(<DatePicker element={el}/>, el);
	});

	Array.prototype.forEach.call(classComp, (el) => {
	    // React.render(<DatePicker element={el}/>, el);
			render(<DatePicker element={el}/>, el);
	});
};

if (typeof document !== 'undefined') {
	renderHandler();
}

document.addEventListener('render', renderHandler);

export default DatePicker;
