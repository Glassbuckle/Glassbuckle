const catImg = document.getElementById("cat-img");
const btn = document.getElementById("load-cat");

function loadCat() {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then(res => res.json())
    .then(data => {
      console.log("猫图地址：", data[0].url); 
      catImg.src = data[0].url;              
    })
    .catch(err => {
      console.error("猫猫加载失败", err);
      catImg.alt = "出错啦~ 猫猫躲起来了";
    });
}


loadCat();
btn.addEventListener("click", loadCat);
