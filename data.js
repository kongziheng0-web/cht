const firebaseConfig = {
  apiKey: "YOUR_KEY",
  databaseURL: "YOUR_DB_URL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const ref = db.ref("familyKitchen");

let state = {
  menu: [],
  foods: [],
  systemName: "我的厨房",
  banner: "",
  avatar: ""
};

ref.on("value",snap=>{
  if(snap.val()){
    state = snap.val();
    render();
  }
});

function save(){
  ref.set(state);
}
