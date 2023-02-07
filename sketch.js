
let vehicle;
let target;
let contador = 0  ; 
let visto;
const tempoMax = 10000;
const moduloMin = 4;
const tolerancia = 20;
let timeStart;
let tempoBuscaRand;
let tempoBuscaBorda;
function modulo(x,y){
  return sqrt((x*x)+(y*y))
}
function setup() {
  visto = false;
  createCanvas(1000, 800);
  vehicle = new Vehicle(50, 50, 200);
  comida = createVector(Math.random()*width, Math.random()*height);
  background(0);
  timeStart = new Date().getTime();
  
}

function draw() {
  background(0);
  fill(255, 0, 0);
  noStroke();  
  if(Math.abs(comida.x - vehicle.pos.x) <= (vehicle.visao/2)-tolerancia && Math.abs(comida.y - vehicle.pos.y) <= (vehicle.visao/2)-tolerancia || visto){
     vehicle.seek(comida)
     visto = true 
     }
  if(Math.abs(comida.x - vehicle.pos.x) <= tolerancia && Math.abs(comida.y - vehicle.pos.y) <= tolerancia){
    visto = false
    tempoBuscaRand = new Date().getTime() - timeStart
    tempoBuscaBorda = 0
    timeStart = new Date().getTime();
     comida = createVector(Math.random()*width, Math.random()*height);      
     contador++
     print(contador)
     }
  tempoBuscaRand = new Date().getTime() - timeStart
  if(tempoBuscaRand<=tempoMax || tempoBuscaBorda > 6000){
    if(vehicle.vel.x == 0){
      vehicle.vel = createVector(1,vehicle.vel.y)
    }
    else if(vehicle.vel.y == 0){
            vehicle.vel = createVector(vehicle.vel.x,1)
            }
    else{
      if(vehicle.pos.x <= tolerancia ){
      
    vehicle.vel = createVector(Math.random()*vehicle.maxSpeed,vehicle.vel.y)
    while(modulo(vehicle.vel.x,vehicle.vel.y) <= moduloMin){
      vehicle.vel = createVector(Math.random()*vehicle.maxSpeed,vehicle.vel.y)
    }
  }
    if(vehicle.pos.y <= tolerancia ){
    vehicle.vel = createVector(vehicle.vel.x,Math.random()*vehicle.maxSpeed)
    while(modulo(vehicle.vel.x,vehicle.vel.y) <= moduloMin){
      vehicle.vel = createVector(vehicle.vel.x,Math.random()*vehicle.maxSpeed)
    }
  }
    if(Math.abs(width - vehicle.pos.x) <= tolerancia ){
    vehicle.vel = createVector(-Math.random()*vehicle.maxSpeed,vehicle.vel.y)
    while(modulo(vehicle.vel.x,vehicle.vel.y) <= moduloMin){
      vehicle.vel = createVector(-Math.random()*vehicle.maxSpeed,vehicle.vel.y)
    }
  }
    if(Math.abs(height - vehicle.pos.y) <= tolerancia ){
    vehicle.vel = createVector(vehicle.vel.x,-Math.random()*vehicle.maxSpeed)
    while(modulo(vehicle.vel.x,vehicle.vel.y) <= moduloMin){
      vehicle.vel = createVector(vehicle.vel.x,-Math.random()*vehicle.maxSpeed)
    }
  }
    }
  }
  else{
    if(! (visto)){
         
      tempoBuscaBorda = tempoBuscaRand - tempoMax
      if(vehicle.pos.x <= vehicle.visao/2 -tolerancia &&Math.abs(height - vehicle.pos.y) > vehicle.visao/2 -tolerancia){
        vehicle.vel = createVector(0,vehicle.maxSpeed)
   
  }
      if(vehicle.pos.y <= vehicle.visao/2 -tolerancia && vehicle.pos.x > vehicle.visao/2 -tolerancia){
        vehicle.vel = createVector(-vehicle.maxSpeed,0)
    
  }
      if(Math.abs(width - vehicle.pos.x) <= vehicle.visao/2 -tolerancia -tolerancia&& vehicle.pos.y > vehicle.visao/2-tolerancia){
        vehicle.vel = createVector(0,-vehicle.maxSpeed)
    
  }
      if(Math.abs(height - vehicle.pos.y) <= vehicle.visao/2 -tolerancia&& Math.abs(width - vehicle.pos.x) > vehicle.visao/2-tolerancia){
        vehicle.vel = createVector(vehicle.maxSpeed,0)
    
  }
       }
  }
  circle(comida.x, comida.y, 25);
  vehicle.update();
  vehicle.show();
  
}
