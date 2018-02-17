# ICS.js
## Install
### Dependencies
This library uses functionality from jQuery and Moment, so if you are not already using them in your project, please add these two lines in the HTML head.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js" integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js" integrity="sha256-ABVkpwb9K9PxubvRrHMkk6wmWcIHUE9eBxNZLXYQ84k=" crossorigin="anonymous"></script>
```
In addition, it also uses [FileSaver.js](https://github.com/eligrey/FileSaver.js) to save the file. The code for FileSaver.js is included in the file  `dist/ics.filesaver.min.js` for convenience. If you do not wish to use that file or it is out of date, please manually include `FileSaver.js` before loading  `ics.min.js`

## Example Usage
1) Create an iCalendar event:

```javascript
var cal = ics();

cal.addEvent({
	title: 'Dentist',
	description: 'Going to dentist to fix my tooth',
	location: 'Dentist office',
	begin: '2018-02-02 12:00:00',
	end: '2018-02-02 13:00:00'
});

console.log(cal.calendar());
// BEGIN:VCALENDAR
// PRODID:undefined
// VERSION:2.0
// BEGIN:VEVENT
// DTSTAMP:20180217T133543Z
// STATUS:CONFIRMED
// UID:1c1c53f5-faad-43e8-b707-68e7bc63b05d
// DTSTART:20180202T110000Z
// DTEND:20180202T120000Z
// SUMMARY:Dentist
// DESCRIPTION:Going to dentist to fix my tooth
// LOCATION:Dentist office
// CLASS:PUBLIC
// TRANSP:OPAQUE
// END:VEVENT
// END:VCALENDAR
```
2) Download an iCalendar file:
```javascript
var cal = ics();

cal.addEvent({
	title: 'Dentist',
	description: 'Going to dentist to fix my tooth',
	location: 'Dentist office',
	begin: '2018-02-02 12:00:00',
	end: '2018-02-02 13:00:00'
});

cal.download('event');
```
## API
### `addEvent(attributes)`
Generates an iCal-compliant VCALENDAR string with one VEVENT.
#### `attributes`
Object literal containing event information.
Only the `begin` property is required.
The following properties are accepted:

| Property 		| Description 																													| Example 												|
| :-------	 	| :----------																													| :------		 										|
| title       	| This property defines a short summary or subject for the calendar component.    												| `'Dentist'`        									|
| description 	| This property provides a more complete description of the calendar component, than that provided by "title.   				| `'Going to dentist to fix my tooth'`         			|
| location 		| CThe property defines the intended venue for the activity defined by a calendar component.   									| `'Dentist office'`        							|
| begin 		| This property specifies when the calendar component begins.  							 										| `'2018-02-08 12:00:00'` (February 8, 2018 at 12:00)	|
| end 			| This property specifies the date and time that a calendar component ends.   													| `'2018-02-08 14:00:00'` (February 8, 2018 at 14:00)	|
| status 		| This property defines the overall status or confirmation for the calendar component. `"TENTATIVE"/"CONFIRMED"/"CANCELLED"`	| `'CONFIRMED'`        									|
| class 		| This property defines the access classification for a calendar component. `"PUBLIC"/"PRIVATE"/"CONFIDENTIAL"`   				| `'PUBLIC'`       										|
| transparency	| This property defines whether an event is transparent or not to busy time searches. `"OPAQUE"/"TRANSPARENT"`    				| `'OPAQUE'`        									|