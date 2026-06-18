/* ===========================
       API GOOGLE APPS SCRIPT
    =========================== */

const API_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQg6UxcYpWRoWFU5RYVueOcN53gDtW-FMXNV1wdot9W1OcIOygSRywgH6avktCTUCzlmpospeedFHCKTxCI5Ap9sJ5e8Gmz8JM9j0tGZOw6hWb9N9-mnkheqQqar2lognEyCUWadmy39XmGpTInGvfoSb6KyqgrTQRP1hMpG0YY1bWEhqLA5L4tqvvzNVuGI5XFHig36vhRcA7nKEwfIcDtFXcVRk0umhCu4glov8V5maybOUfWfL7tRcyfMGR9KbpBa6DyP3Qv7BBkajdnYgM-x5Lpvg&lib=M5gLFUYSFiaSYAcUggOmqYMlgMUXZopaT";

/* ===========================
       CLOCK
    =========================== */

function updateClock() {
  const now = new Date();

  document.getElementById("date").innerText = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  document.getElementById("time").innerText = now.toLocaleTimeString("id-ID");
}

setInterval(updateClock, 1000);
updateClock();

/* ===========================
       FETCH DATA API
    =========================== */

async function fetchQueue() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();

    if (json.status !== "success") return;

    render(json.data);
  } catch (err) {
    console.error("API Error:", err);
  }
}

/* ===========================
       RENDER UI
    =========================== */

function render(data) {
  const display = document.getElementById("display");
  const list = document.getElementById("list");
  const total = document.getElementById("total");

  list.innerHTML = "";

  if (!data || data.length === 0) {
    display.innerHTML = `
          <div class="empty fade">
            <h1>SELAMAT DATANG DI BPS HALMAHERA TIMUR</h1>
          </div>
        `;

    total.innerText = 0;
    return;
  }

  const current = data[0];

  /* MAIN DISPLAY */
  display.innerHTML = `
        <div class="center fade">
          <div class="label">NOMOR ANTREAN SAAT INI</div>
          <div class="number">${current.kode}</div>
        </div>
      `;

  /* NEXT QUEUE */
  data.slice(1, 6).forEach((item, i) => {
    list.innerHTML += `
          <div class="item ${i === 0 ? "active" : ""}">
            ${item.kode}
          </div>
        `;
  });

  total.innerText = data.length;
}

/* ===========================
       AUTO REFRESH (REALTIME SIMULATION)
    =========================== */

fetchQueue();
setInterval(fetchQueue, 5000);
