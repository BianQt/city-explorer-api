"use strickt";

class Forcast {
  constructor(date, max, min, desc, icon) {
    this.date = date;
    this.max = max;
    this.min = min;
    this.desc = desc;
    this.icon = icon;
  }
}

module.exports = Forcast;
