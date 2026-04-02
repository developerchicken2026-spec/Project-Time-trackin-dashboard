async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

const btns = document.querySelectorAll(".container-option button");
const cards = document.querySelectorAll(".container-work");

async function initDashboard() {
  const response = await fetch("./data.json");
  const data = await response.json();

  const dailyBtn = document.querySelector(
    ".container-option button:nth-child(1)",
  );

  dailyBtn.addEventListener("click", () => {
    data.forEach((item) => {
      const cardHeaders = document.querySelectorAll(".work-icon h2");

      cardHeaders.forEach((header) => {
        if (header.innerText === item.title) {
          const cardBody = header.closest(".container-work-title");

          const current = item.timeframes.daily.current;
          const previous = item.timeframes.daily.previous;

          cardBody.querySelector("h3").innerText = `${current}hrs`;
          cardBody.querySelector("p").innerText = `Yesterday - ${previous}hrs`;
        }
      });
    });

    console.log("Đã cập nhật dữ liệu Daily!");
  });
}

initDashboard();

async function initDashboard() {
  const response = await fetch("./data.json");
  const data = await response.json();

  const buttons = document.querySelectorAll(".container-option button");

  function updateUI(timeframe) {
    data.forEach((item) => {
      const cardHeaders = document.querySelectorAll(".work-icon h2");

      cardHeaders.forEach((header) => {
        if (header.innerText.toLowerCase() === item.title.toLowerCase()) {
          const cardBody = header.closest(".container-work-title");

          const current = item.timeframes[timeframe].current;
          const previous = item.timeframes[timeframe].previous;

          let label = "";
          if (timeframe === "daily") label = "Yesterday";
          else if (timeframe === "weekly") label = "Last Week";
          else if (timeframe === "monthly") label = "Last Month";

          cardBody.querySelector("h3").innerText = `${current}hrs`;
          cardBody.querySelector("p").innerText = `${label} - ${previous}hrs`;
        }
      });
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.innerText.toLowerCase();

      updateUI(type);

      buttons.forEach((b) => (b.style.color = "var(--color-purple-500)"));
      btn.style.color = "white";
    });
  });

  updateUI("weekly");
}

initDashboard();

function updateUI(timeframe, data) {
  data.forEach((item) => {
    const cardHeaders = document.querySelectorAll(".work-icon h2");

    cardHeaders.forEach((header) => {
      if (header.innerText.toLowerCase() === item.title.toLowerCase()) {
        const cardBody = header.closest(".container-work-title");

        const current = item.timeframes[timeframe].current;
        const previous = item.timeframes[timeframe].previous;

        let label = "";
        if (timeframe === "daily") label = "Yesterday";
        else if (timeframe === "weekly") label = "Last Week";
        else if (timeframe === "monthly") label = "Last Month";

        // Đổ dữ liệu vào HTML
        cardBody.querySelector("h3").innerText = `${current}hrs`;
        cardBody.querySelector("p").innerText = `${label} - ${previous}hrs`;
      }
    });
  });
}
