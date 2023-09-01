const R = 120;
let phi = 5.55;
const H = 533.6;
const spots = [];
const degree = [0, 0, 0, 0, 0, 0];
const spin = [0, 0, 0, 0, 0, 0];
const linkHalf = 1.5; //the length of the half of the linking line
const key = 'CYCLE';
let password = 'brglegusno';

const center = {x:0, y:0}

const script = '恭喜你解開了全部的謎題，你說寶藏在哪裡？先別這麼著急，這趟探險好玩嗎？想想當初自己開始探險的初衷吧，可能是因為那價值連城的寶藏讓你心動，又或是你想要四處遊歷，看看世界。無論如何，還記得第一次探險時的心情嗎？成功解密的喜悅，危機進逼的緊張，或是期望落空的失望。這些都是每一趟探險無價的寶藏，不是嗎？希望你們能夠再次想起第一次探險的種種感受。'

let clicks = 0;
let stage = 0;
let passwordPos = 0;
let letterPos = 0;
let start;

//document.getElementById('first').style.display = 'none';
//stage++;

const setUp = () => {
  switch (start) {
    case 'eg': 
      phi -= 2*Math.PI/5;
      password = 'egusnobrgl';
      break;
    case 'no': 
      phi -= 2*Math.PI/5 * 2;
      password = 'nobrglegus';
      break;
    case 'gl': 
      phi -= 2*Math.PI/5 * 3;
      password = 'glegusnobr';
      break;
    case 'us': 
      phi -= 2*Math.PI/5 * 4;
      password = 'usnobrgleg';
      break;
    default:
      password = 'brglegusno';
      break;
  }
  setLengths();
}

document.querySelector("form").addEventListener(
  "submit",
  (event) => {
    const data = new FormData(form);
    let output = "";
    for (const entry of data) {
      output = `${output}${entry[1]}`;
    }
    event.preventDefault();
    start = output;
    document.getElementById('form').style.display = 'none';
    setUp();
  },
  false,
);

const addAnimation = (i) => {
  document.getElementById(`s${i}`).style.animation = `1s infinite alternate blink`;
}

const onClick = (e) => {
  if (e.id[1] == clicks + 1) {
    e.style.backgroundColor = 'red'
    e.style.filter = 'blur(3px)'
    e.style.border = 'none';
    if (clicks >= 1) {
      link(clicks);
    }
    clicks += 1;
    for (let i = clicks; i > 0; i--) {
      document.getElementById(`s${i}`).style.animation = 'none';
      setTimeout(() => addAnimation(i), 1);
    }
    if (clicks === 5) {
      stage++; 
      document.getElementById('key').style.display = 'flex';
      setTimeout(() => link(5), 1000);
    }
  }
}

const link = (n) => {
  const line =  document.getElementById(`l${n}`);
  line.style.animation = '0.5s linear draw-line forwards';
}

