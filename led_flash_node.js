var gpio = require("pi-gpio");

var intervalId;
var durationId;
var Pin1 = 7;
var Pin2 = 12;

gpio.open(Pin1, "output", function(err) {
	var on = 1;
	console.log('GPIO pin '+Pin1+' is open. toggling LED every 100 mS for 10s');
	intervalId = setInterval( function(){
  		gpio.write(Pin1, on, function() { // toggle pin between high (1) and low (0)
    		on = (on + 1) % 2;
    	});
  	}, 100);
});

gpio.open(Pin2, "output", function(err) {
	var on = 1;
	console.log('GPIO pin '+Pin2+' is open. toggling LED every 100 mS for 10s');
	intervalId = setInterval( function(){
  		gpio.write(Pin2, on, function() { // toggle pin between high (1) and low (0)
    		on = (on + 1) % 2;
    	});
  	}, 100);
});

durationId= setTimeout( function(){
  clearInterval(intervalId);
  clearTimeout(durationId);
  console.log('10 seconds blinking completed');
  gpio.write(Pin1, 0, function() { // turn off pin 7
    gpio.close(Pin1); // then Close pin 7
    process.exit(0); // and terminate the program
  });
  gpio.write(Pin2, 0, function() { // turn off pin 12
    gpio.close(Pin2); // then Close pin 12
    process.exit(0); // and terminate the program
  });
}, 10000); // duration in mS
