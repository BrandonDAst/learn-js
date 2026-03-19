import { Habit } from "./habit.class.js";
export class TimedHabit extends Habit {
  #targetMinutes;
  constructor(name, frequency, targetMinutes) {
    super(name, frequency);
    this.targetMinutes = targetMinutes;
  }

  get targetMinutes() {
    return this.#targetMinutes;
  }

  set targetMinutes(value) {
    const minutes = Number(value);
    if (isNaN(minutes) || minutes <= 0) {
      throw new Error("El Objetivo de tiempo debe de ser un número positivo");
    }
    this.#targetMinutes = minutes;
  }

  toDisplayString() {
    const baseString = super.toDisplayString();
    return `${baseString} ${this.#targetMinutes} `;
  }

  static daily(name, targetMinutes) {
    return new TimedHabit(name, "daily", targetMinutes);
  }

  static weekly(name, targetMinutes) {
    return new TimedHabit(name, "weekly", targetMinutes);
  }
}
