
const LCD = require('raspberrypi-liquid-crystal');
const lcd = new LCD(1,0x27,16,2);
const network = require('network');

const Lcd = {

	init:()=>{
		lcd.beginSync();
		lcd.clearSync();
		console.log('LCD모듈 초기화');
	},

	setIp:()=>{
//		lcd.beginSync();
//		lcd.clearSync();
		lcd.setCursorSync(0,0);
//		console.log('LCD모듈 초기화');
		network.get_active_interface((err,ifaces)=>{
			if(ifaces!==undefined){
				if(ifaces.name =='wlan0'){
					console.log('ip : '+ifaces.ip_address);
					lcd.printSync(ifaces.ip_address);
				}
			}
		});
	},
	printMessage: (line1,line2)=>{
		lcd.setCursorSync(0,0);
		lcd.printSync(line1);
		lcd.setCursorSync(0,1);
		lcd.printSync(line2);
	},
	printMessage2: (line)=>{
		lcd.setCursorSync(0,1);
		lcd.printSync(line);
	},
//	beginSync:()=>{
//		lcd.beginSync();
//	}
};

module.exports.init = function(){Lcd.init();};
module.exports.printMessage = function(line1,line2){Lcd.printMessage(line1, line2);};
module.exports.printMessage2 = function(line){Lcd.printMessage2(line);};
module.exports.setIp = function(){Lcd.setIp();};

