// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  push, 
  onChildAdded, 
  onChildRemoved, 
  remove 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjEYOdbiPSD5TXqi59-WbMzgndf-Hs_Qg",
    authDomain: "chat-ae518.firebaseapp.com",
    databaseURL: "https://chat-ae518-default-rtdb.firebaseio.com",
    projectId: "chat-ae518",
    storageBucket: "chat-ae518.firebasestorage.app",
    messagingSenderId: "805367300988",
    appId: "1:805367300988:web:3865963a249e311b48daf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// References
const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");
const messagesRef = ref(database, "messages");

// Send a message
sendBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    push(messagesRef, { username, message, timestamp: new Date().toISOString() });
    messageInput.value = ""; // Clear the input field
  } else {
    alert("Please enter both a username and a message!");
  }
});

// Display messages and listen for new ones
onChildAdded(messagesRef, (snapshot) => {
  const messageKey = snapshot.key; // Unique ID of the message
  const { username, message, timestamp } = snapshot.val();

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.id = `msg-${messageKey}`; // Assign an ID for easy deletion

  const messageText = document.createElement("span");
  messageText.className = "message-text";
  messageText.textContent = `[${new Date(timestamp).toLocaleTimeString()}] ${username}: ${message}`;

  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteMessage(messageKey));

  messageDiv.appendChild(messageText);
  messageDiv.appendChild(deleteBtn);

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
});

// Delete a message from the database
function deleteMessage(messageKey) {
  const messageRef = ref(database, `messages/${messageKey}`);
  remove(messageRef)
    .then(() => console.log(`Message ${messageKey} deleted successfully`))
    .catch((error) => console.error("Error deleting message:", error));
}

// Automatically remove message from the chat box when deleted
onChildRemoved(messagesRef, (snapshot) => {
  const messageKey = snapshot.key; // Get the key of the deleted message
  const messageElement = document.getElementById(`msg-${messageKey}`);
  if (messageElement) {
    messageElement.remove(); // Remove it from the DOM
  }
});





/*// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  push, 
  onChildAdded, 
  remove 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjEYOdbiPSD5TXqi59-WbMzgndf-Hs_Qg",
    authDomain: "chat-ae518.firebaseapp.com",
    databaseURL: "https://chat-ae518-default-rtdb.firebaseio.com",
    projectId: "chat-ae518",
    storageBucket: "chat-ae518.firebasestorage.app",
    messagingSenderId: "805367300988",
    appId: "1:805367300988:web:3865963a249e311b48daf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// References
const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");
const messagesRef = ref(database, "messages");

// Send a message
sendBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    push(messagesRef, { username, message, timestamp: new Date().toISOString() });
    messageInput.value = ""; // Clear the input field
  } else {
    alert("Please enter both a username and a message!");
  }
});

// Display messages and keep references to message elements
onChildAdded(messagesRef, (snapshot) => {
    const messageKey = snapshot.key; // Unique ID of the message
    const { username, message, timestamp } = snapshot.val();
  
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.id = `msg-${messageKey}`; // Assign an ID for easy deletion
  
    const messageText = document.createElement("span");
    messageText.className = "message-text";
    messageText.textContent = `[${new Date(timestamp).toLocaleTimeString()}] ${username}: ${message}`;
  
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteMessage(messageKey));
  
    messageDiv.appendChild(messageText);
    messageDiv.appendChild(deleteBtn);
  
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
  });
  
  // Delete a message from the database
  function deleteMessage(messageKey) {
    const messageRef = ref(database, `messages/${messageKey}`);
    remove(messageRef)
      .then(() => console.log(`Message ${messageKey} deleted successfully`))
      .catch((error) => console.error("Error deleting message:", error));
  }
  
  // Automatically remove message from all screens
  onChildRemoved(messagesRef, (snapshot) => {
    const messageKey = snapshot.key; // Get the key of the deleted message
    const messageElement = document.getElementById(`msg-${messageKey}`);
    if (messageElement) {
      messageElement.remove(); // Remove it from the DOM
    }
});
*/
  
  



/*// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjEYOdbiPSD5TXqi59-WbMzgndf-Hs_Qg",
    authDomain: "chat-ae518.firebaseapp.com",
    databaseURL: "https://chat-ae518-default-rtdb.firebaseio.com",
    projectId: "chat-ae518",
    storageBucket: "chat-ae518.firebasestorage.app",
    messagingSenderId: "805367300988",
    appId: "1:805367300988:web:3865963a249e311b48daf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// References
const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");
const messagesRef = ref(database, "messages");

// Send a message
sendBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    push(messagesRef, { username, message, timestamp: new Date().toISOString() });
    messageInput.value = ""; // Clear the input field
  } else {
    alert("Please enter both a username and a message!");
  }
});

// Display messages
onChildAdded(messagesRef, (snapshot) => {
  const { username, message, timestamp } = snapshot.val();
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.textContent = `[${new Date(timestamp).toLocaleTimeString()}] ${username}: ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
});
*/