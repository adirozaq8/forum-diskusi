function newMessage(name, message){
  const alpha = "abcdefghijklmnopqrstuvwxyz"
  let avatar = ""
  if (name === "Anonymous"){
    avatar = "anonymous.png"
  } else if (alpha.indexOf(name[0].toLowerCase()) !== -1){
    avatar = name[0].toLowerCase() + ".png"
  } else {
    avatar = "avatar.png"
  }
  return `<article class="container card">
            <div class="card-container">
                <img class="avatar" src="./assets/pictures/avatars/${avatar}" alt="${name}">
              <div>
                <h4 class="no-margin nama-card">${name}</h4>
                <p class="no-margin text-card">${message}</p>    
              </div>
            </div>
          </article>`
}

function changeName(name_input, name_query){
  if (name_input){
    name_query.innerText = name_input
  } else {
    name_input = "Anonymous"
    name_query.innerText = name_input
  }
}

// Jika user belum "login"
if (typeof(Storage) !== "undefined") {
  if (!sessionStorage.getItem("user")){
    let name_input = prompt("Siapa nama kamu?")
    if (!name_input){
      name_input = "Anonymous"
    }
    sessionStorage.setItem("user", name_input);
  }
} else {
  alert("Broser tidak mendukung sessionStorage")
}

const name_input = sessionStorage.getItem("user")
const name_query = document.querySelector("#nama")
changeName(name_input, name_query)

// Dumping data
if (!sessionStorage.getItem("data")){
  var postsArray = [
    {
      name: "Akbar", 
      message: "Selamat siang teman2, bagaimana kabarnya? sudah sangat lama kita tidak membahas hal2 mengenai proyek akhir tahun ini. Saya mengundang kalian untuk datang rapat pada malam hari ini. Bagaimana teman-teman, apakah malam ini kalian bisa?"
    }, 
    {
      name: "Hadi", 
      message: "Menurut saya, akan lebih baik jika ditunda dahulu, karena cuaca tidak memungkinkan, bagaimana dengan yang lain?"
    },
    {
      name: "Muflih", 
      message: "Saya setuju dengan hadi, alangkah baiknya ditunda dulu saja"
    },
    {
      name: "Putri", 
      message: "Saya juga setuju dengan hadi, cuaca benar2 tidak memungkinkan"
    },
    {
      name: "Akbar", 
      message: "Tapi menurut saya, bukannya masalah ini harus cepat selesai? alangkah baiknya segera dilakukan rapat"
    }
  ];
  window.sessionStorage.setItem("data", JSON.stringify(postsArray));
}

// Mengubah string ke array
var storedArray = JSON.parse(sessionStorage.getItem("data"));

// Querying artikel
let article = document.querySelector("#articles")
for (let i = storedArray.length-1; i >= 0 ; i--) {
  article.innerHTML += newMessage(storedArray[i]['name'], storedArray[i]['message'])
}

// Fitur posting / mengirim pesan
const button_kirim = document.querySelector("#kirim")
let text_message = document.querySelector("#message")
button_kirim.addEventListener("click", function(){
  const name_input = sessionStorage.getItem("user")
  if(text_message.value){
    storedArray.push({
      name: name_input,
      message: text_message.value
    })
    window.sessionStorage.setItem("data", JSON.stringify(storedArray))
    article.innerHTML = newMessage(name_input, text_message.value) + article.innerHTML.slice(0, article.innerHTML.length)
    text_message.value = ""
  }
})

// Logout
const logout = document.querySelector("#logout")
logout.addEventListener("click", function(){
  sessionStorage.removeItem("user")
  const user_baru = prompt("Siapa nama kamu?")
  sessionStorage.setItem("user", user_baru)
  changeName(user_baru, name_query)
})

// Fitur Search username atau message
const searchBar = document.querySelector("#search-bar")
const btnSearchBar = document.querySelector("#search-bar-button")
btnSearchBar.addEventListener("click", function(e){
  searchBar.value = searchBar.value.toLowerCase()
  article.innerHTML = ""
  for (let i = storedArray.length-1; i >= 0 ; i--) {
    let name = storedArray[i]['name']
    let message = storedArray[i]['message']
    if(name.toLowerCase().includes(searchBar.value) || message.toLowerCase().includes(searchBar.value)){
      article.innerHTML += newMessage(storedArray[i]['name'], storedArray[i]['message'])
    }
  }
  searchBar.value = ""
})