// ─── NEW CHAT MODAL ───
const modal = document.getElementById("newChatModal");

document.getElementById("newChatBtn").addEventListener("click", () => {
    modal.classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.add("hidden");
    resetModal();
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
        resetModal();
    }
});

// ─── CHECKBOX SELECTION ───
let selectedUsers = [];

document.querySelectorAll(".modal-user-list input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", () => {
        const selectedCheckBoxes = document.querySelectorAll(".modal-user-list input:checked");
        const count = selectedCheckBoxes.length;
        if (cb.checked) {
            selectedUsers.push(cb.value);
        } else {
            selectedUsers = selectedUsers.filter(id => cb.value !== id);
        }
        document.getElementById("selectedCount").textContent = `${count} selected`;
        document.getElementById("startChatBtn").disabled = selectedUsers.length === 0;
    });
});

// ─── START CHAT ───
document.getElementById("startChatBtn").addEventListener("click", async () => {
    if (selectedUsers.length === 0) return;
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ participants: selectedUsers })
        });

        if (response.ok) {
            const chat = await response.json();
            console.log("chat created ==>>", chat);
            modal.classList.add("hidden");
            resetModal();
        } else {
            console.error("Failed to create chat");
        }
    } catch (error) {
        console.error("Error initiating chat:", error);
    }
});

// ─── MODAL SEARCH FILTER ───
document.getElementById("modalSearchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".modal-user-item").forEach(item => {
        const name = item.querySelector("span").textContent.toLowerCase();
        item.style.display = name.includes(query) ? "" : "none";
    });
});

// ─── RESET MODAL ───
function resetModal() {
    selectedUsers = [];
    document.querySelectorAll(".modal-user-list input:checked").forEach(cb => cb.checked = false);
    document.getElementById("selectedCount").textContent = "0 selected";
    document.getElementById("modalSearchInput").value = "";
    document.querySelectorAll(".modal-user-item").forEach(item => item.style.display = "");
}
