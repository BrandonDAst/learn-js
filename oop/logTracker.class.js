export class LogTracker {
  #dates = [];

  addLog(date) {
    if (typeof date !== "string" || date.length !== 10) {
      return null;
    }
    this.#dates.push(date);
    return date;
  }

  getLogs() {
    return [...this.#dates];
  }

  removeLog(date) {
    const index = this.#dates.findIndex((d) => d === date);
    if (index !== -1) {
      this.#dates.splice(index, 1);
      return true;
    }
    return false;
  }
}
