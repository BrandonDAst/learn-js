import { STREK_CALCULATORS } from "./consts.js";
import { LogTracker } from "./logTracker.class.js";

export class Habit {
  #name;
  #frequency;

  #id;
  #tracker;
  #createdAt;

  constructor(name, frequency) {
    this.name = name;
    this.frequency = frequency;

    this.#id = Habit.createId();
    this.#createdAt = new Date().toISOString();
    this.#tracker = new LogTracker();
  }

  get name() {
    return this.#name;
  }
  set name(value) {
    const normalized = value.trim();
    if (normalized.length < 3) {
      throw new DomainError(
        "El nombre del hábito debe tener al menos 3 caracteres.",
        ERROR_CODES.INVALID_NAME,
      );
    }
    this.#name = normalized;
  }
  get frequency() {
    return this.#frequency;
  }

  set frequency(value) {
    const validFrequencies = ["daily", "weekly"];
    if (!validFrequencies.includes(value)) {
      throw new DomainError(
        'La frecuencia debe ser "daily" o "weekly".',
        ERROR_CODES.INVALID_FREQUENCY,
      );
    }
    this.#frequency = value;
  }
  get id() {
    return this.#id;
  }

  get createdAt() {
    return this.#createdAt;
  }

  rename(newName) {
    this.name = newName;
  }

  registerCheckIn(date) {
    const created = this.#tracker.addLog(date);
    if (!created) {
      return null;
    }
    return {
      habitId: this.id,
      date: created,
    };
  }

  getLogs() {
    return this.#tracker.getLogs();
  }

  removeCheckIn(date) {
    return this.#tracker.removeLog(date);
  }

  calculateStreak(today = new Date()) {
    const calculator = STREK_CALCULATORS[this.#frequency];
    if (!calculator) {
      return 0;
    }
    return calculator.calculate(this, this.getLogs(), today);
  }

  toDisplayString() {
    return `${this.name} (${this.frequency})`;
  }

  static createId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  static daily(name) {
    return new Habit(name, "daily");
  }

  static weekly(name) {
    return new Habit(name, "weekly");
  }
}
