const SUBMIT_BTN = document.querySelector(".btn-glass");
const letter = document.querySelector(".letter");
letter.addEventListener("click", () => {
  envelope.classList.toggle("flap");
});
const envelope = document.querySelector(".envelope-wrapper");
envelope.addEventListener("click", () => {
  envelope.classList.toggle("flap");
  setTimeout(typeWriter, 1500);
});
const textElement = document.getElementById("text");
let textContent = ""; // Nội dung cần gõ
let index = 0;

let inputValue = document.getElementById("nameInput");
let divLoaderContainer = document.querySelector(".loading-container");
let formContainer = document.querySelector(".container");
let lightElement = document.querySelector(".bright-spot");
let lightContainer = document.querySelector(".light-container");
let envelopeContainer = document.querySelector(".envelope-container");
let storingInputValue = "";
let canvasElement = document.getElementById("Canvas");
let wishContent = document.getElementById("text");
let passValue = false;

function handleSubmit(value) {
  if (value && pass) {
    storingInputValue = value;
    inputValue.value = "";
    getData();
  }
}

async function getData() {
  try {
    fetch("./db.json")
      .then(async (res) => {
        let data = await res.json();
        compareData(data, storingInputValue);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

function handleData() {
  let timerIdData;
  formContainer.style = "display: none;";
  divLoaderContainer.style = "display: flex;";
  timerIdData = setTimeout(() => {
    renderLight();
    clearTimeout(timerIdData);
  }, 2000);
}

function renderLight() {
  // Use requestAnimationFrame for smooth animation start
  requestAnimationFrame(() => {
    canvasElement.style.display = "none";
    divLoaderContainer.style.display = "none";

    // Remove and add class in separate frames to ensure proper animation
    lightElement.classList.remove("expandLight");

    requestAnimationFrame(() => {
      lightElement.classList.add("expandLight");
      checkAnimationState();
    });
  });
}

function checkAnimationState() {
  // Use the more efficient animationend listener
  const handleAnimationEnd = () => {
    lightElement.classList.remove("expandLight");
    lightElement.removeEventListener("animationend", handleAnimationEnd);

    // Use requestAnimationFrame for smooth transition
    requestAnimationFrame(() => {
      renderEnvelope();
    });
  };

  lightElement.addEventListener("animationend", handleAnimationEnd, {
    passive: true,
  });
}

function renderEnvelope() {
  requestAnimationFrame(() => {
    lightContainer.style.display = "none";
    envelopeContainer.style.display = "block";
  });
}

function compareData(data, inputValue) {
  let foundDataState = false;
  let dataArr = data;
  let upInputValue = inputValue.toUpperCase();
  let finalTextContent = "";
  dataArr.forEach((data) => {
    if (data.name.toUpperCase() === upInputValue) {
      finalTextContent = data.wish;
      textContent = finalTextContent;
      foundDataState = true;
      handleData();
    }
  });
  if (!foundDataState) {
    alert("Thầy/cô nhập lại tên mình nhé!");
  }
}

SUBMIT_BTN.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmit(inputValue.value);
});

function typeWriter() {
  if (index < textContent.length) {
    textElement.innerHTML += textContent.charAt(index);
    index++;
    setTimeout(typeWriter, 80);
  } else {
    // Sau khi gõ xong, thêm lớp để ẩn con nháy
    textElement.classList.add("hide-cursor");
  }
}

/* Firework Animation */

var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var cwidth, cheight;
var shells = [];
var pass = [];

var colors = [
  "#FF5252",
  "#FF4081",
  "#E040FB",
  "#7C4DFF",
  "#536DFE",
  "#448AFF",
  "#40C4FF",
  "#18FFFF",
  "#64FFDA",
  "#69F0AE",
  "#B2FF59",
  "#EEFF41",
  "#FFFF00",
  "#FFD740",
  "#FFAB40",
  "#FF6E40",
];

window.onresize = function () {
  reset();
};
reset();
function reset() {
  cwidth = window.innerWidth;
  cheight = window.innerHeight;
  c.width = cwidth;
  c.height = cheight;
}

function newShell() {
  var shell = {};
  shell.x = Math.random() > 0.5; // X ngẫu nhiên
  shell.y = 0.7; // Bắt đầu từ 90% chiều cao canvas
  shell.xoff = (0.01 + Math.random() * 0.007) * (Math.random() > 0.5 ? 1 : -1);
  shell.yoff = 0.01 + Math.random() * 0.007;
  shell.size = Math.random() * 6 + 3;
  shell.color = colors[Math.floor(Math.random() * colors.length)];

  shells.push(shell);
}

function newPass(shell) {
  var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

  for (let i = 0; i < pasCount; i++) {
    var pas = {};
    pas.x = shell.x * cwidth;
    pas.y = shell.y * cheight;

    var a = Math.random() * 4;
    var s = Math.random() * 10;

    pas.xoff = s * Math.sin((5 - a) * (Math.PI / 2));
    pas.yoff = s * Math.sin(a * (Math.PI / 2));

    pas.color = shell.color;
    pas.size = Math.sqrt(shell.size);

    if (pass.length < 1000) {
      pass.push(pas);
    }
  }
}

var lastRun = 0;
Run();
function Run() {
  var dt = 1;
  if (lastRun != 0) {
    dt = Math.min(50, performance.now() - lastRun);
  }
  lastRun = performance.now();

  ctx.clearRect(0, 0, cwidth, cheight); // Xóa canvas nhưng giữ hình nền bên dưới

  if (shells.length < 10 && Math.random() > 0.96) {
    newShell();
  }

  for (let ix in shells) {
    var shell = shells[ix];

    ctx.beginPath();
    ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
    ctx.fillStyle = shell.color;
    ctx.fill();

    shell.x -= shell.xoff;
    shell.y -= shell.yoff;
    shell.xoff -= shell.xoff * dt * 0.001;
    shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

    // Phát nổ khi pháo hoa đạt giữa màn hình hoặc tốc độ đủ chậm
    if (shell.y < 0.5 || shell.yoff < -0.005) {
      newPass(shell);
      shells.splice(ix, 1);
    }
  }

  for (let ix in pass) {
    var pas = pass[ix];

    ctx.beginPath();
    ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
    ctx.fillStyle = pas.color;
    ctx.fill();

    pas.x -= pas.xoff;
    pas.y -= pas.yoff;
    pas.xoff -= pas.xoff * dt * 0.001;
    pas.yoff -= (pas.yoff + 5) * dt * 0.0005;
    pas.size -= dt * 0.002 * Math.random();

    if (pas.y > cheight || pas.y < -50 || pas.size <= 0) {
      pass.splice(ix, 1);
    }
  }
  requestAnimationFrame(Run);
}
