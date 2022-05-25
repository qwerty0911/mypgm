const temp = require("node-dht-sensor");
const lcd = require('./myLcd.js');
const fan = require('./myFan.js');
var current = -1;

//lcd.init();

const humitemp = {
	type:22,
	pin:21,
	humi:0.0,
	temp:0.0,
	str:'',

	init: (number) =>{
		humitemp.pin = number;
		console.log('reset pin : '+humitemp.pin);
	},

	read:()=>{
		let humistr = '';
		temp.read(humitemp.type, humitemp.pin, (err,temp, humi) =>{
			if(!err){
				humitemp.temp = temp.toFixed(1);
				humitemp.humi = humi.toFixed(1);
				humitemp.str = (new Date()).toLocaleString('ko');
				humistr = humitemp.temp + 'C, ' + humitemp.humi+ '%';
				lcd.printMessage2(humistr);
				console.log('온도/습도 값 : '+humitemp.temp+'C'+humitemp.humi+'% '+humitemp.str);
				if(current!=-1){
					console.log('이전 : '+current+'현재 : '+humitemp.humi);
					if(current<humitemp.humi){
						console.log('fanOn');
						fan.fanOn();
					}
					else{
						console.log('fanOff');
						fan.fanOff();
					}
				}
				current = humitemp.humi;
			}
			else console.log(err);
		});
	}
}


module.exports.init = function(number){humitemp.init(number);};
module.exports.read = function(){humitemp.read();};
//module.exports.getTemp = function(){humitemp.getTemp();};
//module.exports.toLcd = function(){humitemp.toLcd();};
