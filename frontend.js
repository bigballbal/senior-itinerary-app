
document.getElementById("questionnaire").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const selectedAreas = [];
  form.querySelectorAll('input[name="area"]:checked').forEach(cb => selectedAreas.push(cb.value));

  const data = {
    crowd: formData.get("crowd"),
    category: formData.get("category"),
    activity: formData.get("activity"),
    accessible: formData.get("accessible") === "true",
    area: selectedAreas
  };

  const res = await fetch("http://localhost:3000/api/generate-itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById("result").innerText = JSON.stringify(result, null, 2);
});
