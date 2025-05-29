window.onload = function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  //min 18 years (upper bound)
  const maxDate = `${yyyy - 18}-${mm}-${dd}`;
  //max 55 years (lower bound)
  const minDate = `${yyyy - 55}-${mm}-${dd}`;
  const dobInput = document.getElementById("dob");
  dobInput.setAttribute("max", maxDate);
  dobInput.setAttribute("min", minDate);
};
const form = document.querySelector("#regisForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const entries = JSON.parse(localStorage.getItem("entries") || "[]");
  entries.push(data);
  localStorage.setItem("entries", JSON.stringify(entries));
  form.reset();
  displayEntries();
});
function acceptance(term) {
  let accepted;
  if (term === "on") {
    accepted = "true";
  } else {
    accepted = "false";
  }
  return `<td class="border border-gray-400 px-4 py-2">${accepted}</td>`;
}
function displayEntries() {
  const entries = JSON.parse(localStorage.getItem("entries") || "[]");
  const table = document.querySelector("table");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  entries.forEach((entry) => {
    const row = table.insertRow();
    row.innerHTML = `
            <td class="border border-gray-400 px-4 py-2">${entry.name}</td>
            <td class="border border-gray-400 px-4 py-2">${entry.email}</td>
            <td class="border border-gray-400 px-4 py-2">${entry.password}</td>
            <td class="border border-gray-400 px-4 py-2">${entry.dob}</td>
            ${acceptance(entry.acceptTerms)}
        `;
  });
}
