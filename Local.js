var Local=function (){
    var game;
    var timer=null;
    var time = 0;
    var fenshu=0;
    var bindKeyEvent=function (){
        document.onmousedown=function (e){
            tname=e.target.className;
            if(tname=="top"){
                game.rotate();
            }
            else if(tname=="left"){
                game.left();
            }
            else if(tname=="right"){
                game.right();
            }
            else if(tname=="down"){
                game.down();
            }
            else if(tname=="fal"){
                game.fal();
            }
        }
        document.onkeydown=function (e){
            if(e.keyCode==39){
                game.right();
            }
            else if(e.keyCode==40){
                game.down();
            }
            else if(e.keyCode==37){
                game.left();
            }
            else if(e.keyCode==38){
                game.rotate();
            }
            else if(e.keyCode==32){
                game.fal();
            }
        }
    }
    var move=function (){
        time+=0.5;
        if(time%1==0){
            document.getElementById("time").innerHTML=time+"s";
        }
        if(!game.down()){
            game.guding();
            fenshu=game.xiaohang();
            if(fenshu){
                document.getElementById("score").innerHTML=fenshu;
            }
            if(game.jieshu()){
                clearInterval(timer);
                alert("game over");
                return;
            }
            game.xiayige(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
        }
    }
    this.start=function (){
        clearInterval(timer);
        time=0;
        document.getElementById("time").innerHTML=time+"s";
        var doms={
            gameDiv:document.getElementById("game"),
            nextDiv:document.getElementById("next")
        }
        game=new Game();
        game.init(doms);
        bindKeyEvent();
        timer=setInterval(move,500)
    }

}
