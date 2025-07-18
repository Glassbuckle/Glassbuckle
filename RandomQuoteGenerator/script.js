// 获取 DOM 元素
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const buttonEl = document.getElementById("new-quote");

// 获取语录并显示
function fetchQuote() {
  // 移除旧动画
  quoteEl.classList.remove("fade-in");
  authorEl.classList.remove("fade-in");

  // 添加淡出动画
  quoteEl.classList.add("fade-out");
  authorEl.classList.add("fade-out");

  // 请求 API
  fetch("https://v1.hitokoto.cn/")
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        // 更新语录和来源
        quoteEl.textContent = data.hitokoto;
        authorEl.textContent = "—— " + (data.from || "佚名");

        // 切换为淡入动画
        quoteEl.classList.remove("fade-out");
        authorEl.classList.remove("fade-out");
        quoteEl.classList.add("fade-in");
        authorEl.classList.add("fade-in");
      }, 400); // 与 CSS 动画时间一致
    })
    .catch(error => {
      console.error("请求失败：", error);
      quoteEl.textContent = "出错了，没能获取语录 🥲";
      authorEl.textContent = "";
    });
}

// 按钮点击事件
buttonEl.addEventListener("click", fetchQuote);

// 页面加载时自动获取一句
window.addEventListener("DOMContentLoaded", fetchQuote);

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
