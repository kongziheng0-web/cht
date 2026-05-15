let data = [...foods];

function render(list){
  document.getElementById("list").innerHTML =
    list.map(i=>`
      <div class="card">
        <h3>${i.name}</h3>
        <p>${i.type}</p>
        <p>${i.time}分钟</p>
      </div>
    `).join("");
}

render(data);

function filter(type){
  if(type==="全部") return render(data);
  render(data.filter(i=>i.type===type));
}

function searchFood(){
  let v = document.getElementById("search").value;
  render(data.filter(i=>i.name.includes(v)));
}