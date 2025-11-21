// 最終課題を制作しよう
//課題3-2と変えたところに注釈入れました

let x, y;
let vx, vy;
const g = 1;
let size;
let life = 3; //ライフ追加
let obstacles = [ ]; //障害物追加、配列にしたのは複数設置するため。
let coin = {x:0, y:0, size: 50}; //コイン追加
let gameClear = false; //ゲームクリアという変数追加

function setup(){
  createCanvas(windowWidth, windowHeight);
  size = height*0.1
  x = width/2;
  y = height*0.8 - height*0.1/2;
  vx = 0;
  vy = 0;

  //障害物をおく
  //drawの関数の中に書いたら毎フレーム初期化されるため、障害物として扱えない、当たり判定などができないため外に書く
  obstacles = [
    {x: width*0.6, y: height*0.8 - 20, w: 50, h: 20},
    {x: width*0.7, y: height*0.8 - 40, w: 50, h: 20 },
    {x: width*0.1, y: height*0.8 - 40, w: 50, h: 20 },
    {x: width*0.2, y: height*0.8 - 20, w: 50, h: 20 },
    {x: width*0.9, y: height*0.8 - 120, w: 50, h: 20 },
    {x: width*0.8, y: height*0.8 - 120, w: 50, h: 20 },
    {x: width, y: height*0.8 - 60, w: 50, h: 20 },
    {x: width*0.3, y: height*0.8 - 40, w: 50, h: 20 },
  ];

  Coin(); //コインの位置決定
}

function Coin(){
  const groundY = height*0.8;
  //コインの位置は毎回ランダムになるようにrandomを使う
  coin.x = random(50, width-50);
  coin.y = random(200, groundY-100);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
 background(160, 192, 255);

 const groundY = height*0.8;
 fill(64, 192, 64);
 rect(0, groundY, width, height - groundY);

 if(keyIsDown(LEFT_ARROW)){x -= 5;}
 if(keyIsDown(RIGHT_ARROW)){x += 5;}
 if(keyIsDown("S".charCodeAt(0))){ //Sを押すと加速する
 if(keyIsDown(LEFT_ARROW)){vx -= 1;}
 if(keyIsDown(RIGHT_ARROW)){vx += 1;}
  }
else{
  vx = 0;
 }
 
 y += vy;
 if(y< groundY - size/2){
  vy += g;
  }
 else{
  vy = 0;
  y = groundY - size/2;
 }
  
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  x += vx;
  y += vy;

//障害物を描く
for (let i = 0; i < obstacles.length; i++){
  let obs = obstacles[i]; 
  fill(130, 50, 0);
  rect(obs.x, obs.y, obs.w, obs.h); 
  //↑ obstacleに入っている要素をそれぞれ取り出して四角形を描く
}

//キャラクターと障害物の当たり判定
if (crashcheck()){
//キャラクターが障害物に当たったらライフが１減る
//ただしライフがマイナスにならないようにする
  life = max(life - 1, 0); 
  x = width / 2;
  y = groundY - size/2;
  vx = 0;
  vy = 0;
}

//ライフの数を表示
fill(0);
textSize(30);
text("❤︎: " + life, 20, 40 );

//ライフが0なら"GAME OVER"と表示される
  if(life == 0){
  textSize(50);
  fill(255, 0, 0);
  text("GAME OVER", width/2-180, height/2);
  return;

}

if (!gameClear) {
//gameClearがfalse、つまりゲームクリア前の場合、コインが出る
  fill(255, 215, 0);
  noStroke();
  ellipse(coin.x, coin.y, coin.size, coin.size);

  //キャラクターの中心とコインの中心の距離dx,dyを定義
  let dx = x - coin.x; 
  let dy = y - coin.y;

  if (dx*dx + dy*dy < (size/2 + coin.size/2) * (size/2 + coin.size/2)) {
  //↑距離の計算
  //「キャラクターとコインの中心の距離の２乗」と「キャラクターの半径＋コインの半径の２乗」の比較
    gameClear = true;
    }
  } 

else {
//gameClearがtrue、つまりゲームクリア後の場合CLEAR!!と表示されてゲーム終わり
  textSize(50);
  fill(20, 130, 240);
  text("CLEAR!!", width/2-100, height/2);
    return; //残りの処理を全部スキップする＝クリアしたら強制終了
  }

//キャラクター（ロボット）を描く
push(); //push()~pop()の中の描画設定を保存する（この範囲内だけに反映される）
translate(x, y); //座標の原点をx,yに移動（(x,y)はキャラクターの中心位置を表す点）

//先にキャラクターの色をletで決めておく
let headColor = color(0, 150, 160);
let bodyColor = color(0, 120, 140);
let eyeColor = color(0);
let eyeLight = color(255);
let outlineColor = color(50);
let cheekColor = color(250, 5, 60);
let headbutton = color(255, 0, 0);

fill(headColor);
stroke(outlineColor);
strokeWeight(2);
rectMode(CENTER); //いつもみたいに左上基準ではなく、中心基準で四角形を描く（こっちの方がわかりやすい！）
rect(0, -size*0.5, size*0.8, size*0.6);  

fill(eyeColor);
noStroke();
ellipse(-size*0.2, -size*0.55, size*0.12, size*0.12);
ellipse(size*0.17, -size*0.55, size*0.12, size*0.12);

fill(eyeLight);
noStroke();
ellipse(-size*0.23, -size*0.57, size*0.05, size*0.05);
ellipse(size*0.15, -size*0.57, size*0.05, size*0.05);

fill(cheekColor);
noStroke();
rect(-size*0.3, -size*0.44, size*0.12, size*0.065);
rect(size*0.3, -size*0.45, size*0.12, size*0.065);

fill(bodyColor);
stroke(outlineColor);
rect(0, 6, size, size*0.7);

fill(outlineColor);
noStroke();
rect( -size*0.25, size*0.55, size*0.2, size*0.3, 5);
rect(  size*0.25, size*0.55, size*0.2, size*0.3, 5);

fill(headbutton);
stroke(outlineColor);
strokeWeight(2);
ellipse(0, -size*0.95, 20);

pop();
}

function crashcheck(){
//キャラクターが障害物に当たったかどうかを判定する関数
  for (let i = 0; i < obstacles.length; i++){
    let obs = obstacles[i];

    //当たり判定をするために、障害物の、キャラクターの中心と一番近い点を定める
    let closestX = constrain(x, obs.x, obs.x + obs.w);
    let closestY = constrain(y, obs.y, obs.y + obs.h);

    //一番近い点との距離を定める
    let dx = x - closestX;
    let dy = y - closestY;
  
    //当たり判定
    if (dx * dx + dy * dy < (size / 2) * (size / 2)){
    //「距離の２乗」と「半径の2乗」の比較
      return true; //当たっていたらcrashcheckはtrue→86行目
    }
  }

  return false; //どれにも当たっていなかったらfalse
}

function keyPressed(){
  const groundY = height*0.8;
  if(key == " " && y >= groundY - size/2){
    vy = -30; 
  }
}
 