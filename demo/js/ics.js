/*! FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.5
 * 2018-01-22 15:49:54
 *
 * By Eli Grey, https://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/src/FileSaver.js */
var saveAs=saveAs||function(t){"use strict";if(!(void 0===t||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=t.document,n=function(){return t.URL||t.webkitURL||t},o=e.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,a=/constructor/i.test(t.HTMLElement)||t.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent),c=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},s=function(t){setTimeout(function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()},4e4)},d=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},f=function(e,f,u){u||(e=d(e));var l,p=this,v="application/octet-stream"===e.type,w=function(){!function(t,e,n){for(var o=(e=[].concat(e)).length;o--;){var r=t["on"+e[o]];if("function"==typeof r)try{r.call(t,n||t)}catch(t){c(t)}}}(p,"writestart progress write writeend".split(" "))};if(p.readyState=p.INIT,r)return l=n().createObjectURL(e),void setTimeout(function(){var t,e;o.href=l,o.download=f,t=o,e=new MouseEvent("click"),t.dispatchEvent(e),w(),s(l),p.readyState=p.DONE});!function(){if((i||v&&a)&&t.FileReader){var o=new FileReader;return o.onloadend=function(){var e=i?o.result:o.result.replace(/^data:[^;]*;/,"data:attachment/file;");t.open(e,"_blank")||(t.location.href=e),e=void 0,p.readyState=p.DONE,w()},o.readAsDataURL(e),void(p.readyState=p.INIT)}l||(l=n().createObjectURL(e)),v?t.location.href=l:t.open(l,"_blank")||(t.location.href=l);p.readyState=p.DONE,w(),s(l)}()},u=f.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=d(t)),navigator.msSaveOrOpenBlob(t,e)}:(u.abort=function(){},u.readyState=u.INIT=0,u.WRITING=1,u.DONE=2,u.error=u.onwritestart=u.onprogress=u.onwrite=u.onabort=u.onerror=u.onwriteend=null,function(t,e,n){return new f(t,e||t.name||"download",n)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this);

/*! ics.js
 * @version 1.0.0
 * @author Johan Mårtensson <johanmartensson@gmail.com>
 * 
 * Created at     : 2018-02-16
 * Last modified  : 2018-02-17
 *
 * @license MIT
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */ 
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