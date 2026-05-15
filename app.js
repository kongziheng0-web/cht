let currentFood = null;
let tab = "all";

/* ---------------- 渲染 ---------------- */

function render(){

document.getElementById("systemNameText").innerText = state.systemName;

renderFoods();
renderMenu();
}

function renderFoods(){

let list = state.foods;

if(tab !== "all"){
list = list.filter(i=>i.category===tab);
}

let html = "";

list.forEach(f=>{
html += `
<div class="card" onclick='openDetail(${JSON.stringify(f)})'>
<h4>${f.name}</h4>
<p>${f.time}分钟</p>
</div>`;
});

document.getElementById("foodList").innerHTML = html;
}

/* ---------------- TAB ---------------- */

function switchTab(t){
tab = t;
renderFoods();
}

/* ---------------- 详情 ---------------- */

function openDetail(f){
currentFood = f;

document.getElementById("detail").innerHTML = `
<h2>${f.name}</h2>
<p>${f.ingredients}</p>
<p>${f.steps}</p>
`;

show("detailPage");
}

function closeDetail(){
hideAll();
}

/* ---------------- 菜单 ---------------- */

function addToMenu(){
state.menu.push(currentFood);
save();
alert("已加入菜单");
}

function renderMenu(){
let html = "";

state.menu.forEach((m,i)=>{
html += `
<div>
${m.name}
<button onclick="removeMenu(${i})">删除</button>
</div>`;
});

document.getElementById("menuList").innerHTML = html;
}

function removeMenu(i){
state.menu.splice(i,1);
save();
}

function clearMenu(){
state.menu = [];
save();
}

/* ---------------- 买菜清单 ---------------- */

function shoppingList(){

let map = {};

state.menu.forEach(f=>{
let arr = (f.ingredients || "").split(",");
arr.forEach(i=>{
map[i] = (map[i]||0)+1;
});
});

let txt = "";
for(let k in map){
txt += `${k} × ${map[k]}\n`;
}

alert(txt);
}

/* ---------------- 做饭顺序 ---------------- */

function makePlan(){

let total = 0;
state.menu.forEach(f=>total+=Number(f.time||0));

alert("总耗时：" + total + "分钟");
}

/* ---------------- AI生成 ---------------- */

async function aiGenerate(){

let name = document.getElementById("aiInput").value;

let res = await fetch("https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",{
method:"POST",
headers:{
"Authorization":"Bearer YOUR_KEY",
"Content-Type":"application/json"
},
body:JSON.stringify({
model:"qwen-turbo",
input:{
messages:[{role:"user",content:`生成菜谱 ${name} JSON`} ]
}
})
});

let data = await res.json();

let result = JSON.parse(data.output.choices[0].message.content);

document.getElementById("name").value = result.name;
document.getElementById("category").value = result.category;
document.getElementById("time").value = result.time;
document.getElementById("ingredients").value = result.ingredients;
document.getElementById("steps").value = result.steps;
}

/* ---------------- 添加菜品 ---------------- */

function addFood(){

state.foods.push({
name:document.getElementById("name").value,
category:document.getElementById("category").value,
time:document.getElementById("time").value,
ingredients:document.getElementById("ingredients").value,
steps:document.getElementById("steps").value
});

save();
alert("添加成功");
}

/* ---------------- 设置 ---------------- */

function saveSetting(){
state.systemName = document.getElementById("setName").value;
save();
}

/* ---------------- UI ---------------- */

function show(id){
hideAll();
document.getElementById(id).style.display="block";
}

function hideAll(){
document.querySelectorAll(".page").forEach(p=>p.style.display="none");
}
