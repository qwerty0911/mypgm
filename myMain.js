const humitemp = require('./myHt.js');
const lcd = require('./myLcd.js');
const fan = require('./myFan.js');
//const network = require('network');
const HTPIN = 21;

lcd.init();
lcd.setIp();
humitemp.init(HTPIN);

console.log("5초 후부터 온습도 측정");

setInterval(()=>{
	humitemp.read();
},5000);

process.on('SIGINT',()=>{
	console.log('프로세스를 종료합니다');
	fan.fanOff();
	process.exit();
});
