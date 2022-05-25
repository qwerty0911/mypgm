const gpio = require('pigpio').Gpio;
const TOUCH = 26;
const LIGHT = 19;
const BUZZER = 13;
const RLED = 21;
const GLED = 20;
const BLED = 16;
const touch = new gpio(TOUCH,{mode:gpio.ALT0});
const buzzer = new gpio(BUZZER, {mode:gpio.OUTPUT});
const light = new gpio(LIGHT, {mode:gpio.INPUT});
const rled = new gpio(RLED, {mode:gpio.OUTPUT});
const gled = new gpio(GLED, {mode:gpio.OUTPUT});
const bled = new gpio(BLED, {mode:gpio.OUTPUT});
var tCount = 0;
var currentBright = 0;
var boolBuzzer = 0;
var ldata = 0;

const TurnOnBuzzer = () =>{
	if(boolBuzzer==1){
		buzzer.digitalWrite(1);
		setTimeout(offBuzzer,100);
	}
}
const TurnOffBuzzer = () =>{
	buzzer.digitalWrite(0);
}

const TurnOnLED = () => {
	rled.digitalWrite(1);
	gled.digitalWrite(1);
	bled.digitalWrite(1);
}
const TurnOffLED = () =>{
	rled.digitalWrite(0);
	gled.digitalWrite(0);
	bled.digitalWrite(0);
}
const CheckLight=()=>{
	console.log("ldata : "+ldata);
	if(currentBright ===1 && ldata ==0){
		currentLight = ldata;
		setImmediate(TurnOnBuzzer);
		setTimeout(setboolbuzzer,100);
	}
	else if(currentBright ==0 && ldata ==1){
		current = ldata;
		setImmediate(TurnOnBuzzer);
		setTimeout(setboolbuzzerZero,300);
	}
}

const CheckTouch = () =>{
	let tdata = touch.digitalRead();
	if(tdata){
		tCount++;
		console.log("tCount : "+tCount);
	}
	if(tCount %3==0){
		setImmediate(TurnOffLED);
	}
	else{	
		setImmediate(TurnOnLED);
		setInterval(CheckLight,100);
	}
}

process.on('SIGINT',function(){
	TurnOffLED();
	buzzer.digitalWrite(0);
	console.log("EXIT");
	process.exit();
});
setInterval(CheckTouch,300);
