particlesJS("particles-js", {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.9 },
        size: { value: 3.5, random: true },
        move: { enable: true, speed: 0.6 },
        line_linked: { enable: false }
    },
    interactivity: {
        events: { onhover: { enable: true, mode: "repulse" } },
        modes: { repulse: { distance: 50 } }
    },
    retina_detect: true
});

const audio = document.getElementById("bgm");
const visualizer = document.getElementById("visualizer");

const colors = [
    "#b2eaff", "#c9f0ff", "#d5faff", "#e8fcff",
    "#c2f0e2", "#b8f3f0", "#daf5f2", "#ffffff"
];

const bars = [];
const particlesPerBar = 8;
const barCount = 80;

for (let i = 0; i < barCount; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");

    const particles = [];
    for (let j = 0; j < particlesPerBar; j++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        bar.appendChild(particle);
        particles.push(particle);
    }

    visualizer.appendChild(bar);
    bars.push(particles);
}

// 控制跳动频率
const animationInterval = 60;

function animateBars() {
    if (!audio.paused) {
        bars.forEach(particles => {
            const activeCount = Math.floor(Math.random() * particlesPerBar);

            particles.forEach((p, idx) => {
                if (idx < activeCount) {
                    const color1 = colors[Math.floor(Math.random() * colors.length)];
                    const color2 = colors[Math.floor(Math.random() * colors.length)];
                    p.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
                    p.style.boxShadow = `0 0 6px ${color2}`;
                    p.style.opacity = 1;
                } else {
                    p.style.opacity = 0.15;
                    p.style.background = `linear-gradient(45deg, #d0f0ff, #e0f7fa)`;
                    p.style.boxShadow = "none";
                }
            });
        });
    } else {
        // 音乐暂停时的样式
        bars.forEach(particles => {
            particles.forEach((p, idx) => {
                if (idx < 2) {
                    p.style.opacity = 0.4;
                } else {
                    p.style.opacity = 0;
                }
                p.style.background = `linear-gradient(45deg, #ccc, #eee)`;
                p.style.boxShadow = "none";
            });
        });
    }
}

// 启动定时更新粒子
setInterval(animateBars, animationInterval);

function toggleMusic() {
    if (audio.paused) audio.play();
    else audio.pause();
}

document.body.addEventListener("click", () => {
    if (audio.paused) audio.play();
}, { once: true });
