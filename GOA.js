var food = [];
var poison = [];
var vehicles = [] ;
var count =0;
var foodfinish=0;
var debug;
var sexcount=0;
var fightcount=0;
var clonecount=0;
var maxhealth;
var x=0;
var changed= false;
function setup(){

  createCanvas(2900,650);
  background(51);
  debug= createCheckbox("Perception Visualizer");

  for(var i=0; i< 220; i++)
  {
    food[i]= createVector(random(width/2), random(height))
    stroke(0,255,0);
    ellipse(food[i].x,food[i].y,4,4)
    poison[i]= createVector(random(width/2), random(height))


  }


  for(var i =0; i < 25; i++){
  vehicles[i]= new Vehicle(random(width/2), random(height),i+1);}

  createP("STATISTICS OF THE DEAD : ")
  createP("Food   Poison  Id      &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  GMult  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp BMult  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp Maxspeed  &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp MaxForce  &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp BlackMagic");

}

function draw(){
 fill(51);
  rect(0,0,1650,700)
  for(var i=0; i< food.length; i++)
  { push()
    fill(0,255,10);
    noStroke();
    ellipse(food[i].x,food[i].y,6,6)
    pop();

  }

  for(var i=0; i< poison.length; i++)
  {
   push();
    fill(255,0,0)
    noStroke();
    ellipse(poison[i].x,poison[i].y,4,4)
    pop()
  }



maxhealth=0;
 var maxspeed=0;
var totalblack=0;
var totalspeed=0;
var fittest=0;
var vfittest;
var weakest=Infinity;
var vweakestI;
for(var i = 0; i< vehicles.length; i++){
  vehicles[i].behaviours(food,poison)
  vehicles[i].update();
  vehicles[i].show();
  // vehicles[i].boundaries();

  var dead=false;

  if(vehicles[i].pos.x>width/2 +30) {
  //fill(51);rect(vehicles[i].pos.x-10,vehicles[i].pos.y-10,20,20);
  vehicles[i].pos.x=10;
  }

  if(vehicles[i].fitness > fittest)
  {
  	fittest=vehicles[i].fitness;
  	vfittest=vehicles[i];
  }

    if(vehicles[i].fitness < weakest)
  {
  	weakest=vehicles[i].fitness;
  	vweakestI=i;
  }


  if(vehicles[i].id==Infinity) {vehicles[i].id=i+1;}

  totalblack+= vehicles[i].black==-1?1:0;
  if(vehicles[i].health >maxhealth)
    maxhealth=vehicles[i].health;

var v = vehicles[i].vel.mag();
totalspeed+=v;

if( v >maxspeed)
    maxspeed=v;


	if(random(1) < 0.000002 ) {createP("What the fuck are we doing");}
	if(random(1) < 0.000001 ) {createP("Our Anthem : Fight- Fuck- Kill");}


  if(vehicles[i].health<-1  || random(1)<map(vehicles[i].age,500,3000,0.0001,0.3))
   { //createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp  : " +vehicles[i].blackcount + " &nbsp &nbsp &nbsp &nbsp age:  " +  vehicles[i].age + "   health : " +vehicles[i].health  + " gen " + vehicles[i].gen);
     dead=true;}

      if(vehicles[i].interact()) dead= true;
  if(dead){
    if(vehicles[i].age > 890 || vehicles[i].health > 95) createP("****Hall of Fame Individual :****")
    createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp  : " +vehicles[i].blackcount + " &nbsp &nbsp &nbsp &nbsp age:  " +  vehicles[i].age + "   health : " +vehicles[i].health + " gen " + vehicles[i].gen);
    vehicles.splice(i,1)
  }

}


 if(mouseIsPressed && keyIsPressed)
  	{if((key=='f' || key=='F')&& mouseX <width/2 - 100){
  		var i= 0;
  		while(i < 1){food.push(createVector(mouseX+random(-70,70),mouseY+random(-70,70))); i++}
  	}
  	if( (key=='g' || key=='G' )&& food.length >10)
  			food.splice(0,3);
  	if(key=='v'|| key=='V')
  		vfittest.clone();
  		if(vehicles.length==0) vehicles.push(new Vehicle(random(width/2), random(height),mouseX))
  	if((key=='b'|| key=='B') && vehicles.length>3 )
  		vehicles.splice(vweakestI,1);
  	if(key=='m' && frameCount%20==0)
  		for(var i =0; i < vehicles.length; i ++ )
			{vehicles[i].blackMagic();}
  			//vehicles[Math.ceil(random(vehicles.length) -1)].blackMagic();
  }

  // console.log(vfittest);

// fill(51);
// rect(width/2+100,0,200,height-100)
// stroke(255);
push();
translate(10,10);
noStroke();
  fill(95,200);
  rect(5,0,125,75)
  fill(255,255,0)
  textSize(15);

  text('# Crossovers :' + sexcount, 10,13)
  text('# Clones :' + clonecount, 10,27)
  text('# Fights :' + fightcount, 10,41)
  text('# Food :' + food.length, 10,55)
  text('Population :' + vehicles.length, 10,70)

 pop();
push();
textSize(12)
translate(-width/2 + 20,100);
fill(95,190);
rect(width/2-5,0,125,90)
fill(250);
  text('Click + ' , width/2,13)
  text('F : more food' , width/2,27)
  text('G : less food' , width/2,41)
  text('V : clone the fittest' , width/2,55)
  text('B : kill the weakest' , width/2,70)
  text('M : Black-Magic on all' , width/2,85)

pop();
  textSize(14)
  text('GRAPHS :', width/2 +10,190)







noStroke();
fill(95,190);
translate(100,5)
rect(width/2 +105 ,0,180,65)
textSize(12);
fill(0,255,0)
strokeWeight(1);
text("Max Health",width/2 +110 ,10 )
ellipse(width/2 +100 -x + frameCount/8,height-maxhealth*4,1,1);
fill(255,255,0);
text("Blacked Population Size",width/2 +110 ,25 )
ellipse(width/2 +100 -x + frameCount/8,height-2*totalblack,1,1);
// fill(0,0,255)
// ellipse(width/2 +100 -x + frameCount/8,height-40*maxspeed,1,1);
fill(255,0,0)
text("Average Speed of Population",width/2 +110 ,40 )
ellipse(width/2 +100 -x + frameCount/8,height-30*totalspeed/vehicles.length,1,1);
fill(255);
text("Population size",width/2 +110 , 55)
ellipse(width/2 +100 -x + frameCount/8,height-vehicles.length*3,1,1)


if(frameCount%10000< 1 && frameCount >10)
  {fill(51);
    rect(width/2,0, width/2,height)
    x=(frameCount/10000-(frameCount%10000/10000))*1250
   }

//if(random(1)<0.75) food.push(createVector(random(width/2-150,width/2),random(height-150, height)))
if(foodfinish==1 ) {

foodfinish=2;

// for(var i = 0; i< vehicles.length; i++){
//   createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp Blacked : " +vehicles[i].blackcount);

 //createP(vehicles[i].foodcount+" food and " + vehicles[i].poisoncount + " poisons eaten by # " + vehicles[i].id + " vehicle; its dna : "+ vehicles[i].dna[0] + "  " + vehicles[i].dna[1])}


}




}

