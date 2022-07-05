$(function(){
    $("#drawing").prop("disabled", true);
    $("#edit").prop("disabled", true);
    $("#resize").prop("disabled", true); 
    

    /* polygon btn */
    $("#drawing").on("click", function() {
        toggleDrawPolygon();
        // if($(this).hasClass('active')){
        //     $('.btn_02 .dr').removeClass('active');
        // }else{
        //     $('.btn_02 .dr').removeClass('active');
        //     $(this).addClass('active');
        // }
    });

    $("#edit").on("click", function() {
        editPolygon();
        // if($(this).hasClass('active')){
        //     $('.btn_02 .dr').removeClass('active'); 
        // }else{
        //     $('.btn_02 .dr').removeClass('active');
        //     $(this).addClass('active');
        // }
    });
    
    $("#resize").on("click", function() {
        resizePolygon();
        // if($(this).hasClass('active')){
        //     $('.btn_02 .dr').removeClass('active');
        // }else{
        //     $('.btn_02 .dr').removeClass('active');
        //     $(this).addClass('active');
        // }
    });

    $("#remove").on("click", function() {
        canvas.clear();
    });

    $("#save").on("click", function() {
        // dataArr.push({objarr:obj})
        // localStorage.setItem('item', JSON.stringify(dataArr));
        // $('.btn-styled').removeClass('active');
        // $('.btn_02 .dr').removeClass('active');
        // $('#drawing').off('click');
        // $('#edit').off('click');
        // $('#resize').off('click');
        // canvas.clear();
    });

    // $(".vis-item .vis-drag-center").on("click", function() {
    //     console.log("123")
    // });
});

function send(){
    $.ajax({
        // 요청 시작 부분
        url: reqURL, //주소
        data: JSON.stringify(dataArr), //전송 데이터
        type: "POST", //전송 타입
        async: true, //비동기 여부
        timeout: 5000, //타임 아웃 설정
        dataType: "JSON", //응답받을 데이터 타입 			
        contentType: "application/json; charset=utf-8", //헤더의 Content-Type을 설정
                        
        // 응답 확인 부분 - json 데이터 받기
        // success: function(response) {
        //     console.log("");
        //     console.log("[requestPostBodyJson] : [response] : " + JSON.stringify(response));    				
        //     console.log("");    				
        // },
                        
        // 에러 확인 부분
        error: function(err) {
            console.log("");
            console.log("[requestPostBodyJson] : [error] : " + JSON.stringify(err));
            console.log("");    				
        },
                        
        // 완료 확인 부분
        complete:function(data,textStatus) {
            console.log(data);
            console.log("[requestPostBodyJson] : [complete] : " + textStatus);
            console.log("");    				
        }
    });									
}	  



