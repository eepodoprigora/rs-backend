console.log("Hello from app js");

document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;
    remove(id).then(() => e.target.closest("li").remove());
  }
  if (e.target.dataset.type === "edit") {
    const id = e.target.dataset.id;
    const titleElem = e.target.closest("li").querySelector(".note-title");
    const oldTitle = titleElem.textContent;
    const newTitle = prompt("Enter new title", oldTitle);

    if (oldTitle !== newTitle) {
      edit(id, newTitle).then((titleElem.textContent = newTitle));
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle }),
  });
}
