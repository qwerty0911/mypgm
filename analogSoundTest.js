const gpio = require('pigpio').Gpio;
const mcpadc = require('mcp-spi-adc');

const SPI_SPEED = 100000;
const SOUND = 2;

var timerid, timeout=200;
var sounddata = -1

const Sound = mcpadc.openMcp3208(SOUND,{speedHz:SPI_SPEED},
	(err)=>{
		console.log("SPI 채널1 초기화 완료!");
		if(err) console.log("채널1 초기화 실패");
});

const analogSound = () =>{
	Sound.read((error,reading)=>{
		console.log("sound : "+reading.rawValue);
	});
	timerid=setTimeout(analogSound,timeout);
}

setImmediate(analogSound);
