var Game=function (){
    var gameDiv;
    var nextDiv;
    var line=0;
    var gameDate=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]
    var cur;
    var next;
    var nextDivs=[];
    var gameDivs=[];
    var initDiv=function (container,date,divs){
        for(i=0;i<date.length;i++){
            var div=[];
            for(var j=0;j<date[0].length;j++){
                var newNode=document.createElement("div");
                newNode.className="none";
                newNode.style.top=(i*20)+"px";
                newNode.style.left=(j*20)+"px";
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }
    var refreshDiv=function (date,divs){
        for(i=0;i<date.length;i++){
            for(j=0;j<date[0].length;j++){
                if(date[i][j]==0){
                    divs[i][j].className="none"
                }
                else if(date[i][j]==1){
                    divs[i][j].className="done"
                }
                else if(date[i][j]==2){
                    divs[i][j].className="current"
                }
            }
        }
    }
    var jiance=function (pos,x,y){
        if(pos.x+x<0){
            return false;
        }
        else if(pos.x+x>=gameDate.length){
            return false;
        }
        else if(pos.y+y<0){
            return false;
        }
        else if(pos.y+y>=gameDate[0].length){
            return false;
        }
        else if(gameDate[pos.x+x][pos.y+y]==1){
            return false;
        }
        else{
            return true;
        }
    }
    var jiancehefa=function (pos,date){
        for(i=0;i<date.length;i++){
            for(j=0;j<date[0].length;j++){
                if(date[i][j]!=0){
                    if(!jiance(pos,i,j)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    var clearDate=function (){
        for(i=0;i<cur.date.length;i++){
            for(j=0;j<cur.date[0].length;j++){
                if(jiance(cur.origin,i,j)){
                    gameDate[cur.origin.x+i][cur.origin.y+j]=0;
                }
            }
        }
    }
    var setDate=function (){
        for(i=0;i<cur.date.length;i++){
            for(j=0;j<cur.date.length;j++){
                if(jiance(cur.origin,i,j)){//这里做检测，就是让那些已经出格的方块不考虑了。
                    gameDate[i+cur.origin.x][j+cur.origin.y]=cur.date[i][j];
                }
            }
        }
    }
    this.down=function (){
        if(cur.canDown(jiancehefa)){
            clearDate();
            cur.down();
            setDate();
            refreshDiv(gameDate,gameDivs);
            return true;
        }
        else
            return false;
    }
    this.left=function (){
        if(cur.canLeft(jiancehefa)){
            clearDate();
            cur.left();
            setDate();
            refreshDiv(gameDate,gameDivs);
        }
    }
    this.right=function (){
        if(cur.canRight(jiancehefa)){
            clearDate();
            cur.right();
            setDate();
            refreshDiv(gameDate,gameDivs);
        }
    }
    this.rotate=function (){
        if(cur.canRotate(jiancehefa)){
            clearDate();
            cur.rotate();
            setDate();
            refreshDiv(gameDate,gameDivs);
        }
    }
    this.fal=function (){
        while(this.down());
    }
    this.guding=function (){
        for(i=0;i<cur.date.length;i++){
            for(j=0;j<cur.date[0].length;j++){
                if(jiance(cur.origin,i,j)){
                    if(gameDate[cur.origin.x+i][cur.origin.y+j]==2) {
                        gameDate[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameDate,gameDivs)
    }
    this.xiayige=function (zhonglei,fangxiang){
        cur=next;
        setDate();
        next=fangkuai.prototype.make(zhonglei,fangxiang);
        refreshDiv(gameDate,gameDivs);
        refreshDiv(next.date,nextDivs);
    }
    this.xiaohang=function (){
        for(var i=gameDate.length-1;i>=0;i--){
            var flag=0;
            for(var j=0;j<gameDate[0].length;j++){
                if(gameDate[i][j]==0){
                    flag=1;
                    break;
                }
            }
            if(flag==0) {
                line += 1;
                for (m = i; m >= 0; m--) {
                    for (n = 0; n < gameDate[0].length; n++) {
                        gameDate[m][n] = gameDate[m - 1][n];
                        gameDate[0][n] = 0;
                    }
                }
                i++;
            }
        }
        return line;
    }
    this.jieshu=function (){
        var flag=0;
        for(i=0;i<gameDate[0].length;i++){
            if(gameDate[0][i]==1){
                flag=1;
            }
        }
        return flag;
    }
    this.init=function (doms) {
        document.getElementById("score").innerHTML=0;
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = new fangkuai.prototype.make(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
        next = new fangkuai.prototype.make(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
        initDiv(gameDiv, gameDate, gameDivs);
        initDiv(nextDiv, next.date, nextDivs);
        setDate();
        refreshDiv(gameDate, gameDivs);
        refreshDiv(next.date, nextDivs);
    };
}

