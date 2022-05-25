const network = require('network');
const lcd = require('./myLcd.js');

var idNum = '201939617'
lcd.init();


network.get_active_interface((err,ifaces) =>{
	if(ifaces!==undefined){
		if(ifaces.name =='wlan0'){
			console.log('라즈베리파이 ip주소 : ' + ifaces.ip_address);
			lcd.printMessage(ifaces.ip_address,idNum);
		}
	}
});
