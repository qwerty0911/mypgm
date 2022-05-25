const humitemp = require('./humitemp.js');
const HTPIN = 21;

humitemp.init(HTPIN);

console.log("3초 후부터 측정");

setInterval(()=>{humitemp.read();},3000);