function Vehicle(x,y,i,dna,black,gen){
  this.pos=createVector(x,y);
  this.vel=createVector(random(1),random(1));
  this.acc=createVector();
  this.maxSpeed = 5.5;
  this.maxForce = 3.1;
  this.id=i;
  this.health=30;
  this.age=0;
  this.fitness=0;
 if(gen== undefined) this.gen=1;
  else this.gen=gen;


  this.dna= [];
if(dna==undefined){
  this.dna[0]= random(0,4);   //GoodMult
  this.dna[1]= random(-4,0);  //BadMult
  this.dna[2]= random(0.4,5); //MAxSpeed
  this.dna[3]= random(0.1,5); //MaxForce
  this.dna[4]= random(0,0.05);//Black Magic prob.
  this.dna[5]= random(10,200);//Food Perception
  this.dna[6]= random(10,200);//Poison Perception Radius
 }
 else{
  this.dna[0]= dna[0] + random(-0.1,0.1);   //GoodMult
  this.dna[1]= dna[1] + random(-0.1,0.1);  //BadMult
  this.dna[2]= dna[2] + random(-map(this.gen,1,400,0.05,2),map(this.gen,1,400,0.1,5)); //MAxSpeed
  this.dna[3]= dna[3] + random(-map(this.gen,1,400,0.2,4),map(this.gen,1,400,0.2,5)); //MaxForce
  this.dna[4]= dna[4] + random(-0.005,0.005);//Black Magic prob.
  this.dna[5]= dna[5] + random(-5,5);//Food Perception
  this.dna[6]= dna[6] + random(-5,5);//Poison perception

}

  this.maxSpeed = this.dna[2];
  this.maxForce = this.dna[3];

  this.poisoncount=0;
  this.foodcount=0;
  this.blackcount=0;
  this.black= 1;
  if(black==-1) this.black= -1;
  this.blackprob=this.dna[4];




  this.blackMagic= function(){

      this.dna[1]*=-1;
       this.dna[0]*=-1;
    this.black*=-1;
    this.blackcount++;
     }




  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel);
    this.acc.mult(0.1);
     if(random(1)<this.blackprob) this.blackMagic();
    this.health-=0.03;
    this.age++;

    this.fitness= 150*this.health/this.age + this.age/50 + this.health/3 - this.poisoncount/3 - this.blackcount/5 + this.maxSpeed;
    // console.log(this.fitness)
    for(var i=0; i< food.length; i++){
      var d= this.pos.dist(food[i]);
      if(d<8)
        {food.splice(i,1)
          // console.log(i);
          this.foodcount++;
          this.health+=0.9;
          if(random(1)<0.999)
            food.push(createVector(random(width/2),random(height)))
        }
        }

    for(var i=0; i< poison.length; i++){
      var d2= this.pos.dist(poison[i]);
      if(d2<4)
        {poison.splice(i,1);
          this.poisoncount++;
          this.health-=0.5;
         if(random(1)<0.99)
            poison.push(createVector(random(width/2),random(height)))
          }

    }

