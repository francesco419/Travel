class Timer {
  constructor(callback, delay) {
    this.remain = delay;
    this.callback = callback;
    this.id = setTimeout(callback, delay);
  }

  pause = () => {
    clearTimeout(this.id);
  };

  resume = () => {
    clearTimeout(this.id);
    this.id = setTimeout(this.callback, this.remain);
  };
}

export { Timer };
