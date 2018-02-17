//! ics.js
//! @version 1.0.0
//! @author Johan Mårtensson <johanmartensson@gmail.com>
//! @source
//! 
//! Created at     : 2018-02-16
//! Last modified  : 2018-02-17
//! 
//! @license MIT
//! See https://github.com/lazaruz/ICS/blob/master/LICENSE
//! 
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
var ics = function(prodId) {

	var NEWLINE = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';

	var calendarEvents = [];
	var calendarStart = [
		'BEGIN:VCALENDAR',
		'PRODID:' + prodId,
		'VERSION:2.0'
	].join(NEWLINE);
	var calendarEnd = NEWLINE + 'END:VCALENDAR';

	function uuidv4() {
		return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
			(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
		)
	}

	function calendar() {
		return calendarStart + NEWLINE + calendarEvents.join(NEWLINE) + calendarEnd;
	}

	return {
		'calendar': function() {
			return calendar();
		},
		'addEvent': function(opts) {

			opts = $.extend({
				title: '',
				description: '',
				location: '',
				begin: '',
				end: '',
				/*
				 * Status
				 * This property defines the overall status or confirmation for the calendar component.
				 * 
				 * "TENTATIVE"           ;Indicates event is tentative.
            	 * "CONFIRMED"           ;Indicates event is definite.
            	 * "CANCELLED"           ;Indicates event was cancelled.
				 */
				status: 'CONFIRMED',
				/*
				 * Classification
				 * This property defines the access classification for a calendar component.
				 * 
				 * "PUBLIC" / "PRIVATE" / "CONFIDENTIAL"
				 */
				class: 'PUBLIC',
				/*
				 * Time Transparency
				 * This property defines whether an event is transparent or not to busy time searches.
				 * 
				 * "OPAQUE"       Blocks or opaque on busy time searches.
             	 * "TRANSPARENT"  Transparent on busy time searches.
				 */
				transparency: 'OPAQUE'

			}, opts);

			var start_date = moment(opts.begin).utc().format('YYYYMMDDTHHmmss') + 'Z';
			var end_date = moment(opts.end).utc().format('YYYYMMDDTHHmmss') + 'Z';
			var stamp = moment(new Date()).utc().format('YYYYMMDDTHHmmss') + 'Z';

			var calendarEvent = [
				'BEGIN:VEVENT',
				'DTSTAMP:' + stamp,
				'STATUS:' + opts.status,
				'UID:' + uuidv4(),
				'DTSTART:' + start_date,
				'DTEND:' + end_date,
				'SUMMARY:' + opts.title,
				'DESCRIPTION:' + opts.description,
				'LOCATION:' + opts.location,
				'CLASS:' + opts.class,
				'TRANSP:' + opts.transparency,
				'END:VEVENT'
			];

			calendarEvent = calendarEvent.join(NEWLINE);

			calendarEvents.push(calendarEvent);

			return calendarEvent;
		},
		'download': function(filename) {

			if (calendarEvents.length < 1) { return false; }

			saveAs(
				new Blob([calendar()], {type: "text/x-vCalendar;charset=utf-8"}),
				filename+".ics"
			);
		}
	};
};