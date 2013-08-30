seedit.tracker
==============

## JS单独使用

    new Image().src='http://127.0.0.1:8002/_.gif?name=hello';
    
    
## 配合 `seedit.GA-event-track` 使用

    seedit.analytics.addService('seeditracker',function(key){
         new Image().src='http://127.0.0.1:8002/_.gif?name='+encodeURI(key);
    });
