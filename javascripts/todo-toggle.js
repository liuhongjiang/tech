$(document).ready(function(){
    $(".title-fold").prepend("<code style='font-weight:normal;color:gray;font-size:75%;vertical-align:text-top;'>[+]</code>");
    $(".title-fold").next(".toggle-box").css({display:"none"});
    $(".title-unfold").prepend("<code style='font-weight:normal;color:gray;font-size:75%;vertical-align:text-top;'>[-]</code>");
});

$(document).ready(function(){
    $(".toggle-title").click(function(){
        $(this).next(".toggle-box").slideToggle();
        var value = $(this).children(":first").text();
        if(value == "[+]"){
            $(this).children(":first").text("[-]");
        }else{
            $(this).children(":first").text("[+]");
        }
    });
});