if((random(1)< map(this.age,300,1200,0.005,0.1)) && (random(1)<map(this.health,25,100,0.001,0.2)) || random(1)< map(vehicles.length,1,30,0.01,0.00001))
	this.clone();


    if(this.pos.x > width/2-12 || this.pos.x < 0) {this.vel.x*=-1; this.acc.mult(-1);}
    else if(this.pos.y > height-12 || this.pos.y < 0){ this.vel.y*=-1; this.acc.mult(-1);}


  }

  this.interact = function(){
    for(var i=0; i< vehicles.length; i++){
      var d= this.pos.dist(vehicles[i].pos);
      if(d>0 && d<9)
      {if(this.fight(vehicles[i])) return true;
       else if(random(1) < map(this.health,15,200,0.1,0.8) && this.gen==vehicles[i].gen && this.id!=vehicles[i].id) {this.crossover(vehicles[i]); return false;}
        else return false
      }

    }
    return false;
  }


this.clone = function(){

      vehicles.push(new Vehicle(this.pos.x + random(-20,20), this.pos.y + random(-20,20), this.id, this.dna,this.black,this.gen+1))
		clonecount++;
  }

  this.fight = function(v) {
   if( random(1)<0.001 || random(1) < map(vehicles.length,60,500,0.003,0.2))
    {if(this.health <= v.health)
    {fightcount++;
      return true;}

  else return false;}
  else return false;


    // return random(1)<0.17    //FIGHTING AND DYING PROBABILTY
  }

  this.drawheart = function(factor){
  //var factor = 15;
  var heart=[];

  for(var t=0; t <= 2 * PI ; t+=0.02){

    //var r = (2- 2*sin(t) + sin(t)*sqrt(abs(cos(t)))/(sin(t)+1.4));
    //var x = r* cos(t);
    //var y = r* sin(t);

    var x= 16 * sin(t)* sin(t)* sin(t);
    var y= 13 * cos (t) - 5 * cos(2*t) - 2* cos(3*t) - cos(4*t);

    heart.push(createVector(x*factor,y*factor));

  }


  push();
  translate(this.pos.x, this.pos.y);
  noStroke();
  fill(255,0,0);

  for(var i =0; i< heart.length; i++){

  ellipse(heart[i].x,-heart[i].y,2,2);}
  pop();

 	if(factor < 2)
    {factor+=0.2;
      this.drawheart(factor);
    }

}

  this.crossover = function(v){
    var child = [];
    var cblack;
    this.drawheart(1);
   if(random(1)< 0.5)
   {
   	child[0]=this.dna[0];
   	child[1]=this.dna[1];
   	cblack=this.black;
   }
   else{
   	child[0]=v.dna[0];
   	child[1]=v.dna[1];
   	cblack=v.black;
   }


   for(var i=2; i< this.dna.length; i++)
      child[i]=(random(1)<0.5?this.dna[i]:v.dna[i]);

      // if(this.black==-1)
      //   {if(v.black==-1)
      //     cblack=-1;
      //     else cblack=1}
      // else if(v.black==1)
      //   {cblack=1; child[4]+=random(-0.05,0.05);}
      // else cblack=1;

    vehicles.push(new Vehicle(this.pos.x + random(-20,20), this.pos.y  + random(-20,20), this.id*v.id, child,cblack,this.gen+1))

    sexcount++;
  }
  this.show= function(){
    var head= this.vel.heading();
    push();
    translate(this.pos.x,this.pos.y);
    rotate(head);
    strokeWeight(4);
    var r= color(255,50,0);
    var g= color(0,255,255);
    var col= lerpColor(r,g,this.health/30)




    if(this.black==-1) stroke(0)
      else stroke(col)
    line(-10,0,10,0);
  strokeWeight(2)
  line(13,0,5,5)
  line(13,0,5,-5)

  if(debug.checked()){
    stroke(0,255,255,70);
    strokeWeight(1)
    noFill();
    ellipse(0,0,this.dna[5]*2)
    stroke(255,0,0,90);
    ellipse(0,0,this.dna[6]*2)}
    //stroke(255,0,0)
    //strokeWeight(1)
    //line(10,0,this.dna[0]*30,0)
    //rotate(head);
    pop();

  }




  this.behaviours = function(good,bad){
    var steerG = this.eat(good,this.dna[5]);
    var steerB = this.eat(bad,this.dna[6]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }


  this.eat= function(list,perception){
    var closest =Infinity;
    var closestI = -1;
    for(var i=0; i< list.length; i++){
      var d= this.pos.dist(list[i]);
      if(d<closest){
        closest = d;
        closestI=i;
      }
    }
    if(closestI>-1 ){

      if(closest<perception)
      return this.seek(list[closestI])
      else return createVector(0,0);
    }
    else {
      if(foodfinish==0)  foodfinish=1;
      this.pos=createVector(-100,-100);
      return createVector(0,0);}
    // if(this.pos.dist(list[closestI])< 5)
    //   list.splice(closestI,1)
  }



  this.applyForce = function(force)
  {
    this.acc.add(force);
  }


  this.seek= function(target)
  {
    var desired= p5.Vector.sub(target,this.pos);
    desired.setMag(this.maxSpeed + map(this.gen,1,100,0.1,50));

    var steer= p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    return steer;
  }

  this.boundaries = function(){
    var desired= null;
    var d= 5;
    if(this.pos.x < d){
      desired= createVector(this.maxSpeed, this.vel.y)
    }
    else if (this.pos.x > width/2 -d){
       desired= createVector(-this.maxSpeed, this.vel.y);
    }

    else if(this.pos.y <d){
      desired= createVector(this.vel.x,this.maxSpeed);
    }
    else if(this.pos.y >height-d){
      desired= createVector(this.vel.x,-this.maxSpeeed);
    }

    if(desired!= null){
      desired.normalize();
      desired.mult(1);
      var steer = p5.Vector.sub(desired,this.vel);
      steer.limit(10 * this.maxForce);
      this.applyForce(steer);
    }
  }
}
