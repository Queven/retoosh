var Formations = {};

Formations.noEnemies = (Retoosh.HEIGHT)/70;
Formations.diff = (Retoosh.HEIGHT - 20)/Formations.noEnemies;

Formations.FlyingWedge = function (game){

    Phaser.Group.call(this, game, game.world, 'Flying Wedge', false, true, Phaser.Physics.ARCADE);

    for (var i = 2; i < 6; i++)
    {
        for (var j = 0; j < Formations.noEnemies/i; j++){

            var enemyDown = new Enemies.Medium(game, Retoosh.WIDTH - 80 - (i - 2) * 65, Retoosh.HEIGHT/2 + Formations.diff*j);
            enemyDown.addBehaviour(new Behaviours.UpAndDown);
            enemyDown.addBehaviour(new Behaviours.MoveForward);
            this.add(enemyDown, true);

            if(j != 0) {
                var enemyUp = new Enemies.Medium(game, Retoosh.WIDTH - 80 - (i - 2) * 65, Retoosh.HEIGHT / 2 - Formations.diff * j);
                enemyUp.addBehaviour(new Behaviours.UpAndDown());
                enemyUp.addBehaviour(new Behaviours.MoveForward);
                this.add(enemyUp, true);
            }
        }
    }

    return this;
};

Formations.FlyingWedge.prototype = Object.create(Phaser.Group.prototype);
Formations.FlyingWedge.prototype.constructor = Formations.FlyingWedge;

Formations.Line = function (game){

    Phaser.Group.call(this, game, game.world, 'Line', false, true, Phaser.Physics.ARCADE);

    for (var j = 1; j <= Formations.noEnemies; j++){

        var enemy = new Enemies.Hard(game, Retoosh.WIDTH - 80, Formations.diff * j + Retoosh.STATS_PANEL_HEIGHT);
        enemy.addBehaviour(new Behaviours.MoveForward);

        this.add(enemy, true);
    }

    return this;
};

Formations.Line.prototype = Object.create(Phaser.Group.prototype);
Formations.Line.prototype.constructor = Formations.Line;


Formations.Square = function (game){

    Phaser.Group.call(this, game, game.world, 'Square', false, true, Phaser.Physics.ARCADE);

    for (var i = 0; i < 4; i++)
    {
        for (var j = 1; j <= Formations.noEnemies; j++){
            var enemy = new Enemies.Easy(game, Retoosh.WIDTH - 80 - i*65, Formations.diff*j + Retoosh.STATS_PANEL_HEIGHT);
            enemy.addBehaviour(new Behaviours.UpAndDown);
            this.add(enemy, true);
        }
    }

    return this;
};

Formations.Square.prototype = Object.create(Phaser.Group.prototype);
Formations.Square.prototype.constructor = Formations.Square;


Enemy = function (game, key, x, y) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.anchor.set(0.5);
    this.reset(x, y);

    this.scaleSpeed = 0;
    this.exists = false;

    this.behaviours = [];

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.addBehaviour = function (behaviour) {
    this.behaviours.push(behaviour);
};

Enemy.prototype.doBehave = function () {
    for (var i =0; i < this.behaviours.length; i++){
        this.behaviours[i].behave(this);
    }
};


var Enemies = {};

Enemies.Easy = function (game, x, y) {
    Enemy.call(this, game, 'easyenemy', x, y);
};

Enemies.Easy.prototype = Object.create(Enemy.prototype);
Enemies.Easy.prototype.constructor = Enemies.Easy;


Enemies.Medium = function (game, x, y) {
    Enemy.call(this, game, 'mediumenemy', x, y);
};

Enemies.Medium.prototype = Object.create(Enemy.prototype);
Enemies.Medium.prototype.constructor = Enemies.Medium;

Enemies.Hard = function (game, x, y) {
    Enemy.call(this, game, 'hardenemy', x, y);
};

Enemies.Hard.prototype = Object.create(Enemy.prototype);
Enemies.Hard.prototype.constructor = Enemies.Hard;


Behaviours = function () {};

Behaviours.prototype.constructor = Behaviours;

Behaviours.prototype.behave = function (object) { };

Behaviours.UpAndDown = function () {
    Behaviours.call(this);
    this.currentChange = 0;
    this.currentDifference = 0.8;
};

Behaviours.UpAndDown.prototype = Object.create(Behaviours.prototype);
Behaviours.UpAndDown.prototype.constructor = Behaviours.UpAndDown;

Behaviours.UpAndDown.prototype.behave = function (object) {
    if(this.currentChange == 50){
        this.currentDifference *= -1;
        this.currentChange = 0;
    }

    this.currentChange += 1;
    object.y += this.currentDifference;
};

Behaviours.MoveForward = function () {
    Behaviours.call(this);
};

Behaviours.MoveForward.prototype = Object.create(Behaviours.prototype);
Behaviours.MoveForward.prototype.constructor = Behaviours.MoveForward;

Behaviours.MoveForward.prototype.behave = function (object) {
    object.x -= 2;

    if(object.x < 0){
        object.destroy();
    }
};

Behaviours.Chaotic = function () {
    Behaviours.call(this);
};

Behaviours.Chaotic.prototype = Object.create(Behaviours.prototype);
Behaviours.Chaotic.prototype.constructor = Behaviours.Chaotic;

Behaviours.Chaotic.prototype.behave = function (object) {

    var randomValue = Math.floor(Math.random() * (5 + 5 + 1)) - 5;
    console.log(randomValue);
    object.y += randomValue;
};

