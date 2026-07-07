const date = document.getElementById("date");
const bookingForm = document.getElementById("bookingForm");
const confirmation = document.getElementById("confirmation");
const contractForm = document.getElementById("contractForm");
const contractNote = document.getElementById("contractNote");
const PRIMECARE_INFO_EMAIL = "info@primecarecleaning.co.za";

function setMinDate() {
  if (!date) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  date.min = tomorrow.toISOString().slice(0, 10);
  date.value = date.min;
}

function openPrimeCareEmail(subject, body) {
  const mailto = `mailto:${PRIMECARE_INFO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

function checkedLabels(form) {
  return Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
    .map((input) => input.closest("label")?.textContent.trim())
    .filter(Boolean)
    .join(", ") || "None selected";
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const service = document.getElementById("service")?.value || "Not selected";
    const province = document.getElementById("province")?.value || "Not selected";
    const rooms = document.getElementById("rooms")?.value || "Not supplied";
    const bathrooms = document.getElementById("bathrooms")?.value || "Not supplied";
    const windowSelect = document.getElementById("window")?.value || "Not selected";
    const contact = document.getElementById("contact")?.value || "Not supplied";
    const notes = document.getElementById("notes")?.value || "None supplied yet.";
    const addons = checkedLabels(bookingForm);

    if (confirmation) {
      confirmation.hidden = false;
      confirmation.innerHTML = `
        <strong>Booking request prepared for PrimeCare</strong>
        <p>${service} in ${province} on ${date.value} between ${windowSelect}.</p>
        <p>Bedrooms / work zones: ${rooms}. Bathrooms / ablutions: ${bathrooms}. Add-ons: ${addons}.</p>
        <p>Contact: ${contact}</p>
        <p>Your email app should open with this booking addressed to ${PRIMECARE_INFO_EMAIL}.</p>
      `;
    }

    openPrimeCareEmail(
      `PrimeCare booking request - ${service}`,
      [
        "PrimeCare Cleaning booking request",
        "",
        `Service: ${service}`,
        `Province: ${province}`,
        `Preferred date: ${date.value}`,
        `Arrival window: ${windowSelect}`,
        `Bedrooms / work zones: ${rooms}`,
        `Bathrooms / ablutions: ${bathrooms}`,
        `Add-ons: ${addons}`,
        "",
        `Contact details: ${contact}`,
        `Address and access notes: ${notes}`,
      ].join("\n")
    );
  });
}

if (contractForm && contractNote) {
  contractForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contractForm);
    contractNote.innerHTML = `<strong>Enquiry prepared.</strong> Your email app should open with this contract enquiry addressed to ${PRIMECARE_INFO_EMAIL}.`;
    openPrimeCareEmail(
      `PrimeCare contract enquiry - ${formData.get("contractType")}`,
      [
        "PrimeCare Cleaning contract enquiry",
        "",
        `Organisation: ${formData.get("organisation")}`,
        `Contract type: ${formData.get("contractType")}`,
        `Reply email: ${formData.get("email")}`,
      ].join("\n")
    );
  });
}

setMinDate();

if (window.lucide) {
  window.lucide.createIcons();
}
