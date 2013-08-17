Box = Class.extend({
  id : null,

  size : { x : 50, y : 50 },
  pos : { x : 0, y : 0 },
  color : '#f00',

  init : function () {
    this.id = game.getGid();
    game.registerForDraw(this);

    this.addListeners();
  },

  addListeners : function () {
    var self = this;

    game.canvasEl.addEventListener('mousemove', function (e) {
      game.inputTakeover = true;
      self.pos.x = e.pageX - game.canvasEl.offsetLeft;
      self.pos.y = e.pageY - game.canvasEl.offsetTop;
      game.draw();
      game.inputTakeover = false;
    });
  },

  update : function () {},

  draw : function () {
    game.ctx.fillStyle = this.color;
    game.ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
});
