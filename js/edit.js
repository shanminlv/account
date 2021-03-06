(function(){
    
    var html = '';
    var items = util.$("list_item");
    var list_count = 0;
    console.log('this is length:'+localStorage.length);
    console.log('this is count:'+localStorage.count);
    var key_name=[];
    //localStorage.clear();
    
    for(key in localStorage){
        
        key_name.push(key);
        
        if(localStorage.hasOwnProperty(key) && key!=="length" && key!=="count"){
            var obj = util.readData(key);
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth()+1;
            var date = now.getDate();
            var save_date = date+ '/' +month+'/'+year;
            var key2 = key.replace(/\d*/g, "");
            var colorClass = key2 == 'income'? "earn" : "cost" ;
            var symbol =  key2 == 'income'? '+':'-';
            html += '<div id="list_wrap'+list_count+'">'+'<div id="date_wrap'+list_count+'" class="date_wrap"><div class="date">'+save_date+'</div></div><div id="list_con'+list_count+'" class="list_con"><div class="list_img"><img src="images/'+key2+'.png"/></div>'
                 + '<div class="list_num '+ colorClass +'">' + symbol + obj.money + '</div>'
                 + '<div class="list_msg">'+ obj.msg +'</div>'
                 +'<div class="list_next"><img src="images/next2.png"/></div>'+ '<div class="edit" id="list_edit'+list_count+'"><a href="#"><img src="images/edit2.png"/></a></div>'+'<div class="delete" id="list_delete'+list_count+'"><a href="#"><img src="images/delete2.png"/></a></div>'+'</div>'+'</div>';
              list_count++;
        }
    }
    items.innerHTML = html;
    
    console.log(key_name);
    console.log(localStorage)
    var list_con=[],
        list_delete=[],
        list_edit=[];
    for(var m=0;m<list_count;m++){
        list_con[m] = util.$("list_con"+m);
        list_delete[m] = util.$("list_delete"+m);
        list_edit[m] = util.$("list_edit"+m);
        
        //向左滑动
        (function(m){
            $("#list_con"+m).swipeLeft(function(){
                if(this.style.overflow=='visible'){
                    this.style.overflow='hidden';
                    this.style.left=0;
                }else{
                    this.style.overflow='visible';
                    this.style.left='-138px';
                }
                util.addEvent(document,'touchstart',function(){
                    list_con[m].style.overflow='hidden';
                    list_con[m].style.left=0;
                });
            });
        })(m);
        
        //监听按下删除事件，绑定删除该条记录函数
        (function(m){
            util.addEvent(list_delete[m],'touchstart',function(event){
            event=util.getEvent(event);
            util.preventEvent(event);
            util.stopEvent(event);
            var target = util.getTarget(event);
            for(var n=0;n<4;n++){
                target=target.parentNode;
            }
            
            var keyname = key_name[m];
            console.log(keyname);
            localStorage.removeItem(keyname);
            console.log(localStorage.count);
            target.innerHTML=" ";
        });
        })(m);
        
        //监听按下编辑事件，绑定编辑该条记录的函数
        (function(m){
            util.addEvent(list_edit[m],'touchstart',function(event){
                event=util.getEvent(event);
                util.preventEvent(event);
                var keyname = key_name[m];
                console.log(keyname);
                url = 'edit.html?keyname='+keyname;
                window.location.href=url;
            });
        })(m);
     
    }
    
    
    
})();