import DatePicker from './datepicker.jsx';

if (typeof document !== 'undefined') {
	var renderToElements = document.getElementsByTagName('react-datepicker');

	Array.prototype.forEach.call(renderToElements, function(el) {
	    React.render(<DatePicker element={el}/>, el);
	});
}

export default DatePicker;
