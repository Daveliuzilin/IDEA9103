var square=function (){
    this.date=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    this.origin={
        x:0,
        y:0
    }
    this.fangxiang=0;
}
square.prototype.canRotate=function (jiancehefa){
    var t=this.fangxiang+1;
    if(t==4){
        t=0;
    }
    var test=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    for(i=0;i<this.date.length;i++){
        for(j=0;j<this.date[0].length;j++){
            test[i][j]=this.rotates[t][i][j];
        }
    }
    return jiancehefa(this.origin,test);
}
square.prototype.canDown=function (jiancehefa){
    var test={};
    test.x=this.origin.x+1;
    test.y=this.origin.y;
    return jiancehefa(test,this.date);
}
square.prototype.canLeft=function (jiancehefa){
    var test={};
    test.x=this.origin.x;
    test.y=this.origin.y-1;
    return jiancehefa(test,this.date);
}
square.prototype.canRight=function (jiancehefa){
    var test={};
    test.x=this.origin.x;
    test.y=this.origin.y+1;
    return jiancehefa(test,this.date);
}
square.prototype.down=function (){
    this.origin.x+=1;
}
square.prototype.left=function (){
    this.origin.y-=1;
}
square.prototype.right=function (){
    this.origin.y+=1;
}
square.prototype.rotate=function (num){
    if(!num) num=1;
    this.fangxiang=(this.fangxiang+num)%4;
    if(this.fangxiang==4){
        this.fangxiang=0;
    }
    for(i=0;i<this.date.length;i++){
        for(j=0;j<this.date[0].length;j++){
            this.date[i][j]=this.rotates[this.fangxiang][i][j];
        }
    }
}
