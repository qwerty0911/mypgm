const gpio = require('pigpio').Gpio;
const RELAY = 26;
const relay = new gpio(RELAY,{mode:gpio.OUTPUT});

const fanCtrl = {
	fanOn:()=>{
		relay.digitalWrite(1);
	},
	fanOff:()=>{
		relay.digitalWrite(0);
	}
};

module.exports.fanOn = function(){fanCtrl.fanOn();};
module.exports.fanOff = function(){fanCtrl.fanOff();};
