import { dailyQuoteText, habits, MAX_HABITS } from "./consts.js";
import { Habit } from "./habit.class.js";
import { TimedHabit } from "./timedHabit.class.js";

function addHabit(name, frequency) {
  if (habits.length >= MAX_HABITS) {
    showMessage("Has alcanzado el límite de 5 hábitos", "error");
    return null;
  }

  if (!name || name.trim().length === 0) {
    showMessage("El nombre del hábito es obligatorio", "error");
    return null;
  }

  try {
    const habit = new Habit(name.trim(), frequency);
    habits.push(habit);
    return habit;
  } catch (error) {
    showMessage(error.message, "error");
    return null;
  }
}

function logHabit(habitId, date) {
  const habit = habits.find((h) => h.id === habitId);

  if (!habit) {
    showMessage("Hábito no encontrado", "error");
    return null;
  }

  return habit.registerCheckIn(date);
}

function getStatistics() {
  const totalHabits = habits.length;
  let totalCheckIns = 0;

  const habitCounts = {};
  habits.forEach((habit) => {
    const logs = habit.getLogs();
    totalCheckIns += logs.length;
    habitCounts[habit.name] = logs.length;
  });

  let mostActiveHabit = "-";
  if (totalCheckIns > 0) {
    mostActiveHabit = Object.entries(habitCounts).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
  }

  return {
    totalHabits,
    totalCheckIns,
    mostActiveHabit,
  };
}

function showMessage(message, type = "success") {
  const messageBox = document.getElementById("messageBox");
  messageBox.textContent = message;
  messageBox.className = `message-box ${type}`;

  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 3000);
}

function renderHabits() {
  const habitsTable = document.getElementById("habitsTable");
  const habitSelect = document.getElementById("habitSelect");
  const createHabitBtn = document.getElementById("openCreateModal");

  if (habits.length === 0) {
    habitsTable.innerHTML =
      '<p class="empty-state">No hay hábitos. Haz clic en "Crear Hábito" para comenzar.</p>';
    habitSelect.innerHTML = '<option value="">Selecciona un hábito</option>';
    createHabitBtn.style.display = "block";
    return;
  }

  // Ocultar botón de crear hábito si se alcanzó el límite
  if (habits.length >= MAX_HABITS) {
    createHabitBtn.style.display = "none";
  } else {
    createHabitBtn.style.display = "block";
  }

  const monthDays = getCurrentMonthDays();

  const headerRow = `
    <div class="habit-row habit-header">
      <span class="habit-day-label">Día</span>
      ${habits.map((habit) => `<span class="habit-name">${habit.name}</span>`).join("")}
    </div>
  `;

  const dayRows = monthDays
    .map((date, index) => {
      const dateObj = new Date(date + "T00:00:00");
      const dayLabel = String(dateObj.getDate()).padStart(2, "0");

      return `
        <div class="habit-row">
          <span class="habit-day">${dayLabel}</span>
          ${habits
            .map((habit) => {
              const habitLogs = habit.getLogs();
              const isChecked = habitLogs.includes(date);
              return `<div class="habit-checkbox ${isChecked ? "checked" : ""}" 
                         data-habit-id="${habit.id}" 
                         data-date="${date}"></div>`;
            })
            .join("")}
        </div>
      `;
    })
    .join("");

  habitsTable.innerHTML = headerRow + dayRows;

  habitSelect.innerHTML =
    '<option value="">Selecciona un hábito</option>' +
    habits
      .map((habit) => `<option value="${habit.id}">${habit.name}</option>`)
      .join("");

  attachCheckboxListeners();
}

function getCurrentMonthDays() {
  const dates = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const currentDay = today.getDate();

  for (let day = 1; day <= currentDay; day++) {
    const date = new Date(year, month, day);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
}

function attachCheckboxListeners() {
  document.querySelectorAll(".habit-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const habitId = parseInt(this.dataset.habitId);
      const date = this.dataset.date;

      if (this.classList.contains("checked")) {
        removeLog(habitId, date);
        this.classList.remove("checked");
        showMessage("Check-in removido", "success");
      } else {
        const log = logHabit(habitId, date);
        if (log) {
          this.classList.add("checked");
          showMessage("Check-in registrado", "success");
        }
      }
    });
  });
}

