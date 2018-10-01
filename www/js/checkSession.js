// check if session valid then no need to login
function checkSession(){
    if(localStorage.getItem('userid')){
        window.location = "page/inbox.html";
    }
}
