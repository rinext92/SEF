function errorNotification(msg,callback,title,btnName){
    navigator.notification.alert(
        msg,
        callback,
        title,
        btnName
    );
}