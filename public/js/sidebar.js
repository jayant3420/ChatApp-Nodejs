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

// ─── SIDEBAR SEARCH FILTER ───
document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".chat-item").forEach(item => {
        const name = item.querySelector(".chat-name")?.textContent.toLowerCase() ?? "";
        item.style.display = name.includes(query) ? "" : "none";
    });
});
