GameClass = Class.extend({

  FRAMERATE : 1000/60,

  canvasEl : null,
  ctx : null,

  timeLast : null,
  timeCurrent : null,
  timeDelta : null,

  registeredForDrawing : {},

  ticks : 0,

  gid : 0,

  init : function (config) {
    this.initializeTicking();

    this.canvasEl = document.getElementById(config.canvas);
    this.ctx = this.canvasEl.getContext('2d');

    this.width = this.ctx.canvas.scrollWidth;
    this.height = this.ctx.canvas.scrollHeight;
  },

  initializeTicking : function () {
    setInterval(this.tick.bind(this), 0);
    this.drawLast = (new Date()).getTime();
  },

  trackTime : function () {
    this.timeLast    = this.timeCurrent;
    this.timeCurrent = (new Date()).getTime();
    this.timeDelta   = this.timeCurrent - this.timeLast;
  },

  tick : function () {
    this.trackTime();
    this.update();

    if (!this.inputTakeover) {
      this.draw();
    }
  },

  update : function () {
    this.updateRegistered();
  },

  draw : function () {
    if ( (this.timeCurrent - this.drawLast) > this.FRAMERATE ) {
      this.drawLast = this.timeCurrent;
      this.ctx.clearRect(0,0, this.width, this.height);
      this.drawRegistered();
    }
  },

  updateRegistered : function () {
    for (var i in this.registeredForDrawing) {
      this.registeredForDrawing[i].update();
    }
  },

  drawRegistered : function () {
    for (var i in this.registeredForDrawing) {
      this.registeredForDrawing[i].draw();
    }
  },

  registerForDraw : function (obj) {
    this.registeredForDrawing[obj.id] = obj;
  },

  getGid : function () {
    return this.gid++;
  }
});

