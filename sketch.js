var trex,trexCorrendo,chao , imagemChao, subchao,nuvem,imagemNuvem,cacto,escolhercacto,tempojogo,imagemFim,imagemReniciar;
var sompulo, sommorrendo, somCheckpoint
var imagemCacto1,imagemCacto2,
imagemCacto3,imagemCacto4,imagemCacto5,imagemCacto6

const jogar = 1;
const encerrar = 0;
var estadoJogo = jogar;
function preload(){
trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png")
  
  trexcolidiu = loadAnimation("trex_collided.png")
  
  imagemChao = loadImage("ground2.png")
  
  imagemNuvem = loadImage("cloud.png")
  
  imagemCacto1 = loadImage("obstacle1.png")
  imagemCacto2 = loadImage("obstacle2.png")
  imagemCacto3 = loadImage("obstacle3.png")
  imagemCacto4 = loadImage("obstacle4.png")
  imagemCacto5 = loadImage("obstacle5.png")
  imagemCacto6 = loadImage("obstacle6.png")
  
 imagemFim = loadImage("gameOver.png")
  imagemReniciar = loadImage("restart.png")
  
  sompulo = loadSound("jump.mp3")
  sommorrendo = loadSound("die.mp3")
  somCheckpoint = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200)
//criando o Sprite do trex- colocando animacao
 trex = createSprite(50,100,20,40)
 trex.addAnimation("Correndo",trexCorrendo)
 trex.addAnimation("colidiu",trexcolidiu )
 trex.scale = 0.5
//criando o sprite do chao e colocando a imagem
  chao = createSprite(200,180,500,10)
  chao.addAnimation("chao", imagemChao)
//criando o subchao e deixando ele invisivel
  subchao = createSprite(200,190,500,10)
  subchao.visible = false
  
  fimDejogo = createSprite(300,80,30,30)
  fimDejogo.addAnimation("fimdeJogo",imagemFim)
  fimDejogo .scale = 0.5
  
  reniciar = createSprite(300,120,30,30)
  reniciar.addAnimation("reniciar",imagemReniciar)
  reniciar .scale = 0.5
  trex.setCollider("circle", 0,8,35)
  trex.debug =false
  
  
  
  
  tempoJogo = 0;
  grupoDeCactos = new Group()
  grupoDeNuvens = new Group()
 }

  




function draw() {
  background(255)
  
     text("tempo:"+tempoJogo,500,30)
  

 

  
  
  
  
  
  if (estadoJogo == jogar){
  
    
    
    
    
 tempoJogo=tempoJogo+1
    
    fimDejogo.visible = false
    reniciar.visible  = false
    
 chao.velocityX = -(7 + tempoJogo / 100)
     
   
if(tempoJogo > 0 && tempoJogo % 100 == 0){
  somCheckpoint.play()
}
    
    
    
    
    
  if(chao.x < 0){
   chao.x = chao.width / 2
  }
    
  
  
  if(keyDown("space") && trex.y > 161){
      trex.velocityY = - 12
         sompulo.play()
  
  }

    
     gerarNuvens()
 
  gerarCactos()

        
 if(grupoDeCactos.isTouching(trex)){
    estadoJogo = encerrar;
   sommorrendo.play()
 }
    
    
    
  }else if(estadoJogo == encerrar){
  chao.velocityX = 0 
    
          fimDejogo.visible = true
    reniciar.visible  = true
  grupoDeCactos.setVelocityXEach(0);
  grupoDeNuvens.setVelocityXEach(0);
  grupoDeCactos.setLifetimeEach(-1);
  grupoDeNuvens.setLifetimeEach(-1);
  trex.changeAnimation("colidiu",trexcolidiu)
    
  trex.velocityX =0;
  }


      trex.velocityY = trex.velocityY + 1
  
  trex.collide(subchao)
  
  if(mousePressedOver(reniciar)  ){
    restart()

  }
  drawSprites()
  
 
  
}
  
    function restart(){
      tempoJogo = 0
    estadoJogo = jogar
    fimDejogo.visible = false  
    reniciar.visible  = false
      
     grupoDeCactos.destroyEach() 
     grupoDeNuvens.destroyEach()   
   trex.changeAnimation("Correndo",trexCorrendo)    
    }

  


 function gerarCactos(){
  if(frameCount %80 == 0 ){
    cacto = createSprite(600,165,10,40)
    cacto.velocityX = -(7 + tempoJogo / 100) 
    
    
    escolherCacto = Math.round(random(1,6))
    switch(escolherCacto){
       case 1 : cacto.addImage(imagemCacto1)
        break
       case 2 : cacto.addImage(imagemCacto2)
        break
       case 3 : cacto.addImage(imagemCacto3)
        break
        case 4 : cacto.addImage(imagemCacto4)
        break
        case 5 : cacto.addImage(imagemCacto5)
        break
        case 6 : cacto.addImage(imagemCacto6)
         cacto.scale = 0.3
        break
        default : break;
        
    }
    cacto.scale = 0.4
    
    cacto.lifetime = 300;
    
    
  
    grupoDeCactos.add(cacto)
    
  }
 }


function gerarNuvens(){
  if(frameCount %60 == 0 ){
  nuvem = createSprite(600,100,50,10)
  nuvem.velocityX = -3
    
  nuvem.addAnimation("nuvem passando", imagemNuvem)
    nuvem.y = Math.round(random(60,100))
    nuvem.depth = trex.depth
    
    trex.depth = trex.depth + 1
    
    nuvem.scale = 0.4
    
    nuvem.lifetime = 300
    grupoDeNuvens.add(nuvem);
}
}