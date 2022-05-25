const gpio=require('pigpio').Gpio;


const button = new gpio(12,{mode:gpio.INPUT});
const rled = new gpio(16,{mode:gpio.OUTPUT});
const gled = new gpio(20, {mode:gpio.OUTPUT});
const bled = new gpio(21, {mode:gpio.OUTPUT});
var count = 0;


button.glitchFilter(10000);


const CheckButton = () =>{
	let data;
	data = button.digitalRead();
	if(!data){
		console.log('Pressed!'+count);
		if((count % 3) ==0){
			rled.digitalWrite(1);
			gled.digitalWrite(0);
			bled.digitalWrite(0);
		}
		if((count % 3) ==1){
			rled.digitalWrite(0);
			gled.digitalWrite(1);
			bled.digitalWrite(0);
		}
		if((count % 3)==2){
			rled.digitalWrite(0);
			gled.digitalWrite(0);
			bled.digitalWrite(1);
		}
		count++;
	}
	setTimeout(CheckButton,100);
}
process.on('SIGINT',function(){
	rled.digitalWrite(0);
	gled.digitalWrite(0);
	bled.digitalWrite(0);
	buzzer.digitalWrite(0);
	console.log("exit.");
	process.exit();
});
setTimeout(CheckButton); 



