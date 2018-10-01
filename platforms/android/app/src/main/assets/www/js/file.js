document.addEventListener('deviceready', function(){
    // Change the color
    window.plugins.headerColor.tint("#84e6e6");
    
}, false);

$( document ).ready(function() {

    document.getElementById('subject').innerHTML = localStorage.getItem('subject');
    document.getElementById('from').innerHTML = localStorage.getItem('from');  
    var file_name = localStorage.getItem('file_name');
    var notes =  localStorage.getItem('notes');

    if(decodeURI(notes) == 'null'){
        notes = document.getElementById('notes').innerHTML = "-";
    }else{
        notes = document.getElementById('notes').innerHTML = notes;
    } 
    var hashcode = localStorage.getItem('hashcode');
    var size = localStorage.getItem('size');
    document.getElementById('linkFile').innerHTML = "<a href='#' onclick='openInAppBrowser(\""+hashcode+"\")'"
                                        +"<i class='fa fa-paperclip'></i>"+file_name+"&nbsp;("+size+" Bytes)</a>";
                                                    

    
});
function openInAppBrowser(hashcode){
    // alert(a);
    window.open('https://mediahost.ums.edu.my/api/v1/viewFile/'+hashcode, '_system');
   
}