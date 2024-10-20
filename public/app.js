document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;
    remove(id).then(() => e.target.closest("li").remove());
  }

  if (e.target.classList.contains("edit-btn")) {
    const li = e.target.closest("li");
    const {
      titleElement,
      inputElement,
      editBtn,
      saveBtn,
      cancelBtn,
      deleteBtn,
    } = getNoteElements(li);

    titleElement.style.display = "none";
    inputElement.style.display = "block";
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    deleteBtn.style.display = "none";
  }

  if (e.target.classList.contains("save-btn")) {
    const li = e.target.closest("li");
    const {
      titleElement,
      inputElement,
      editBtn,
      saveBtn,
      cancelBtn,
      deleteBtn,
    } = getNoteElements(li);

    const newTitle = inputElement.value;

    edit(e.target.dataset.id, newTitle).then(() => {
      titleElement.textContent = newTitle;

      inputElement.style.display = "none";
      titleElement.style.display = "block";
      saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
      editBtn.style.display = "inline-block";
      deleteBtn.style.display = "inline-block";
    });
  }

  if (e.target.classList.contains("cancel-btn")) {
    const li = e.target.closest("li");
    const {
      titleElement,
      inputElement,
      editBtn,
      saveBtn,
      cancelBtn,
      deleteBtn,
    } = getNoteElements(li);

    inputElement.style.display = "none";
    titleElement.style.display = "block";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
  });
}

function getNoteElements(li) {
  return {
    titleElement: li.querySelector(".note-title"),
    inputElement: li.querySelector(".edit-input"),
    editBtn: li.querySelector(".edit-btn"),
    saveBtn: li.querySelector(".save-btn"),
    cancelBtn: li.querySelector(".cancel-btn"),
    deleteBtn: li.querySelector(".btn-danger"),
  };
}
