class Vehicle {
  constructor(x, y, visao) {
    this.pos = createVector(x, y);
    this.maxSpeed = 10;
    this.vel = createVector(this.maxSpeed, this.maxSpeed);
    this.acc = createVector(0, 0);
    
    this.maxForce = 1;
    this.r = 16;
    this.visao = visao
  }

  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {

    stroke(255,255,255);

    strokeWeight(2);

    fill(255);

    push();

    translate(this.pos.x, this.pos.y);

    stroke(255,255,255);

    noFill();
    
    circle(0, 0, this.visao);

    rotate(this.vel.heading());

    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0); 

    pop();

  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
