document.addEventListener('deviceready', function(){
    // Change the color
    window.plugins.headerColor.tint("#84e6e6");
    
}, false);

function loadFile(){
  
    var subject = localStorage.getItem('subject');
    document.getElementById('subject').HTML(decodeURI(subject));
}