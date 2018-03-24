window.onload = function(){

    var oNav = $("nav");
    var aLiNav = oNav.getElementsByTagName("li");
    var oArrow = $("arrow");
    var oList = $("list");
    var aLiList = getByClass(oList,"liList");
    var oContent = $("content");
    var iNow = 0;
    var iContentHeight = 0;
    var oHeader = $("header");
    var aDivList = getByClass(oList, "divList");
    var oMenu = $("menu");
    var aLiMenu = oMenu.getElementsByTagName("li");
    var orewardContent = $("rewardContent");
    var orewardContent3 = getByClass(orewardContent,"rewardContent3")[0];
    var oSabre1 = getByClass(orewardContent,"sabre1")[0];
    var oSabre2 = getByClass(orewardContent,"sabre2")[0];
    var oHomeContent = $("homeContent");
    var oHomeContent1 = getByClass(oHomeContent, "homeContent1")[0];
    var oHomeContent2 = getByClass(oHomeContent, "homeContent2")[0];
    var oAboutContent = $("aboutContent");
    var oAboutContent1 = getByClass(oAboutContent,"aboutContent1")[0];
    var aAboutImg = getByClass(oAboutContent, "aboutImg");
    var oTeamContent = $("teamContent");
    var oTeamContent1 = getByClass(oTeamContent, "teamContent1")[0];
    var oTeamContent2 = getByClass(oTeamContent, "teamContent2")[0];
    var oTeamContent3 = getByClass(oTeamContent, "teamContent3")[0];
    var oWorksContent = $("worksContent");
    var oPlane1 = getByClass(oWorksContent, "plane1")[0];
    var oPlane2 = getByClass(oWorksContent, "plane2")[0];
    var prevIndex = 0;
    var oMusic = $("music");
    var oAudio = $("audio1");
    var oLoading = $("loading");


    showLoading();
    bindNav();
    contentAuto();
    mouseWheel();
    listContentAuto();
    rewardContent();
    homeContent();
    aboutContent();
    teamContent();
    workContent();
    showMusic();
    window.onresize = fnResize();


    //加载页面
    function showLoading(){
        var oSpan = oLoading.getElementsByTagName("span")[0];
        var aDiv = oLoading.getElementsByTagName("div");
        var arr = ["sea.png","sabre.png","plane1.png","home4.png","home3.png","home2.png","home1.png","front9.png","front8.png","front7.png","front6.png","front5.png","front4.png","front3.png","front2.png","front1.png","about5.png","about3.png","about1.png",
        "bg5.jpg","bg4.jpg","bg3.jpg","bg2.jpg","bg1.jpg","behind9.png","behind8.png","behind7.png","behind6.png","behind5.png","behind4.png","behind3.png","behind2.png","behind1.png","about8.png","about7.png","about6.png","about4.png","about2.png"];
        var iImg = 0;
        for(var i=0; i<arr.length; i++){
            var objImg = new Image();
            objImg.onload = function(){
                iImg++;
                oSpan.style.width = iImg/arr.length*100 + "%";
            }
            objImg.src = "images/" + arr[i];
        }

        oSpan.addEventListener("transitionend", spanChange, false);
        oSpan.addEventListener("webkitTransitionend", spanChange, false);

        function spanChange(){
            if(oSpan.style.width == "100%"){
                oSpan.style.display = "none";
                aDiv[0].style.height = 0;
                aDiv[1].style.height = 0;
            }
        }

        aDiv[0].addEventListener("transitionend", divChange, false);
        aDiv[0].addEventListener("webkitTransitionend", divChange, false);

        function divChange(){
            oLoading.parentNode.removeChild(oLoading);
            oMusic.onclick();
            jcAnimate[0].inAn();
        }
    }


    function bindNav(){
        var oDiv = aLiNav[0].getElementsByTagName("div")[0];
        oDiv.style.width = "100%";
        oArrow.style.left = aLiNav[0].offsetLeft + aLiNav[0].offsetWidth/2 - oArrow.offsetWidth/2 + "px";

        for(var i=0; i<aLiNav.length; i++){
            aLiNav[i].index = i;
            aLiNav[i].onmousedown = function(){
                prevIndex = iNow;
                iNow = this.index;
                toMove(this.index);
            }
        }

        for(var i=0; i<aLiMenu.length; i++){
            aLiMenu[i].index = i;
            aLiMenu[i].onclick = function(){
                prevIndex = iNow;
                iNow = this.index;
                toMove(this.index);
            }
        }
    }


    function toMove(index){
            // 设置nav
        for(var i=0; i<aLiNav.length; i++){
            var oDiv = aLiNav[i].getElementsByTagName("div")[0];
            oDiv.style.width = "";
        }
        var oDiv = aLiNav[index].getElementsByTagName("div")[0];
        oDiv.style.width = "100%";

            // nav下的下标
        oArrow.style.left = aLiNav[index].offsetLeft + aLiNav[index].offsetWidth/2 - oArrow.offsetWidth/2 + "px";

          // 滚屏
        oList.style.top = - index * iContentHeight + "px";

            //设置右侧切换图标
        for(var i=0; i<aLiMenu.length; i++){
            aLiMenu[i].className = "";
        }
        aLiMenu[index].className = "active";

            //进出动画
        if(jcAnimate[index].inAn){
            jcAnimate[index].inAn();
        }
        if(jcAnimate[prevIndex].outAn){
            jcAnimate[prevIndex].outAn();
        }
    }


    function contentAuto(){
        iContentHeight = viewHeight() - oHeader.offsetHeight;
        oContent.style.height = iContentHeight + "px";

        for(var i=0; i<aLiList.length; i++){
            aLiList[i].style.height = iContentHeight + "px";
        }

        oArrow.style.left = aLiNav[iNow].offsetLeft + aLiNav[iNow].offsetWidth/2 - oArrow.offsetWidth/2 + "px";
        oList.style.top = - iNow * iContentHeight + "px";
    }


    function listContentAuto(){
        var mt = (iContentHeight - 520) / 2;
        for(var i=0; i<aDivList.length; i++){
            aDivList[i].style.marginTop = mt + "px";
        }
    }

    // 屏幕大小改变时执行
    function fnResize(){
        contentAuto();
        listContentAuto();
    }

    // 滚屏
    function mouseWheel(){
        var flag = true;
        var timer = null;
        if(oContent.addEventListener){
            oContent.addEventListener("DOMMouseScroll",function(ev){
                var ev = ev || window.event;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    toChange(ev);
                },200);
            },false)
        }//火狐
        oContent.onmousewheel = function(ev){
            var ev = ev || window.event;
            clearTimeout(timer);
            timer = setTimeout(function(){
                toChange(ev);
            },200);
        };

        function toChange(ev){
             // alert(ev.detail);     火狐  ↓ 3  ↑ -3
             // alert(ev.wheelDelta);  chrome  ↓ -120  ↑ 120
            if(ev.detail){
                flag = ev.detail > 0 ? true : false;
            }else{
                flag = ev.wheelDelta < 0 ? true : false;
            }

            if((iNow == 0 && !flag) || (iNow == aLiList.length - 1 && flag)){
                    // 关闭进出动画
                return;
            }
            prevIndex = iNow;

            if(flag){
                if(iNow < aLiList.length - 1){
                    iNow++;
                }
                toMove(iNow);
            }else{
                if(iNow != 0){
                    iNow--;
                }
                toMove(iNow);
            }

            if(ev.preventDefault){
                ev.preventDefault();
            }else{
                return false;
            }
        }
    }


    // 第一屏
    function homeContent(){
        var aLi1 = oHomeContent1.getElementsByTagName("li");
        var aLi2 = oHomeContent2.getElementsByTagName("li");
        var oldIndex = 0;
        var iNowHome = 0;
        var timer = null;

        for(var i=0; i<aLi2.length; i++){
            aLi2[i].index = i;
            aLi2[i].onclick = function(){
                for(var i=0; i<aLi2.length; i++){
                    aLi2[i].className = "";
                }
                this.className = "active";

                if(oldIndex == this.index){
                    return;
                }
                if(oldIndex < this.index){
                    aLi1[oldIndex].className = "leftHide";
                    aLi1[this.index].className = "rightShow";
                }else{
                    aLi1[oldIndex].className = "rightHide";
                    aLi1[this.index].className = "leftShow";
                }
                oldIndex = this.index;
                iNowHome = this.index;
            };
        }

        timer = setInterval(change,3000);
        oHomeContent.onmouseover = function(){
            clearInterval(timer);
        }
        oHomeContent.onmouseout = function(){
            timer = setInterval(change,3000);
        }

        function change(){
            iNowHome++;
            if(iNowHome == aLi2.length){
                iNowHome = 0;
            }

            for(var i=0; i<aLi2.length; i++){
                aLi2[i].className = "";
            }
            aLi2[iNowHome].className = "active";
            aLi1[oldIndex].className = "leftHide";
            aLi1[iNowHome].className = "rightShow";
            oldIndex = iNowHome;
        }
    }


    // 第二屏
    function rewardContent(){
        var data = [
            {img1: "images/front1.png", img2: "images/behind1.png"},
            {img1: "images/front2.png", img2: "images/behind2.png"},
            {img1: "images/front3.png", img2: "images/behind3.png"},
            {img1: "images/front4.png", img2: "images/behind4.png"},
            {img1: "images/front5.png", img2: "images/behind5.png"},
            {img1: "images/front6.png", img2: "images/behind6.png"},
            {img1: "images/front7.png", img2: "images/behind7.png"},
            {img1: "images/front8.png", img2: "images/behind8.png"},
            {img1: "images/front9.png", img2: "images/behind9.png"}
        ];

        create();
        function create(){
            for(var i=0; i<8; i++){
                var oLine = document.createElement("div");
                oLine.className = "rewardLine";
                oLine.style.left = i * 170 + "px";
                orewardContent3.appendChild(oLine);
            }

            for(var i=0; i<data.length; i++){
                var oDiv = document.createElement("div");
                oDiv.className = "rewardLogo";
                oDiv.innerHTML = '<div class="rewardBefore" style="background-image: url('+(data[i].img1)+');"></div><div class="rewardAfter" style="background-image: url('+(data[i].img2)+');"></div>';
                orewardContent3.appendChild(oDiv);
                if(i==0){
                    oDiv.style.top = "115px";
                }
                if(i > 4 && i < 9){
                    oDiv.style.left = "180px";
                }
            }
        }
    }


    // 第三屏
    function workContent(){
        var oSea1 =  getByClass(oWorksContent, "sea1")[0];
        var oSea2 =  getByClass(oWorksContent, "sea2")[0];

        setInterval(move, 1000/60);

        function move(){
            if(oSea1.offsetLeft > 1100){
                oSea1.style.left = "-1098px";
            }
            if(oSea2.offsetLeft > 1100){
                oSea2.style.left = "-1098px";
            }

            oSea1.style.left = oSea1.offsetLeft + 2 + "px";
            oSea2.style.left = oSea2.offsetLeft + 2 + "px";
        }
    }


    // 第四屏
    function aboutContent(){
        var aUl = oAboutContent1.getElementsByTagName("ul");
        var aSpan = oAboutContent1.getElementsByTagName("span");

        for(var i=0; i<aUl.length; i++){
            change(aUl[i], aSpan[i]);
        }

        function change(ul,span){
            var w = ul.offsetWidth / 2;
            var h = ul.offsetHeight / 2;
                // 获取自定义属性data-src
            var src = ul.dataset.src;

            for(var i=0; i<4; i++){
                var oLi = document.createElement("li");
                oLi.style.width = w + "px";
                oLi.style.height = h + "px";

                var oImg = document.createElement("img");
                oImg.src = src;
                oImg.style.left = - i%2 * w + "px";
                oImg.style.top = - Math.floor(i/2) * h + "px";
                oImg.oldleft = - i%2 * w;
                oImg.oldtop = - Math.floor(i/2) * h;

                oLi.appendChild(oImg);
                ul.appendChild(oLi);
            }

            var data = [
                {name: "top", value: h},
                {name: "left", value: - 2*w},
                {name: "left", value: w},
                {name: "top", value: - 2*h}
            ];

            var aImg = ul.getElementsByTagName("img");
            ul.onmouseover = function(){
                for(var i=0; i<aImg.length; i++){
                    aImg[i].style[data[i].name] = data[i].value + "px";
                }
                setStyle(span, "transform", "scale(1)");
            };
            ul.onmouseout = function(){
                for(var i=0; i<aImg.length; i++){
                    aImg[i].style[data[i].name] = aImg[i]["old" + data[i].name] + "px";
                }
                setStyle(span, "transform", "scale(1.5)");
            }
        }
    }


    //第五屏
    function teamContent(){
        var aLi = oTeamContent3.getElementsByTagName("li");
        var data = [0, 113, 214, 333, 396, 506, 618, 699, 770, 950];
        var oC = null;
        var timer1 = null;
        var timer2 = null;
        create();
        bindList();

        function create(){
            var oUl = document.createElement("ul");
            for(var i=0; i<9; i++){
                var oLi = document.createElement("li");
                oUl.appendChild(oLi);
            }
            oTeamContent3.appendChild(oUl);



            for(var i=0; i<aLi.length; i++){
                aLi[i].style.width = data[i+1] - data[i] + "px";
                aLi[i].style.backgroundPosition = - data[i] + "px 0";
            }
        }

        function bindList(){
            oTeamContent3.onmouseleave = function(){
                removeCanvas();
                for(var i=0;i<aLi.length;i++){
					aLi[i].style.opacity = 1;
				}
            }


            for(var i=0; i<aLi.length;i++){
                aLi[i].index = i;
                aLi[i].onmouseover = function(){
                    addCanvas();
                    oC.style.left = data[this.index] + "px";
                    oC.width = data[this.index+1] - data[this.index];
                    oC.height = aLi[this.index].offsetHeight;
                    for(var i=0;i<aLi.length;i++){
                        aLi[i].style.opacity = 0.5;
                    }
                    this.style.opacity = 1;
                }
            }
        }

        function addCanvas(){
            if(!oC){
                oC = document.createElement("canvas");
                oC.id = "canvasBubble";
                oTeamContent3.appendChild(oC);
                bindCanvas();
            }
        }

        function removeCanvas(){
            clearInterval(timer1);
            clearInterval(timer2);
            oTeamContent3.removeChild(oC);
            oC = null;
        }

        function bindCanvas(){
            var oGC = oC.getContext("2d");
                // 存储要绘制的所有图形的数据
            var setArr = [];

            timer1 = setInterval(function(){
                oGC.clearRect(0,0,oC.width,oC.height);

                for(var i=0; i<setArr.length; i++){
                    setArr[i].num += 5;
                    setArr[i].x = setArr[i].startX - Math.sin(setArr[i].num*Math.PI/180) * setArr[i].step;
                    setArr[i].y = setArr[i].startY - (setArr[i].num*Math.PI/180) * setArr[i].step;

                    if(setArr[i].y < 100){
                        setArr.splice(i,1);
                    }
                }

                for(var i=0; i<setArr.length; i++){
                    oGC.fillStyle = "rgba("+setArr[i].c1+","+setArr[i].c2+","+setArr[i].c3+","+setArr[i].c4+")";
                    oGC.beginPath();
                    oGC.moveTo(setArr[i].x, setArr[i].y);
                            // 圆心点 半径 弧度 顺时针
                    oGC.arc(setArr[i].x, setArr[i].y, setArr[i].r, 0, 360*Math.PI/180,false);
                    oGC.closePath();
                    oGC.fill();
                }
            },1000/60);

            timer2 = setInterval(function(){
                var x = Math.random()*oC.width;
                var y = oC.height - 10;
                var r = Math.random()*6 + 2;
                var c1 = Math.round(Math.random()*255);
                var c2 = Math.round(Math.random()*255);
                var c3 = Math.round(Math.random()*255);
                var c4 = 1;
                var num = 0;
                var step = Math.random()*20 + 10;
                var startX = x;
                var startY = y;

                setArr.push({
                    x: x,
                    y: y,
                    r: r,
                    c1: c1,
                    c2: c2,
                    c3: c3,
                    c4: c4,
                    num: num,
                    step: step,
                    startX: startX,
                    startY: startY
                });
            }, 200);
        }
    }


    // 进出动画
    var jcAnimate = [
        {
            inAn: function(){
                oHomeContent1.style.opacity = 1;
                oHomeContent2.style.opacity = 1;
                setStyle(oHomeContent1, "transform", "translate(0,0)");
                setStyle(oHomeContent2, "transform", "translate(0,0)");
            },
            outAn: function(){
                oHomeContent1.style.opacity = 0;
                oHomeContent2.style.opacity = 0;
                setStyle(oHomeContent1, "transform", "translate(0,-200px)");
                setStyle(oHomeContent2, "transform", "translate(0,200px)");
            }
        },
        {   inAn: function(){
                oSabre1.style.top = "30px";
                oSabre1.style.left = "-150px";
                oSabre2.style.left = "-90px";
                oSabre2.style.top = "30px";

            },
            outAn: function(){
                oSabre1.style.top = "-300px";
                oSabre1.style.left = "-210px";
                oSabre2.style.left = "90px";
                oSabre2.style.top = "-300px";
            }
        },
        {
            inAn: function(){
                setStyle(oPlane1, "transform", "translate(0,0)");
                setStyle(oPlane2, "transform", "translate(0,0)");
            },
            outAn: function(){
                setStyle(oPlane1, "transform", "translate(-200px,-200px)");
                setStyle(oPlane2, "transform", "translate(-200px,200px)");
            }
        },
        {
            inAn: function(){
                setStyle(aAboutImg[0], "transform", "rotate(0)");
                setStyle(aAboutImg[1], "transform", "rotate(0)");
                setStyle(aAboutImg[2], "transform", "rotate(0)");
                setStyle(aAboutImg[3], "transform", "rotate(0)");
            },
            outAn: function(){
                setStyle(aAboutImg[0], "transform", "rotate(45deg)");
                setStyle(aAboutImg[1], "transform", "rotate(-45deg)");
                setStyle(aAboutImg[2], "transform", "rotate(45deg)");
                setStyle(aAboutImg[3], "transform", "rotate(-45deg)");
            }
        },
        {
            inAn: function(){
                oTeamContent1.style.opacity = 1;
                oTeamContent2.style.opacity = 1;
                setStyle(oTeamContent1, "transform", "translate(0,0)");
                setStyle(oTeamContent2, "transform", "translate(0,0)");
            },
            outAn: function(){
                oTeamContent1.style.opacity = 0;
                oTeamContent2.style.opacity = 0;
                setStyle(oTeamContent1, "transform", "translate(-300px,0)");
                setStyle(oTeamContent2, "transform", "translate(300px,0)");
            }
        }
    ];

    for(var i=0; i<jcAnimate.length; i++){
        jcAnimate[i].outAn();
    }
    // jcAnimate[1].outAn();
    // setInterval(function(){
    //     jcAnimate[1].inAn();
    // },1000);

    //加载音乐
    function showMusic(){
        var onoff = true;
        oMusic.onclick = function(){
            if(onoff){
                this.style.background = "url(images/musicon.gif)";
                oAudio.play();
            }else{
                this.style.background = "url(images/musicoff.gif)";
                oAudio.pause();
            }
            onoff = !onoff;
        }
    }


    function $(id){
        return document.getElementById(id);
    }

    function getByClass(oParent, sClass){
        var aElem = oParent.getElementsByTagName("*");
        var arr = [];
        for(var i=0; i<aElem.length; i++){
            if(aElem[i].className == sClass){
                arr.push(aElem[i]);
            }
        }
        return arr;
    }

    function viewWidth(){
        return window.innerWidth || document.documentElement.clientWidth;
    }

    function viewHeight(){
        return window.innerHeight || document.documentElement.clientHeight;
    }

    function setStyle(obj, attr, value){
        obj.style[attr] = value;
        obj.style["-webkit-" + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
    }
}
