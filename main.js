const R = 120;
let phi = 2.3;
const H = 533.6;
const spots = [];
const key = 'CYCLE';
let password;

let clicks = 0;
let stage = 0;
let passwordPos = 0;
let letterPos = 0;
let start;

const setUp = () => {
  console.log(start);
  switch (start) {
    case 'eg': 
      phi += 2*Math.PI/5;
      password = 'egusnobrgl';
      break;
    case 'no': 
      phi += 2*Math.PI/5 * 2;
      password = 'nobrglegus';
      break;
    case 'gl': 
      phi += 2*Math.PI/5 * 3;
      password = 'glegusnobr';
      break;
    case 'us': 
      phi += 2*Math.PI/5 * 4;
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
    clicks += 1;
    for (let i = clicks; i > 0; i--) {
      document.getElementById(`s${i}`).style.animation = 'none';
      setTimeout(() => addAnimation(i), 1);
    }
    if (clicks === 5) {
      stage++; 
      document.getElementById('key').style.display = 'flex';
    }
  }
}

const setLengths = () => {
  const mid = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
  }
  const center = {
    x: mid.x - 60,
    y: mid.y - 35 ,
  }

  // setting of guide sentence and the key
  document.getElementById('guide').style.marginTop = `${(mid.y - H/2) / 2}px`;
  document.getElementById('key').style.bottom = `${(mid.y - H/2) / 2}px`;
  
  //settings of map
  const map = document.getElementById('map');
  map.style.left = `${mid.x}px`;
  map.style.top = `${mid.y}px`;;
  
  // correct spots
  for (let i = 1; i <= 5; i++) {
    const spot = document.getElementById(`s${i}`)
    spot.style.left = `${center.x + R*Math.sin(-4*Math.PI/5 * i + phi)}px`;
    spot.style.top = `${center.y + R*Math.cos(-4*Math.PI/5 * i + phi)}px`;
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

const theEnd = () => {}

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
      }
    }
  }
})