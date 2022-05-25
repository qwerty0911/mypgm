const gpio=require('pigpio').Gpio;
const LED = 16;
const BUZZER = 21;
const led = new gpio(LED, {mode:gpio.OUTPUT});
const buzzer = new gpio(BUZZER, {mode:gpio.OUTPUT});
var flag = 0;

const TurnOnLed = ()=>{
	buzzer.digitalWrite(0);
	led.digitalWrite(1);
	console.log("Nodejs:LED on, Buzzer off");
	setTimeout(TurnOnBuzzer,1000);
}


const TurnOnBuzzer = () =>{
	led.digitalWrite(0);
	buzzer.digitalWrite(1);
	console.log("Nodejs:LED off, Buzzer on");
	setTimeout(TurnOnLed,100);
}
process.on('SIGHT',()=>{
	led.digitalWrite(0);
	buzzer.digitalWrite(0);
	console.log("Ctrl-x Exit...");
	process.exit();
});
setImmediate(TurnOnLed);
