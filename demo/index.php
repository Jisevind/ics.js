<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Dev-Tests - ics</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js" integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment-with-locales.min.js" integrity="sha256-XWrGUqSiENmD8bL+BVeLl7iCfhs+pkPyIqrZQcS2Te8=" crossorigin="anonymous"></script>
    <script src="js/filesaver.min.js"></script>
    <script src="js/ics.js"></script>
</head>

<body>
    <button id="ics">Create an iCal event</button>

	<script type="text/javascript">
		$(document).ready(function() {
		    $('#ics').click(function() {

		        var cal = ics();
		        
				cal.addEvent({
					title: 'Dentist',
					description: 'Going to dentist to fix my tooth',
					location: 'Dentist office',
					begin: '2018-02-02 12:00:00',
					end: '2018-02-02 13:00:00'
				});

		        console.log(cal.calendar());

		        cal.download('event');
		    });
		});
	</script>

</body>

</html>