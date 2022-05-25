const gpio = require('pigpio').Gpio;

const TRIG = 6;
const ECHO =13;
//const LED = 26;

//const led = new gpio(LED,{mode:gpio.OUTPUT});
const trig = new gpio(TRIG,{mode:gpio.OUTPUT});
const echo = new gpio(ECHO, {mode:gpio.INPUT, alert:true});

//trig.digitalWrite(0);

const sonic = {
	timerId:0,
	init:(io)=>{
		let startTick, distance, diff;

		console.log('초음파 센서 초기화');
		trig.digitalWrite(0);

		echo.on('alert',(level,tick) =>{
			if(level ==1){startTick=tick;}
			else{	//level==0
				const endTick=tick;
				diff = endTick-startTick;
				distance = diff/58
				dist = Number(distance.toFixed(1));
				console.log('근접거리'+dist);
				io.sockets.emit('watch',dist);
			}
		});
	},
	start:(timerValue) =>{
		if(sonic.timerId ==0){
			sonic.timerId = setInterval(()=>{trig.trigger(10,1);},timerValue);
		}
		else{
			console.log("already 가동중");
		}
	},
	stop:()=>{
		if(sonic.timerId !=0){
			clearInterval(sonic.timerId);
			sonic.timerId=0;
		}
	}
};

//const PWMLed = (dis) =>{
//	if(dis<5) led.pwmWrite(255);
//	else if(dis<10) led.pwmWrite(170);
//	else if(dis<15) led.pwmWrite(100);
//	else if(dis<20) led.pwmWrite(50);
//	else if(dis<50) led.pwmWrite(5);
//	else led.pwmWrite(0);
//}

//process.on('SIGINT', ()=>{
//	led.digitalWrite(0);
//	process.exit();
//});

//Triggering();
//console.log("근접센서로 밝기제어");
//setInterval(() =>{trig.trigger(10,1);}, 200);
module.exports.init = function(io){sonic.init(io);};
module.exports.start = function(timerValue){sonic.start(timerValue);};
module.exports.stop = function(){sonic.stop();};
