document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".application-form");
  const submitBtn = document.querySelector(".submit-btn");
  const successMessage = document.querySelector(".succes-message");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitBtn.disabled = true;

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const description = document.getElementById("description").value;

    const data = { name, phone, description };

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        successMessage.style.display = "block";
        form.reset();
      } else {
        console.error("Error submitting the form");
      }
    } catch (error) {
      console.error("Request failed", error);
    } finally {
      submitBtn.disabled = false;
    }
  });
});
