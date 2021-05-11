<template>
  <div
    class="view login"
    v-if="state.username === '' || state.username === null"
  >
    <form @submit.prevent="login" class="login-form">
      <div class="form-inner">
        <h1>Login to FireChat</h1>
        <label for="username">Username</label>
        <input
          v-model="inputUsername"
          type="text"
          placeholder="Please enter you username..."
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>

  <div class="view chat" v-else>
    <header>
      <button @click="logout" class="logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="
          message.username === state.username
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">
            {{ message.username }}
          </div>
          <div class="content">
            {{ message.content }}
          </div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="sendMessage">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Write a message..."
        />
        <input type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import db from "./db";

export default {
  setup() {
    const inputUsername = ref("");
    const inputMessage = ref("");

    const state = reactive({
      username: "",
      messages: [],
    });

    const login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    };

    const logout = () => {
      state.username = "";
    };

    const sendMessage = () => {
      const messageRef = db.database().ref("messages");

      if (inputMessage.value === "" || inputMessage.value === null) return;

      const message = {
        username: state.username,
        content: inputMessage.value,
      };

      messageRef.push(message);
      inputMessage.value = "";
    };

    onMounted(() => {
      const messageRef = db.database().ref("messages");

      messageRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
          });
        });

        state.messages = messages;
      });
    });

    return {
      db,
      inputUsername,
      login,
      state,
      inputMessage,
      sendMessage,
      logout,
    };
  },
};
</script>

<style>
:root {
  --primary-color: navy;
}

* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--primary-color);
}
.view.login {
  align-items: center;
}
.view.login .login-form {
  display: block;
  width: 100%;
  padding: 15px;
}
.view.login .login-form .form-inner {
  display: block;
  background-color: #fff;
  padding: 50px 15px;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}
.view.login .login-form .form-inner h1 {
  color: #aaa;
  font-size: 28px;
  margin-bottom: 30px;
}
.view.login .login-form .form-inner label {
  display: block;
  margin-bottom: 5px;
  color: #aaa;
  font-size: 16px;
  transition: 0.4s;
}
.view.login .login-form .form-inner input[type="text"] {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  background-color: #f3f3f3;
  transition: 0.4s;
}
.view.login .login-form .form-inner input[type="text"]::placeholder {
  color: #888;
  transition: 0.4s;
}
.view.login .login-form .form-inner input[type="submit"] {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: var(--primary-color);
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
.view.login .login-form .form-inner:focus-within label {
  /* color: var(--primary-color); */
  color: tomato;
}
.view.login .login-form .form-inner:focus-within input[type="text"] {
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
.view.login
  .login-form
  .form-inner:focus-within
  input[type="text"]::placeholder {
  color: #666;
}
.view.chat {
  flex-direction: column;
}
.view.chat header {
  position: relative;
  display: block;
  width: 100%;
  padding: 50px 30px 10px;
}
.view.chat header .logout {
  position: absolute;
  top: 15px;
  right: 15px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: right;
}
.view.chat header h1 {
  color: #fff;
}
.view.chat .chat-box {
  border-radius: 24px 24px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
  flex: 1 1 100%;
  padding: 30px;
}
.view.chat .chat-box .message {
  display: flex;
  margin-bottom: 15px;
}
.view.chat .chat-box .message .message-inner .username {
  color: #888;
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
}
.view.chat .chat-box .message .message-inner .content {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f3f3f3;
  border-radius: 999px;
  color: #333;
  font-size: 18px;
  line-height: 1.2em;
  text-align: left;
}
.view.chat .chat-box .message.current-user {
  margin-top: 30px;
  justify-content: flex-end;
  text-align: right;
}
.view.chat .chat-box .message.current-user .message-inner {
  max-width: 75%;
}
.view.chat .chat-box .message.current-user .message-inner .content {
  color: #fff;
  font-weight: 600;
  background-color: var(--primary-color);
}
.view.chat footer {
  position: sticky;
  bottom: 0px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
}
.view.chat footer form {
  display: flex;
}
.view.chat footer form input[type="text"] {
  flex: 1 1 100%;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px 0px 0px 8px;
  color: #333;
  font-size: 18px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  background-color: #f3f3f3;
  transition: 0.4s;
}
.view.chat footer form input[type="text"]::placeholder {
  color: #888;
  transition: 0.4s;
}
.view.chat footer form input[type="submit"] {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  padding: 10px 15px;
  border-radius: 0px 8px 8px 0px;
  background-color: var(--primary-color);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
</style>
