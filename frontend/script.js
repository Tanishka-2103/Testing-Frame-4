const regionTags = document.getElementById("region-tags");
const standardTags = document.getElementById("standard-tags");

// Update tags
function updateTags() {
  regionTags.innerHTML = "";
  standardTags.innerHTML = "";

  document.querySelectorAll(".region-box input:checked").forEach(cb => {
    const span = document.createElement("span");
    span.textContent = cb.value;
    regionTags.appendChild(span);
  });

  document.querySelectorAll(".card.grid input:checked").forEach(cb => {
    const span = document.createElement("span");
    span.textContent = cb.parentElement.textContent.trim();
    standardTags.appendChild(span);
  });
}

document.querySelectorAll("input[type=checkbox]").forEach(cb => {
  cb.addEventListener("change", updateTags);
});

updateTags();

// Save
document.querySelector(".primary").addEventListener("click", async () => {

  const regions = [];
  const recommended = [];
  const preferred = [];

  document.querySelectorAll(".region-box input:checked").forEach(cb => {
    regions.push(cb.value);
  });

  document.querySelectorAll(".grid div:first-child input:checked")
    .forEach(cb => recommended.push(cb.parentElement.textContent.trim()));

  document.querySelectorAll(".grid div:last-child input:checked")
    .forEach(cb => preferred.push(cb.parentElement.textContent.trim()));

  await fetch("http://127.0.0.1:8000/save-testing-standards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ regions, recommended, preferred })
  });

  alert("Data saved successfully");
});