function removeLog(habitId, date) {
  const habit = habits.find((h) => h.id === habitId);
  if (habit) {
    habit.removeCheckIn(date);
  }
}

function updateDateTime() {
  const now = new Date();
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  document.getElementById("dayNumber").textContent = now.getDate();
  document.getElementById("monthName").textContent = months[now.getMonth()];
  document.getElementById("dayName").textContent = days[now.getDay()];
}

function renderQuote() {
  const savedQuote = document.getElementById("savedQuote");
  savedQuote.textContent = dailyQuoteText || "Escribe tu frase del día...";
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

function setupModalListeners() {
  document.getElementById("openCreateModal").addEventListener("click", () => {
    openModal("createHabitModal");
  });

  document.getElementById("openRegisterModal").addEventListener("click", () => {
    if (habits.length === 0) {
      showMessage("Primero crea un hábito", "error");
      return;
    }
    openModal("registerModal");
  });

  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", function () {
      closeModal(this.dataset.modal);
    });
  });

  document.querySelectorAll(".btn-secondary").forEach((btn) => {
    btn.addEventListener("click", function () {
      const modalId = this.dataset.modal;
      if (modalId) {
        closeModal(modalId);
      }
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
      }
    });
  });
}

function initApp() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("checkInDate").value = today;

  updateDateTime();
  setupModalListeners();

  document.getElementById("createHabitBtn").addEventListener("click", () => {
    const name = document.getElementById("habitName").value;
    const frequency = document.getElementById("habitFrequency").value;

    const habit = addHabit(name, frequency);
    if (habit) {
      showMessage(`Hábito "${habit.name}" creado exitosamente`, "success");
      document.getElementById("habitName").value = "";
      renderHabits();
      closeModal("createHabitModal");

      // Si se alcanzó el límite, mostrar mensaje
      if (habits.length >= MAX_HABITS) {
        showMessage("Has alcanzado el límite máximo de 5 hábitos", "success");
      }
    }
  });

  document.getElementById("checkInBtn").addEventListener("click", () => {
    const habitId = parseInt(document.getElementById("habitSelect").value);
    const date = document.getElementById("checkInDate").value;

    if (!habitId || !date) {
      showMessage("Selecciona un hábito y una fecha", "error");
      return;
    }

    const log = logHabit(habitId, date);
    if (log) {
      const habit = habits.find((h) => h.id === habitId);
      showMessage(`Check-in registrado para ${habit.name}`, "success");
      renderHabits();
      closeModal("registerModal");
    }
  });

  renderHabits();
  renderQuote();

  console.log("Habit Tracker inicializado");
  const demoHabit1 = Habit.daily("Leer");
  demoHabit1.registerCheckIn("2026-01-10");
  demoHabit1.registerCheckIn("2026-01-11");
  demoHabit1.registerCheckIn("2026-01-12");

  const demoHabit2 = Habit.weekly("Ejercicio");
  demoHabit2.registerCheckIn("2026-01-06");
  demoHabit2.registerCheckIn("2026-01-13");

  const demoHabit3 = TimedHabit.daily("Meditar", 20);
  demoHabit3.registerCheckIn("2026-01-10");
  demoHabit3.registerCheckIn("2026-01-11");
  demoHabit3.registerCheckIn("2026-01-12");

  console.log("Hábito diario:", demoHabit1.toDisplayString());
  console.log(
    "Racha diaria:",
    demoHabit1.calculateStreak(new Date("2026-01-13")),
  );
  console.log("Hábito semanal:", demoHabit2.toDisplayString());
  console.log(
    "Racha semanal:",
    demoHabit2.calculateStreak(new Date("2026-01-13")),
  );
  console.log("Hábito con tiempo:", demoHabit3.toDisplayString());
}

document.addEventListener("DOMContentLoaded", initApp);
