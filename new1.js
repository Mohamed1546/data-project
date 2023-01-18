let mood = "create";
let searchmood = "title";
function getTotal() {
  if (price.value != "") {
    r = +price.value + +taxses.value + +ads.value - +discount.value;
    document.getElementById("total").innerHTML = r;
    document.getElementById("total").style.background = "red";
  } else {
    document.getElementById("total").style.background = "none";
    document.getElementById("total").innerHTML = "Total";
  }
}
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
let tmp;
function submit() {
  newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxses: taxses.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create") {
    if (6000 > datapro.count >= 1) {
      for (i = 0; i < datapro.length; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  } else {
    datapro[tmp] = newpro;
    mood = "create";
    document.getElementById("submit").innerHTML = "create";
  }

  localStorage.setItem("product", JSON.stringify(datapro));
  console.log(datapro);
  ff();
  showdata();
}

function ff() {
  title.value = "";
  price.value = "";
  taxses.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
function showdata() {
  let table = "";
  for (i = 0; i < datapro.length; i++) {
    table += `<tr><td>${i + 1}</td><td>${datapro[i].title}</td><td>${
      datapro[i].price
    }</td><td>${datapro[i].taxses}</td><td>${datapro[i].ads}</td><td>${
      datapro[i].discount
    }</td><td>${datapro[i].total}</td><td>${datapro[i].count}</td><td>${
      datapro[i].category
    }</td><td><button id="update" onclick="updatedata(${i})">update</button></td><td><button id= "delete" onclick="deletedata(${i})">delete</button></td><td><button id= "copy" onclick="copydata(${i})">copy</button></td></tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  if (datapro.length > 0) {
    document.getElementById(
      "deleteAll"
    ).innerHTML = `<button onclick="deleteall()">delete all (${datapro.length})</button>`;
  } else {
    document.getElementById("deleteAll").innerHTML = "";
  }
}
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}
function deleteall() {
  localStorage.clear();
  datapro.splice(0);
  showdata();
}
function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxses.value = datapro[i].taxses;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  count.value = datapro[i].count;
  getTotal();
  category.value = datapro[i].category;
  document.getElementById("submit").innerHTML = "update";
  tmp = i;
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
function getsearchmood(id) {
  if (id == "by_id") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }
  search.placeholder = "search by " + searchmood;
  document.getElementById("search").focus;
}
function searchdata(value) {
  let table = "";
  if (searchmood == "title") {
    for (i = 0; i < datapro.length; i++) {
      if (datapro[i].title.toLowerCase().includes(value)) {
        table += `<tr><td>${i + 1}</td><td>${datapro[i].title}</td><td>${
          datapro[i].price
        }</td><td>${datapro[i].taxses}</td><td>${datapro[i].ads}</td><td>${
          datapro[i].discount
        }</td><td>${datapro[i].total}</td><td>${datapro[i].count}</td><td>${
          datapro[i].category
        }</td><td><button id="update" onclick="updatedata(${i})">update</button></td><td><button id= "delete" onclick="deletedata(${i})">delete</button><td><button id= "copy" onclick="copydata(${i})">copy</button></td></tr>`;
      }
    }
  } else {
    for (i = 0; i < datapro.length; i++) {
      if (datapro[i].category.toLowerCase().includes(value)) {
        table += `<tr><td>${i + 1}</td><td>${datapro[i].title}</td><td>${
          datapro[i].price
        }</td><td>${datapro[i].taxses}</td><td>${datapro[i].ads}</td><td>${
          datapro[i].discount
        }</td><td>${datapro[i].total}</td><td>${datapro[i].count}</td><td>${
          datapro[i].category
        }</td><td><button id="update" onclick="updatedata(${i})">update</button></td><td><button id= "delete" onclick="deletedata(${i})">delete</button></td><td><button id= "copy" onclick="copydata(${i})">copy</button></td></tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
function copydata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxses.value = datapro[i].taxses;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    count.value = datapro[i].count;
    category.value = datapro[i].category;
    getTotal();
}
