        var start_time = null;
        var end_time = null;
        var found = false;
        var success_cnt = 0;
        
        function Start(){
            var div = document.getElementById("whole-body");
            var start = document.getElementById("start");
            
            Generate_bomb();
            div.removeChild(start);

            //position提示 待注释！！！
          //  var position = document.createElement("span");
          //  var position_id = document.createAttribute("id");
          //  position_id.nodeValue = "position";
          //  position.setAttributeNode(position_id);
          //  div.appendChild(position);

            Check_bomb(event);

        }

        function Generate_bomb(){
            found = false;
            var bomb = document.createElement("img");

            bomb.src = "image/dog.jpg";
            bomb.id = "bomb";
            bomb.alt = "this is dog!";    
            var bomb_onclick = document.createAttribute("onclick");
            bomb_onclick.nodeValue = "Successfully_Find()";
            bomb.setAttributeNode(bomb_onclick);

            
            //随机设定位置            
            var div = document.getElementById("whole-body");
            bomb.style.position = "absolute";
            var height = div.clientHeight;
            var width = div.clientWidth;
            var bomb_height = bomb.clientHeight;
            var bomb_width = bomb.clientWidth;
            bomb.style.top = Math.random()*(height-bomb_height) + "px";
            bomb.style.left = Math.random()*(width-bomb_width) + "px";
            bomb.style.opacity = "0";//图像透明
            
            div.appendChild(bomb);  
            alert("狗子已潜伏！");
            start_time = new Date();

            /*------alarm部分-------*/
            var alarm = document.createElement("audio"); //初始化audio标签
            
            alarm.id = "alarm";          
            alarm.loop = "loop";
            alarm.src = "music/music.mp3";
            alarm.autoplay = "autoplay"

            div.appendChild(alarm);

        }

        function Check_bomb(event){
            document.getElementById("whole-body").onmousemove = function(event){
                event = event || window.event;
                var div = document.getElementById("whole-body");
                
              //  var position = document.getElementById("position");//待注释!!!

                var bomb = document.getElementById("bomb");
                var bomb_x = bomb.offsetLeft;
                var bomb_y = bomb.offsetTop;
                var bomb_height = bomb.clientHeight;
                var bomb_width = bomb.clientWidth;

                var x_dis = event.clientX - bomb_x - bomb_width/2;//到地雷中心的距离
                var y_dis = event.clientY - bomb_y - bomb_height/2;
                var dis = Math.sqrt(x_dis*x_dis + y_dis*y_dis);

             //   position.innerHTML = "x:" + x_dis + "  y:" + y_dis + "  dis:" + dis;//待注释!!!

                var alarm = document.getElementById("alarm");
                var border_dis = 5*bomb_height;
                if(dis < border_dis && !found){
                    alarm.volume = (border_dis - dis)*(1/300);//越靠近地雷，警报声越大
                }
                else{
                    alarm.volume = 0;//超出界限或地雷已被找到，则不发出警报
                }
    
            }
        }

        function Successfully_Find(){
            found = true;
            success_cnt += 1;

            var div = document.getElementById("whole-body");

            //计时提示
            end_time = new Date();
            var time_cost_sec = (end_time.getTime() - start_time.getTime()) / 1000;
            if(time_cost_sec < 60) alert("狗子已找到！本次用时为" + time_cost_sec + "秒,真是太棒啦！");
            else{
                var time_cost_min = Math.floor(time_cost_sec / 60);
                var time_cost_sec_leave = Math.floor(time_cost_sec - time_cost_min*60);
                alert("狗子已找到！本次用时为" + time_cost_min + "分" + time_cost_sec_leave + "秒");
            }

            var bomb = document.getElementById("bomb");
            bomb.style.opacity = "1";//地雷被找到后显形；

            if(success_cnt < 2)
            {
                alert("第一次挑战成功！请再重新挑战一次吧，成功后有惊喜噢");
            }
            if(success_cnt == 2)
            {
                var SurpriseButton = document.createElement("button");
                SurpriseButton.innerHTML = "此处有惊喜^_^";
                SurpriseButton.id = "SurpriseButton";

                var SurpriseBtn_onclick = document.createAttribute("onclick");
                SurpriseBtn_onclick.nodeValue = "CreateDogVideo()";
                SurpriseButton.setAttributeNode(SurpriseBtn_onclick);

                //随机设定位置
                SurpriseButton.style.top = Math.random() * (div.clientHeight - 4*SurpriseButton.clientHeight) + "px";
                

                div.appendChild(SurpriseButton);
            }
            

            var restart = document.createElement("button");//创建重新按钮
            restart.innerHTML = "重新挑战";
            restart.id = "restart";

            var restart_onclick = document.createAttribute("onclick");
            restart_onclick.nodeValue = "Restart()";
            restart.setAttributeNode(restart_onclick);

            div.appendChild(restart);


        }

        
        function Restart(){
            found = false;
            var new_bomb = document.createElement("img");
            var old_bomb = document.getElementById("bomb");
            var parent_div = document.getElementById("whole-body");
            parent_div.replaceChild(new_bomb, old_bomb);
            alert("狗子已重新潜伏！");
            start_time = new Date();


            new_bomb.src = "image/dog.jpg";
            new_bomb.id = "bomb";
            new_bomb.alt = "this is bomb!";
            var new_bomb_onclick = document.createAttribute("onclick");
            new_bomb_onclick.nodeValue = "Successfully_Find()";
            new_bomb.setAttributeNode(new_bomb_onclick);

            new_bomb.style.opacity = "0";

            
            //随机设定位置
            new_bomb.style.position = "absolute";
            var height = parent_div.clientHeight;
            var width = parent_div.clientWidth;
            var bomb_height = new_bomb.clientHeight;
            var bomb_width = new_bomb.clientWidth;
            new_bomb.style.top = Math.random()*(height-bomb_height) + "px";
            new_bomb.style.left = Math.random()*(width-bomb_width) + "px";      
            
            //移除按钮
            var restart = document.getElementById("restart");
            parent_div.removeChild(restart);
        }

        function CreateDogVideo(){
            var SurpriseButton = document.getElementById("SurpriseButton");
            var bomb = document.getElementById("bomb");
            var restart = document.getElementById("restart");
            var div = document.getElementById("whole-body");

            div.removeChild(SurpriseButton);
            div.removeChild(restart);
            div.removeChild(bomb);
            
            var DogVideo = document.createElement("video");
            DogVideo.id = "DogVideo";

            var DogVideo_src = document.createAttribute("src");
            DogVideo_src.nodeValue = "video/DogVideo.mp4";
            DogVideo.setAttributeNode(DogVideo_src);

            var DogVideo_type = document.createAttribute("type");
            DogVideo_type.nodeValue = "video/mp4";
            DogVideo.setAttributeNode(DogVideo_type);

            var DogVideo_width = document.createAttribute("width");
            DogVideo_width.nodeValue = "500";
            DogVideo.setAttributeNode(DogVideo_width);

            
            var PlayButton = document.createElement("button");
            PlayButton.innerHTML = "Play/Pause";
            PlayButton.id = "PlayButton";
            
            var PlayButton_onclick = document.createAttribute("onclick");
            PlayButton_onclick.nodeValue = "PlayOrPause()";
            PlayButton.setAttributeNode(PlayButton_onclick);
          
            div.appendChild(DogVideo);

            var br = document.createElement("br");
            div.appendChild(br);

            div.appendChild(PlayButton);

        }

        function PlayOrPause(){
            var DogVideo = document.getElementById("DogVideo");

            if(DogVideo.paused)
            {
                DogVideo.play();
            }
            else
            {
                DogVideo.pause();
            }
        }