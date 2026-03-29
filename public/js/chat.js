// ─── SIDEBAR TOGGLE ───
document.getElementById("sidebarToggle")?.addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("collapsed");
});

// ─── AVATAR COLORS ───
document.querySelectorAll(".avatar[data-color]").forEach(el => {
    el.style.background = el.dataset.color;
});

// ─── TABS ───
document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
    });
});

// ─── CHAT ITEM CLICK → OPEN CHAT WINDOW ───
document.querySelectorAll(".chat-item[data-chat-id]").forEach((item) => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".chat-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        document.getElementById("emptyState").classList.add("hidden");
        document.getElementById("chatWindow").classList.remove("hidden");
        scrollToBottom();
    });
});

// ─── NEW CHAT MODAL ───
const modal = document.getElementById("newChatModal");

document.getElementById("newChatBtn").addEventListener("click", () => {
    modal.classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});

// ─── CHECKBOX COUNT ───
document.querySelectorAll(".modal-user-list input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", () => {
        const count = document.querySelectorAll(".modal-user-list input:checked").length;
        document.getElementById("selectedCount").textContent = `${count} selected`;
    });
});

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

// ─── MODAL SEARCH FILTER ───
document.getElementById("modalSearchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".modal-user-item").forEach(item => {
        const name = item.querySelector("span").textContent.toLowerCase();
        item.style.display = name.includes(query) ? "" : "none";
    });
});

// ─── SIDEBAR SEARCH FILTER ───
document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".chat-item").forEach(item => {
        const name = item.querySelector(".chat-name")?.textContent.toLowerCase() ?? "";
        item.style.display = name.includes(query) ? "" : "none";
    });
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