const setLengths = () => {
  const mid = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
  }
  center.x = mid.x - 60;
  center.y = mid.y - 35;

  // setting of guide sentence and the key
  document.getElementById('guide').style.marginTop = `${(mid.y - H/2) / 2}px`;
  document.getElementById('key').style.bottom = `${(mid.y - H/2) / 2}px`;
  
  //settings of map
  const map = document.getElementById('map');
  map.style.left = `${mid.x}px`;
  map.style.top = `${mid.y}px`;;

  // correct spots and linking line
  for (let i = 1; i <= 5; i++) {
    const spot = document.getElementById(`s${i}`);
    const line = document.getElementById(`l${i}`);
    spot.style.left = `${center.x + R*Math.cos(4*Math.PI/5 * i + phi)}px`;
    spot.style.top = `${center.y + R*Math.sin(4*Math.PI/5 * i + phi)}px`;

    line.style.transformOrigin = `${-R*Math.cos(162*Math.PI/180)}px ${R*Math.sin(162*Math.PI/180)}px`;
    line.style.left = `${center.x + R*Math.cos(162*Math.PI/180)}px`;
    line.style.top = `${center.y - R*Math.sin(162*Math.PI/180)}px`;

    degree[i] = 144*i + phi * 180 / Math.PI + 162;
    const start = `scale(1) rotate(${degree[i]}deg) translateY(${-linkHalf}px`;
    const end = `scale(30) rotate(${degree[i]+360*10}deg) translateY(${-linkHalf}px`;
    line.style.transform = start;
    document.documentElement.style.setProperty(`--sps${i}`, start);
    document.documentElement.style.setProperty(`--spe${i}`, end);
    /*spin[i] = [
      [{ transform: start }, { transform: end }],
      [{ duration: 3000, iterations: 1, fill:'both'}]  
    ];*/
  }
  
  //other spots
  const style6 = document.getElementById(`s6`).style;
  style6.left = `${mid.x - 220}px`;
  style6.top = `${mid.y - 60}px`;
  const style7 = document.getElementById(`s7`).style;
  style7.left = `${mid.x + 220}px`;
  style7.top = `${mid.y - 80}px`;
  const style8 = document.getElementById(`s8`).style;
  style8.left = `${mid.x + 200}px`;
  style8.top = `${mid.y}px`;
  const style9 = document.getElementById(`s9`).style;
  style9.left = `${mid.x}px`;
  style9.top = `${mid.y}px`;
  const style10 = document.getElementById(`s10`).style;
  style10.left = `${mid.x + 20}px`;
  style10.top = `${mid.y - 40}px`;
  const style11 = document.getElementById(`s11`).style;
  style11.left = `${mid.x - 130}px`;
  style11.top = `${mid.y + 50}px`;
  /*
  const circle = document.getElementById('circle');
  circle.style.width = `${R*2}px`;
  circle.style.height = `${R*2}px`;
  circle.style.left = `${center.x}px`;
  circle.style.top = `${center.y}px`; */
};

const createWords = (chr) => {
  const endContainer = document.getElementById('end');
  const chrContainer = document.createElement('div');
  chrContainer.setAttribute('class', 'end-letter');
  chrContainer.innerHTML = chr;
  endContainer.appendChild(chrContainer);
}


const theEnd = () => {
  setTimeout(() => document.getElementById('end-container').style.display = 'flex', 3000);
  let time = 3500
  for (let i = 0; i < script.length; i++) {
    time += 80;
    if (i > 0 && (script[i-1] === '，' || script[i-1] === '？' || script[i-1] === '。')) time += 250;
    setTimeout(() => createWords(script[i]),  time);
  }

  setTimeout(() => document.getElementById('tag').style.animation = `show 1s forwards`, time + 100);
  setTimeout(() => document.getElementById('pass').style.display = `block`, time + 1100);
    
}

addEventListener("resize", () => setLengths());
addEventListener("keydown", e => {
  if (stage === 0) {
    if (password[passwordPos] === e.key.toLowerCase()) {
      passwordPos += 1;
      document.getElementById(`p${passwordPos}`).innerText = e.key.toLowerCase()
      if (passwordPos === 10) {
        document.getElementById('first').style.animation = 'right 1.5s forwards';
        stage++;
      } 
    }
  }else if (stage === 2) {
    if (key[letterPos] === e.key.toUpperCase()) {
      letterPos += 1;
      document.getElementById(`lt${letterPos}`).innerText = e.key.toUpperCase()
      if (letterPos === 5) {
        document.getElementById('guide').style.animation = 'show 1s reverse both';
        document.getElementById('map').style.animation = 'show 1s reverse both';
        document.getElementById('key').style.animation = 'show 1s reverse both';
        for (let i = 1; i <= 11; i++) {
          document.getElementById(`s${i}`).style.animation = 'show 1s reverse both';
        }
        for (let i = 1; i <= 5; i++) {
          //console.log(document.getElementById(`l${i}`), spin);
          //document.getElementById(`l${i}`).animate(spin[i][0], spin[i][1])
          const line = document.getElementById(`l${i}`)
          line.style.width = '228.2536px';
          line.style.animation = `spin${i} 3s ease-in forwards`;
        }
        const white = document.getElementById('white');
        white.style.left = center.x + 'px';
        white.style.top = center.y + 'px';
        white.style.animation = 'magnify 3s ease-in forwards'
        theEnd();
      }
    }
  }
})