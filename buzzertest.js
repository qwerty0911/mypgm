const gpio=require('pigpio').Gpio;


const button = new gpio(12,{mode:gpio.INPUT});
const buzzer = new gpio(26, {mode:gpio.OUTPUT});
const rled = new gpio(16,{mode:gpio.OUTPUT});
const gled = new gpio(20, {mode:gpio.OUTPUT});
const bled = new gpio(21, {mode:gpio.OUTPUT});
var count = 0;
var flag = 0;

button.glitchFilter(10000);


const CheckButton = () =>{
	let data;
	data = button.digitalRead();
	if(flag>0){
		buzzer.digitalWrite(1);
		console.log('buzzerOn');
		flag=0;
	}
	else{
		buzzer.digitalWrite(0);
		console.log("buzzerOff");
		flag=1;
	}
}
setTimeout(CheckButton,200);
process.on('SIGINT',function(){
	buzzer.digitalWrite(0);
	rled.digitalWrite(0);
	gled.digitalWrite(0);
	bled.digitalWrite(0);
	console.log("프로그램이 종료됩니다.");
	process.exit();
});
setInterval(CheckButton,100);


