// ─── SEND MESSAGE ───
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messages");

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const msg = document.createElement("div");
    msg.className = "message sent";
    msg.innerHTML = `
        <div class="message-body">
            <div class="bubble">${escapeHtml(text)}</div>
            <span class="message-time">${now}</span>
        </div>`;
    messagesContainer.appendChild(msg);
    messageInput.value = "";
    messageInput.style.height = "auto";
    scrollToBottom();
}

document.getElementById("sendBtn").addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// ─── AUTO RESIZE TEXTAREA ───
messageInput.addEventListener("input", () => {
    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
});

// ─── HELPERS ───
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// scroll on load
scrollToBottom();
