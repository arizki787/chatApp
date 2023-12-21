<template>
  <div id="app">
    <div v-if="islogin == false" class="register">
      <h1>Sign In</h1>
      <input v-model="email" type="text" placeholder="Enter Email" />
      <input v-model="pass" type="password" placeholder="Enter Password" />
      <button @click="login()">Sign In</button>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
    <div v-if="islogin ==  true">
      <div class="card">
            <h1>Chats!</h1>
            <div class="profile">
            <p>Your Profile: {{ dataLogin.user.username }}</p>
            <p>ID: {{ dataLogin.user.id }}</p>
            </div>
            <button @click="logout">Logout</button>
          </div>
          <!-- pilih user  -->
          <div class="card">
            <h1>masukkan id user</h1>
            <input v-model="userdata" placeholder="Channel" /> 
            <button @click="setId">setId</button>
        </div>

        <!-- Let's Talk Card -->
        <div class="card">
          <h1>Let's Talk</h1>
          <textarea v-model="message" placeholder="Type your message"></textarea>
          <button @click="sendMessage">Send</button>
        </div>
        
        <div class="card">
          <h1>Tampilan Chat</h1>
          <ul id="messagelist">
            <li v-for="chat in hasilChat.docs" :key="chat">
              <p>{{ chat.content }}</p>
            </li>
          </ul>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let email = ref("");
let pass = ref("");
let islogin = ref(false)
let dataLogin = ref("")
let error = ref("");
let message = ref("");
let userdata = ref(""); //id masuk ke sini
let hasilChat = ref("")

const setId = () => {
  // userdata = userdata.value
  // console.log(userdata);
};

const logout = async () => {
  try {
    const req = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST", 
      credentials: "include",
      headers: {
        "Content-Type"    : "application/json",
      },
    })
    const data = await req.json();
    console.log(data);
    dataLogin = "";
    islogin.value = false;
  } catch (err) {
    console.log(err)
  }
}

const login = async () => {
  try {
    const req = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: pass.value,
      }),
    });
    
    if (!req.ok) {
      error.value = data.message || "Login failed";
      return;
    }
    const data = await req.json(); //menggunakan data ini ke homeView.vue
    console.log(data);
    dataLogin.value = data;
    islogin.value = true;
    console.log(dataLogin.value.user.id)
    
  } catch (err) {
    console.error(err);
  }
};

const sendMessage = async() => {
  // console.log(dataLogin.value.id)
  try {
  const req = await fetch("http://localhost:3000/api/messages", {
    credentials: "include",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          owner: dataLogin.value.user.id,
          content: message.value,
          reciver: userdata.value,
        }),
      });
      const data = await req.json();
      console.log(data);
      showMessage()
  } catch (err) {
    console.log(err);
  }
}

const showMessage = async () => {
  try {
    const req = await fetch("http://localhost:3000/api/messages");
    const data = await req.json();
    console.log(data);
    hasilChat.value = data;
    console.log(hasilChat.value.docs)
    const messageList = document.getElementById("messagelist");
    // messageList.innerHTML = "";


    // data.forEach((item) => {
    //   console.log(item);
    //   if (item.reciver == userdata.value) { // Perbaikan pada pengecekan penerima pesan
    //     const li = document.createElement("li");
    //     li.textContent = item.owner + " : " + item.content; // Menyesuaikan struktur data pesan
    //     messageList.appendChild(li);
    //   }
    // });

  } catch (err) {
    console.log(err);
  }
};


</script>

<style scoped>
.card {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.profile {
    margin-bottom: 10px;
}

textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}

</style>