const http = require('http');
const fs = require('fs');
const network = require('network');
const socketio = require('socket.io');
const mcpadc = require('mcp-spi-adc');
const joystick = require('./sensors/joystick.js');
const PORT = 65001;

const webServer = (request, response) =>{
	fs.readFile('views/chart.html','utf8',function(err,data){
		response.writeHead(200,{'Content-Type':'text/html'});
		response.end(data);
		console.log('webpage에 접솝학니다.');
	});
}

const server = http.createServer(webServer);
const io = require('socket.io')(server);

joystick.init(io);

server.listen(PORT, () =>{
	network.get_active_interface((err,ifaces)=>{
		if(ifaces !== undefined){
			if(ifaces.name = 'wlan0'){
				console.log('server waiting http://'+ifaces.ip_address+':'+PORT);
				console.log('web browser를 열고 web주소를 입력하세요');
			}
		}
	});
});

io.on('connection',client=>{
	client.on('startmsg',(data)=>{
		console.log('가동 메시지 수신(측정 주기:%d)!',data);
		joystick.start(data);
	});

	client.on('stopmsg',(data)=>{
		console.log('중지메시지 수신');
		joystick.stop();
	});
});

process.on('SIGINT',()=>{
	console.log('프로그램을 종료합니다.');
	joystick.terminate();
});
