document.addEventListener('deviceready', function(){
    // Change the color
    window.plugins.headerColor.tint("#84e6e6");
    
}, false);

function loadInbox(){
    var userId =  localStorage.getItem('userid');
    if(userId){
            $('#tblInbox').empty();
            getInbox(userId,0,10);    
    }else{
        window.location = "../index.html";
    }
}

function getInbox(userId, startLimit, endLimit){
    var values = {  
                    userid :userId, 
                    public_key: getPublicKey(), 
                    secret_key: getSecretKey(),
                    limitStart: startLimit,
                    limitEnd:endLimit
                };
    var countUnreadMsg = 0;
    localStorage.setItem("endLimit",endLimit);
    loadingStart();// loading spinner start
    $.ajax({   
        url: "https://eoffice.ums.edu.my/test/sisef/index.php/api/inbox",
        type: "post",
        dataType: 'json',
        data: values ,
        success: function (response) {
            $('#test').hide();
            if(response.status == true){             
                $.each(response.data, function(index, row) {
                    if(row.new == 1){
                        countUnreadMsg = parseInt(countUnreadMsg) + 1;
                    }
                    $('#tblInbox').append(createList(row)); 
                });
                loadingEnd(); // loading spinner end
                loadPushNotificationForUnreadMsg(countUnreadMsg); // push noti for unread msg
                localStorage.setItem("unreadMsg",countUnreadMsg);
                $('#tblInbox').listview('refresh');
                $('#btnLoadMore').css('display','block');
            }else{
                errorNotification("Error! Please contact administration for more details.",null,"Error list inbox file! ","Back");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

// create viewlist
function createList(row){
//  return '<li class="listitem"><a href="javascript:void(0)" data-transition="slide" class="ui-btn ui-corner-all ui-shadow ui-btn-inline"'
//         + '" onclick="viewFile(\''
//             +encodeURI(row.subject)
//             +'\',\''
//             +encodeURI(row.from)
//             +'\',\''
//             +encodeURI(row.file_name)
//             +'\',\''
//             +encodeURI(row.size)
//             +'\',\''
//             +encodeURI(row.file_name_hashcode)
//             +'\',\''
//             +encodeURI(row.notes) +'\')">'
//         +   '<h5>'+row.subject+'</h5>'
//         +   '<p>'+row.from+'</p>'
//         +   '</a></li>';

return "<li class='listitem'>"
        + "<a href='javacript:void(0)' data-transition='slide' class='ui-btn ui-corner-all ui-shadow ui-btn-inline' "
        + "onclick='viewFile(\""
        + encodeURI(row.subject)
        + "\", \""
        +encodeURI(row.from)
        + "\", \""
        +encodeURI(row.file_name)
        + "\", \""
        +encodeURI(row.size)
        + "\", \""
        +encodeURI(row.file_name_hashcode)
        + "\", \""
        +encodeURI(row.notes) + "\")'>"
        // +"onclick='testA(\""+tt+"\")' >"
        +"<h5>"+row.subject+"</h5>"
        +"<p>"+row.from+"</p>"
        +"</a></li>";
}


// viewFile
function viewFile(subject,from,file_name,size,hashcode,notes){
    var noteData = "";

    if(decodeURI(notes) == 'null'){
        noteData = '<li style="white-space:normal;">-</li>'
    }else{
        noteData ='<li style="white-space:normal;">'+decodeURI(notes)+'</li>'
    } 

    var viewPageFile = $('<div data-role="page" ><div data-role="header"><h1>'
                        +decodeURI(from)+ '</h1>'
                        +'<a href="#inbox" data-direction="reverse" data-transition="slide" data-icon="arrow-l" data-iconpos="notext"></a>'
                        +'</div><div data-role="content"><ul data-role="listview">'
                        +'<li data-role="list-divider">Subject</li>'
                        +'<li style="white-space:normal;">'+decodeURI(subject)+'</li>'
                        +'<li data-role="list-divider">From</li>'
                        +'<li style="white-space:normal;">'+decodeURI(from)+'</li>'
                        +'<li data-role="list-divider">Note</li>'
                        +noteData
                        +'<li data-role="list-divider"></li>'
                        +'<li><a href="#" onclick="openInAppBrowser(\''+hashcode+'\')">'
                        +'<i class="fa fa-paperclip"></i>'+decodeURI(file_name)+'&nbsp;('+decodeURI(size)+' Bytes)</a></li>'
                        );
    viewPageFile.appendTo( $.mobile.pageContainer);
    
    $.mobile.changePage( viewPageFile, {transition:"slide"});
}

function openInAppBrowser(a){
    // alert(decodeURI(a));
    window.open('https://mediahost.ums.edu.my/api/v1/viewFile/'+decodeURI(a), '_system');
    // var txtas = decodeURI(a);
    // alert(txtas);
    // alert('Work still on progress!');
    // var repoUrl = "http://mediahost.ums.edu.my/api/v1/viewFile/"+txtas;
    // window.open(repoUrl, '_system');
}

function loadMore(){
    var limit = localStorage.getItem("endLimit");
    var userId =  localStorage.getItem('userid');
    getInbox(userId,limit,parseInt(limit)+10);
}


function doLogout(){
    loadingStart();
    localStorage.clear();
    loadingEnd();
    loadInbox();
}



function loadPushNotificationForUnreadMsg(noUnreadMsg){
    var unreadMsg = localStorage.getItem("noUnreadMsg");
    if(unreadMsg){
        if(localStorage.getItem("noUnreadMsg") != noUnreadMsg){
            localStorage.setItem("noUnreadMsg",noUnreadMsg);
            cordova.plugins.notification.local.schedule({
                title: 'SISEF',
                text: 'You have '+noUnreadMsg+' number of unread letters.',
                foreground: true,
                sound: false
            });
        }
    }else{
        
        cordova.plugins.notification.local.schedule({
            title: 'SISEF',
            text: 'You have '+noUnreadMsg+' number of unread letters.',
            foreground: true,
            sound: true
        });
    }
    
}