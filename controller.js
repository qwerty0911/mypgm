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

const BuzzerRing = () =>{
	buzzer.digitalWrite(1);
	setTimeout(TurnOffBuzzer,100);

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
	let lightInput = light.digitalRead();
	console.log("bright : "+lightInput);
	if(lightInput!=currentBright){
		if(lightInput==0){
			currentBright = 0;
			console.log("BBIBBI");
			setImmediate(BuzzerRing);
			setTimeout(BuzzerRing,200);
		}
		if(lightInput!=0){
			currentBright = 1;
			console.log("BBI");
			buzzer.digitalWrite(1);
			setTimeout(TurnOffBuzzer,200);
		}
	}
}

const CheckTouch = () =>{
	let touchInput=touch.digitalRead();
	console.log(touchInput);
	if(touchInput){
		console.log("touch! tCount : "+tCount++);
	}
	if(tCount %3 ==0){
		setImmediate(TurnOffLED);
	}
	if(tCount %3 !=0){
		setImmediate(TurnOnLED);
		setImmediate(CheckLight);
	}
	setTimeout(CheckTouch,300);
}




process.on('SIGINT',function(){
	TurnOffLED();
	buzzer.digitalWrite(0);
	console.log("EXIT");
	process.exit();
});
setImmediate(CheckTouch);
