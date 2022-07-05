//타임라인
/** 
    2020.07.04 - 74번째줄 수정중
**/

//버튼 그룹 생성
var numberOfGroups = 7;
var days = ["월","화","수","목","금","토","일"];
let dataArr = [];

let btnArray = ["잔류","난동","침입","배회","싸움","얼굴","",""];
var groups = new vis.DataSet();
for (var i = 0; i < numberOfGroups; i++) {
    for(var j=0; j< days.length; j++){
        names = days[i];
    }
    groups.add({
        id: i,
        content: names,
    });
}

// 드래그 버튼 생성
var btnarea02 = document.getElementById('btn03');
let btnname = ["box","point","range"];

for(let k=0; btnArray.length > k; k++){
    if(typeof btnArray[k] == "undefined" || btnArray[k] == null || btnArray[k] == ""){

    }else{
        var button02 = document.createElement('button');
        button02.draggable="true"
        button02.className = 'item';
        button02.value = "range";
        button02.innerHTML = btnArray[k];
        btnarea02.append(button02);
    }
}

// for(let k=0; btnArray.length > k; k++){
//     if(typeof btnArray[k] == "undefined" || btnArray[k] == null || btnArray[k] == ""){

//     }else{
//         var button02 = document.createElement('button');
//         // button02.draggable="true"
//         button02.className = 'item';
//         button02.value = "range";
//         button02.innerHTML = btnArray[k];
//         btnarea02.append(button02);
//         btnarea02.addEventListener("click",clickhd,  false);
//     }
// }

// 타임라인 스케줄러 생성
var numberOfItems = 7;
var items = new vis.DataSet();
var itemsPerGroup = Math.round(numberOfItems / numberOfGroups);

for (var truck = 0; truck < numberOfGroups; truck++) {
    var date = new Date();
}

// 타임라인 출력 옵션
var options = {
    //height: "100%",
    min: new Date(2022, 0, 1), // test 날짜 
    max: new Date(2022, 0, 2), // test 날짜 
    zoomMin: 1000 * 60 * 60 * 12, // 12시간 단위 설정 
    //zoomMax: 1000 * 60 * 60 * 24 * 2, // about three months in milliseconds
    stack: true,
    start: new Date(new Date().valueOf() - 10000000),
    end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
    //editable: true,
    editable: {
        add: true, // 더블클릭 했을때 생성되는 item 및 드래그 item 
        updateTime: true,  // drag 업데이트 시간
        updateGroup: false, 
        remove: true,// 삭제 버튼
        overrideItems: true
    },
    tooltipOnItemUpdateTime: true,// 툴팁
    multiselect: false,//여러개 선택
    showMajorLabels:false,//년,월 날짜 없앰
    orientation: "top",//시간 위치
    //stack: false,
};

// 타임라인 생성
var container = document.getElementById("visualization");//타임라인
timeline = new vis.Timeline(container, items, groups, options);

items.on("*", function (event, properties) {
    $("#drawing").prop("disabled", false);
    $("#edit").prop("disabled", false);
    $("#resize").prop("disabled", false);  
    $('.btn_02 .dr').addClass('active');
});


function handleDragStart(event) { // item move event
    var dragSrcEl = event.target;
    event.dataTransfer.effectAllowed = "move";
    var itemType = dragSrcEl.value;
    var item = {
        time: new Date().getTime(),
        type: itemType,
        content: dragSrcEl.innerHTML,
    };
    
    var isFixedTimes = dragSrcEl.innerHTML == "fixed times";
    if (isFixedTimes) {//item 길이 설정
        item.start = new Date();
        item.end = new Date(1000 * 60 * 60 + new Date().valueOf());
    }
    
    dataArr.push({item:item,poly:obj})//polygon,timeline arr 저장 
    event.dataTransfer.setData("text", JSON.stringify(item));
}

var items = document.querySelectorAll(".btn_02 .item"); //item class

for (var i = items.length - 1; i >= 0; i--) {
    var item = items[i];
    item.addEventListener("dragstart", handleDragStart.bind(this), false);
}


