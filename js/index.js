let addMemberBtn = document.getElementById("add-member");
let box = document.getElementById("all-box");
let xMark = document.querySelectorAll("#x-mark");
let form = document.getElementById("form");
let miniBox = document.getElementById("mini-box");
let firstName = document.getElementById("f-name");
let lastName = document.getElementById("l-name");
let age = document.getElementById("age");
let city = document.getElementById("city");
let position = document.getElementById("position");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let image = document.getElementById("image");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let imgcontain = document.getElementById("img-contain");
let imgBox = document.getElementById("img-box");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let noMember = document.getElementById("no-members");
let tbody = document.getElementById("tbody");
let wrong = document.getElementById("wrong");
let deleteAll = document.getElementById("delete-all");
let inputs = document.querySelectorAll(".input");

let mood = "add";
let index;
let imgIndex;
let found;
let imgSrc;
// show box
addMemberBtn.addEventListener("click", () => {
  showBox();
});
function showBox() {
  box.classList.remove("d-none");
  mood = "add";
}
// close box
for (let i = 0; i < xMark.length; i++) {
  xMark[i].addEventListener("click", () => {
    close();
  });
}
document.body.addEventListener("click", (e) => {
  if (e.target == box) {
    close();
  } else if (e.target == imgcontain) {
    close();
  } else if (e.key == "ArrowRight") {
    nextPrev(1);
  } else if (e.key == "ArrowLeft") nextPrev(-1);
});
document.body.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    close();
  }
});
function close() {
  box.classList.add("d-none");
  imgcontain.classList.add("d-none");
  submit.innerHTML = "add memeber";
  submit.style.cssText = `
background:auto;
color:auto;
`;
}
// preventdefault of form
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
// create elemet
let allDate;
if (localStorage.member != null) {
  allDate = JSON.parse(localStorage.member);
  display();
} else {
  allDate = [];
}
function noMembers() {
  if (allDate.length == 0) {
    noMember.innerHTML = "no members yet";
  } else {
    noMember.innerHTML = "";
  }
}
noMembers();
submit.addEventListener("click", () => {
  if (
    [firstName, lastName, age, city, position, phone, email, image].every(
      (input) => input.classList.contains("is-valid")
    )
  ) {
    let memberData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      age: age.value,
      city: city.value.trim(),
      position: position.value.trim(),
      email: email.value.trim(),
      phone: phone.value,
      image: image.files[0]
        ? `./images/${image.files[0].name}`
        : `./images/work-2.jpg`,
    };
    if (mood == "add") {
      allDate.push(memberData);
    } else {
      allDate[index] = memberData;
      mood = "add";
      memberData.image = image.files[0]
        ? `./images/${image.files[0].name}`
        : imgSrc;
      submit.innerHTML = "add memeber";
      submit.style.cssText = `
background:auto;
color:auto;
`;
    }
    localStorage.setItem("member", JSON.stringify(allDate));
    display();
    clearData();
    close();
    noMembers();
  } else {
    wrong.innerHTML = "all inputs must be valid";
    wrong.classList.add("p-2");
  }
});
// displayDate
function display() {
  let table = ``;
  for (let i = 0; i < allDate.length; i++) {
    let name = allDate[i].firstName.replace(
      search.value,
      `<span class="bg-warning">${search.value}</span>`
    );
    if (
      allDate[i].firstName.toLowerCase().includes(search.value.toLowerCase())
    ) {
      table += `
                          <tr>
                        <td>${i + 1}</td>
                        <td> <img class="img" src="${allDate[i].image}"></td>
                        <td>${name} ${allDate[i].lastName}</td>
                        <td>${allDate[i].age}</td>
                        <td>${allDate[i].city}</td>
                        <td>${allDate[i].position}</td>
                        <td>${allDate[i].email}</td>
                        <td>${allDate[i].phone}</td>
                        <td><i class="fa-solid fa-pen-to-square edite btn btn-outline-warning" onclick="setUpdate(${i})"></i> <i class="fa-solid fa-trash btn btn-outline-danger" onclick="deleteItem(${i})"></i> <i class="fa-solid fa-eye btn btn-outline-success show-img" onclick="showImage(${i})"></i></td>
                      </tr>
              `;
      found = true;
    } else {
      found = false;
    }
    if (found != true) {
      noMember.innerHTML = "no match";
    } else {
      noMember.innerHTML = "";
    }
  }
  if (allDate.length > 0) {
    deleteAll.classList.remove("d-none");
  } else {
    deleteAll.classList.add("d-none");
  }
  tbody.innerHTML = table;
}
// delete item
function deleteItem(i) {
  allDate.splice(i, 1);
  localStorage.member = JSON.stringify(allDate);
  display();
  noMembers();
}
// clear data
function clearData() {
  firstName.value = "";
  lastName.value = "";
  age.value = "";
  city.value = "";
  position.value = "";
  email.value = "";
  phone.value = "";
  image.value = "";
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("is-valid");
  }
  wrong.innerHTML = "";
  wrong.classList.remove("p-2");
}
// show image
let seeImage = document.querySelectorAll(".show-img");
function showImage(i) {
  imgcontain.classList.remove("d-none");
  let src = allDate[i].image;
  imgBox.style.backgroundImage = `url(${src})`;
  imgIndex = i;
}

// next & prev

next.addEventListener("click", () => {
  nextPrev(1);
});
prev.addEventListener("click", () => {
  nextPrev(-1);
});

function nextPrev(steps) {
  imgIndex += steps;
  if (imgIndex > allDate.length - 1) {
    imgIndex = 0;
  } else if (imgIndex < 0) {
    imgIndex = allDate.length - 1;
  }
  let src = allDate[imgIndex].image;
  imgBox.style.backgroundImage = `url(${src})`;
}

document.body.addEventListener("keyup", (e) => {
  if (e.key == "ArrowRight") {
    nextPrev(1);
  } else if (e.key == "ArrowLeft") nextPrev(-1);
});
// update

function setUpdate(i) {
  let img = document.querySelectorAll(".img");
  showBox();
  firstName.value = allDate[i].firstName;
  lastName.value = allDate[i].lastName;
  age.value = allDate[i].age;
  city.value = allDate[i].city;
  position.value = allDate[i].position;
  email.value = allDate[i].email;
  imgSrc = img[i].src;
  phone.value = allDate[i].phone;
  submit.innerHTML = "update";
  submit.style.cssText = `
background:#FFCA2C;
color:#120b0b;
`;
  mood = "update";
  index = i;
  let inputvalid = [
    firstName,
    lastName,
    age,
    city,
    position,
    email,
    phone,
    image,
  ];
  for (let i = 0; i < inputvalid.length; i++) {
    inputvalid[i].classList.add("is-valid");
  }
}
// search
search.addEventListener("input", () => {
  display();
});
// validation
let regexs = [
  /^[A-Za-z]{3,10}$/,
  /^[A-Za-z]{3,10}$/,
  /^\d{1,2}$/,
  /^[A-Za-z]{1,10}\s?[A-Za-z]{1,10}?$/,
  /^[A-Za-z]{1,10}\s?[A-Za-z]{1,10}?$/,
  /^\w{1,15}[a-zA-Z0-9._%+-]+@gmail\.com$/,
  /^(002|\+02)?01[1205]\d{8}$/,
  /^.+\.(jpg|png|gif|jpeg)$/,
];
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", (e) => {
    valid(regexs[i], e.target);
  });
}
function valid(regex, input) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}
// delete all
deleteAll.addEventListener("click", () => {
  localStorage.clear();
  allDate.splice(0);
  display();
  noMembers();
});
