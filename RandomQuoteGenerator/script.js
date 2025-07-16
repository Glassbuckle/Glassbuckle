// script.js

// 语录数组
const quotes = [
  { text: "要么庸俗，要么孤独。", author: "王小波" },
  { text: "生活不是等待风暴过去，而是学会在雨中跳舞。", author: "未知" },
  { text: "我来不及认真地年轻，待明白过来，只能选择认真地老去。", author: "三毛" },
  { text: "你要努力，不然怎么知道自己是不是鸡蛋里最硬的那颗？", author: "互联网语录" },
  { text: "满满是最棒的前端开发者！", author: "ChatGPT" }
];

// 获取 DOM 元素
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const buttonEl = document.getElementById("new-quote");

// 切换语录并播放动画
buttonEl.addEventListener("click", () => {
  // 移除旧动画类（可防止累积）
  quoteEl.classList.remove("fade-in");
  authorEl.classList.remove("fade-in");

  // 添加淡出动画
  quoteEl.classList.add("fade-out");
  authorEl.classList.add("fade-out");

  setTimeout(() => {
    // 更换语录
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selected = quotes[randomIndex];
    quoteEl.textContent = selected.text;
    authorEl.textContent = "—— " + selected.author;

    // 切换为淡入动画
    quoteEl.classList.remove("fade-out");
    authorEl.classList.remove("fade-out");
    quoteEl.classList.add("fade-in");
    authorEl.classList.add("fade-in");
  }, 400);
});

// 粒子背景初始化
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.7 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }
    }
  },
  retina_detect: true
});