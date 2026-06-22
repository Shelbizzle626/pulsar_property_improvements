/* Pulsar Property Improvements — interactions */

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Mobile nav ----------
const toggle = document.getElementById("navToggle");
const mobile = document.getElementById("navMobile");
toggle.addEventListener("click", () => {
  const open = mobile.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
mobile.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobile.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ---------- Form validation + submit ----------
const form = document.getElementById("quoteForm");
const statusEl = document.getElementById("formStatus");

function setError(name, msg) {
  const field = form.querySelector(`[name="${name}"]`);
  const errEl = form.querySelector(`.field__err[data-for="${name}"]`);
  if (field) field.setAttribute("aria-invalid", msg ? "true" : "false");
  if (errEl) errEl.textContent = msg || "";
}

function validate() {
  let ok = true;
  const get = (n) => form.querySelector(`[name="${n}"]`).value.trim();

  if (!get("name")) { setError("name", "Please add your name."); ok = false; }
  else setError("name", "");

  const email = get("email");
  if (!email) { setError("email", "We need an email to reply."); ok = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "That email looks off."); ok = false; }
  else setError("email", "");

  if (!get("service")) { setError("service", "Pick the closest match."); ok = false; }
  else setError("service", "");

  if (!get("message")) { setError("message", "A line or two about the job helps."); ok = false; }
  else setError("message", "");

  return ok;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  statusEl.className = "form__status";

  if (!validate()) {
    statusEl.textContent = "Please fix the highlighted fields.";
    statusEl.classList.add("bad");
    return;
  }

  const submitBtn = form.querySelector(".form__submit");
  const original = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  // If the Formspree endpoint hasn't been set yet, fall back to a mailto draft
  // so the form never silently fails during setup.
  if (form.action.includes("YOUR_FORM_ID")) {
    const d = new FormData(form);
    const body = encodeURIComponent(
      `Name: ${d.get("name")}\nPhone: ${d.get("phone") || "-"}\nService: ${d.get("service")}\n\n${d.get("message")}`
    );
    window.location.href =
      `mailto:hello@pulsarpi.com?subject=${encodeURIComponent("Quote request from " + d.get("name"))}&body=${body}`;
    statusEl.textContent = "Opening your email app… (Connect Formspree to send directly — see the README.)";
    statusEl.classList.add("ok");
    submitBtn.disabled = false;
    submitBtn.textContent = original;
    return;
  }

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      form.reset();
      statusEl.textContent = "Thanks — your request is in. We'll be in touch shortly.";
      statusEl.classList.add("ok");
    } else {
      throw new Error("Bad response");
    }
  } catch {
    statusEl.textContent = "Something went wrong sending that. Call us or email hello@pulsarpi.com.";
    statusEl.classList.add("bad");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = original;
  }
});
