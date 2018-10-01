document.getElementById("doLogin").addEventListener("click",doLogin);


function doLogin(){
    
    var userId = $("#userid").val();
    var pwd = $("#pwd").val();
    
    var values = {  userid :userId, 
                    pwd: pwd, 
                    public_key: getPublicKey(), 
                    secret_key: getSecretKey(),
                }; 
    loadingStart();
    $.ajax({
        url: "https://eoffice.ums.edu.my/test/sisef/index.php/api/login",
        type: "post",
        dataType: 'json',
        data: values ,
        success: function (response) {
            // alert(response);
            if(response.status == true){
                localStorage.clear();
                localStorage.setItem("loggedIn", 1);
                localStorage.setItem("userid", response.valid_userid);
                loadingEnd();
                window.location = "page/inbox.html";
            }else{
                loadingEnd();
                errorNotification("Error! Please use AD authentication.",null,"Fail to login! ","Back");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
} 

