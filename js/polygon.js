//다각형

/** 
    2020.07.04 -
**/


let activeLine;
let activeShape;
let canvas;
let lineArray = [];
let pointArray = [];
let obj = [];
let lcArr= [];
let listColor = ['#EC8C32','#AAB6E0','#EFAD00','#3972BE','#F2BE25','#66A0DC'];

let drawMode = false;
let toggle=false;
var btnarea = document.getElementById('btn_01');
let count = 0;
let idNum = 1;

// for(let i=0; btnArray.length > i; i++){
//     if(typeof btnArray[i] == "undefined" || btnArray[i] == null || btnArray[i] == ""){

//     }else{
//         var button = document.createElement('button');
//         button.type = 'button';
//         button.id = 'num_' + count++;
//         button.className = 'btn-styled';
//         button.innerHTML = btnArray[i];
//         btnarea.append(button);
//     }
// }

// $('.btn-styled').click(function(){
//     if($(this).hasClass('active')){
//         //dataArr.push({itemarr:$(this).innerHTML})
//         $('.btn-styled').removeClass('active');
//     }else{
//         $('.btn-styled').removeClass('active');
//         $('.btn_02 .dr').removeClass('active')
//         $(this).addClass('active');
//         //canvas.clear();
//         $("#drawing").prop("disabled", false);
//         $("#edit").prop("disabled", false);
//         $("#resize").prop("disabled", false); 
//     }
// });

function initCanvas() {
    canvas = new fabric.Canvas('canvas');
    fabric.Object.prototype.originX = 'center';
    fabric.Object.prototype.originY = 'center';

    //이벤트 리스너
    canvas.on('mouse:down', onMouseDown);//눌렀을때 
    canvas.on('mouse:up', onMouseUp);//땟을때
    canvas.on('mouse:move', onMouseMove);//움직일때
    canvas.on('object:moving', onObjectMove);//객체에 움직임 이벤트 추가
    //canvas.on('mouse:wheel', onMouseWheel);//휠이벤트
}   
    
function onMouseDown(options) {//눌렀을때  
    if (drawMode) {
        if (options.target && options.target.id === pointArray[0].id) {
            generatePolygon(pointArray);
        } else {
            addPoint(options);
        }
    }
    
    var evt = options.e;
    if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
    }
}

function onMouseUp(options) {//땟을때
    this.isDragging = false;
    this.selection = true;
}

function onMouseMove(options) {//움직일때
    if (this.isDragging) {
        var e = options.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
    } 
    if (drawMode) {
        if (activeLine && activeLine.class === 'line') {
            const pointer = canvas.getPointer(options.e);
            activeLine.set({
                x2: pointer.x,
                y2: pointer.y
            });
            const points = activeShape.get('points');
            points[pointArray.length] = {
                x: pointer.x,
                y: pointer.y,
            };
            activeShape.set({
                points
            });
        }
        canvas.renderAll();
    }
}

/*function onMouseWheel(options) {//휠 이벤트
    var delta = options.e.deltaY;
    var pointer = canvas.getPointer(options.e);
    var zoom = canvas.getZoom();  
    if (delta > 0) {
        zoom += 0.1;
    } else {
        zoom -= 0.1;
    }
    if (zoom > 20) zoom = 20;
    if (zoom < 0.1) zoom = 0.1;
    canvas.zoomToPoint({ x: options.e.offsetX, y: options.e.offsetY }, zoom);
    options.e.preventDefault();
    options.e.stopPropagation();
}*/

function onObjectMove(option) { //객체 움직임 이벤트
    const object = option.target;
    
    object._calcDimensions();
    object.setCoords();    
    canvas.renderAll();
}

function toggleDrawPolygon(event) {//다각형 그리기
    canvas.backgroundColor = 'rgba(0,0,0,0.3)';
    if (drawMode) {
        activeLine = null;
        activeShape = null;
        lineArray = [];
        pointArray = [];
        canvas.selection = true;
        drawMode = false;
        
    } else {
        canvas.selection = false;
        drawMode = true;
    }
}

function addPoint(options) {// 포인트 그리기
    const pointOption = {
        id: new Date().getTime(),
        radius: 5,
        fill: '#df4b26',
        stroke: 'rgba(100,100,100,0.5)',
        strokeWidth: 0.5,
        left: options.e.layerX / canvas.getZoom(),
        top: options.e.layerY / canvas.getZoom(),
        selectable: false,
        hasBorders: false,
        hasControls: false,
        originX: 'center',
        originY: 'center',
        objectCaching: false,
    };
    const point = new fabric.Circle(pointOption);

    if (pointArray.length === 0) {
        point.set({
            fill: '#fff'
        });
    }

    const linePoints = [
        options.e.layerX / canvas.getZoom(),
        options.e.layerY / canvas.getZoom(),
        options.e.layerX / canvas.getZoom(),
        options.e.layerY / canvas.getZoom(),
    ];
    const lineOption = {
        strokeWidth: 2,
        fill: 'rgba(100,100,100,0.5)',
        stroke: '#df4b26',
        originX: 'center',
        originY: 'center',
        selectable: true,
        hasBorders: false,
        hasControls: false,
        evented: false,
        objectCaching: false,
    };
    
    const line = new fabric.Line(linePoints, lineOption);
    line.class = 'line';

    if (activeShape) {
        const pos = canvas.getPointer(options.e);
        const points = activeShape.get('points');
        points.push({
            x: pos.x,
            y: pos.y
        });
        const polygon = new fabric.Polygon(points, {
            stroke: '#df4b26',
            strokeWidth: 1,
            fill: 'rgba(100,100,100,0.5)',
            opacity: 0.3,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false,
        });
        canvas.remove(activeShape);
        canvas.add(polygon);
        activeShape = polygon;
        canvas.renderAll();
    } else {
        const polyPoint = [{
            x: options.e.layerX / canvas.getZoom(),
            y: options.e.layerY / canvas.getZoom(),
        }, ];
        
        const polygon = new fabric.Polygon(polyPoint, {
            stroke: '#df4b26',
            strokeWidth: 1,
            fill: 'rgba(100,100,100,0.5)',
            opacity: 0.3,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false,
        });
        activeShape = polygon;
        canvas.add(polygon);
    }

    activeLine = line;
    pointArray.push(point);
    lineArray.push(line);

    canvas.add(line);
    canvas.add(point);
}

function generatePolygon(pointArray) {
    const points = [];
    for (const point of pointArray) {
        points.push({
            x: point.left,
            y: point.top,
        });
        canvas.remove(point);
    }

    obj.push(points);

    //console.log(obj)
    // 캔버스에서 라인지우기
    for (const line of lineArray) {
        canvas.remove(line);
    }

    canvas.remove(activeShape).remove(activeLine);


    // 선택 되었을때 사각형 라인 그려주기
    const polygon = new fabric.Polygon(points, {
        id: new Date().getTime(),
        stroke: '#df4b26',
        //fill: 'rgba(100,100,100,0.5)',
        opacity:0.8,
        objectCaching: false,
        moveable: true,
        selectable: true,
    });

    listColor.forEach(i => polygon.set({
        fill: i,
    }))
    // for(i in listColor){
    //     polygon.set({
    //         fill: listColor[i],
    //     });
    // }
    // const randomColor = listColor[Math.floor(Math.random() * listColor.length)];
    // polygon.set({
    //     fill: randomColor,
    // });
    canvas.renderAll();
    canvas.add(polygon);
    lcArr.push(obj);
    
    toggleDrawPolygon();
}


function polygonPositionHandler(dim, finalMatrix, fabricObject) {//다각형 위치 구하기
    var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
        y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
        { x: x, y: y },
    fabric.util.multiplyTransformMatrices(
    fabricObject.canvas.viewportTransform,
    fabricObject.calcTransformMatrix()
    )
    );
}

function actionHandler(eventData, transform, x, y) {//움직임 위치구하기
    var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
    polygonBaseSize = polygon._getNonTransformedDimensions(),
            size = polygon._getTransformedDimensions(0, 0),
            finalPointPosition = {
                x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
                y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
            };
    polygon.points[currentControl.pointIndex] = finalPointPosition;
    return true;
}


function anchorWrapper(anchorIndex, fn) {
    return function(eventData, transform, x, y) {
    var fabricObject = transform.target,
        absolutePoint = fabric.util.transformPoint({
            x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
            y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
        }, fabricObject.calcTransformMatrix()),
        actionPerformed = fn(eventData, transform, x, y),
        newDim = fabricObject._setPositionDimensions({}),
        polygonBaseSize = fabricObject._getNonTransformedDimensions(),
        newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
            newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
    fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
    return actionPerformed;
    }
}

function drawingLc(){
    for (var l = 0; l < obj.length; l++) {
        let objarr = obj[l];
        canvas.clear();
        let randomColor = listColor[l];
        
        console.log(objarr)
        var timelinepoly = new fabric.Polygon(objarr, {
            id: new Date().getTime(),
            stroke: randomColor,
            fill: randomColor,
            opacity:0.8,
            objectCaching: true,
            moveable: true,
            selectable: false,
        });
        canvas.add(timelinepoly);
        canvas.requestRenderAll(); 
    }
}

function editPolygon() { //편집할때
    let activeObject = canvas.getActiveObject();
    if (!activeObject) {
        activeObject = canvas.getObjects()[0];
        canvas.setActiveObject(activeObject);
    }

    activeObject.edit = true;
    activeObject.objectCaching = true;

    const lastControl = activeObject.points.length - 1;
    activeObject.cornerStyle = 'circle';
    activeObject.controls = activeObject.points.reduce((acc, point, index) => {
        acc['p' + index] = new fabric.Control({
            positionHandler: polygonPositionHandler,
            actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
            actionName: 'modifyPolygon',
            pointIndex: index,
        });
        return acc;
    }, {});

    activeObject.hasBorders = false;
    canvas.requestRenderAll();
}

function resizePolygon() {//사이즈 변경
    let activeObject = canvas.getActiveObject();
    if (!activeObject) {
        activeObject = canvas.getObjects()[0];
        canvas.setActiveObject(activeObject);
    }

    activeObject.edit = false;
    activeObject.objectCaching = false;
    activeObject.controls = fabric.Object.prototype.controls;
    activeObject.cornerStyle = 'circle';
    activeObject.hasBorders = true;

    canvas.requestRenderAll();
}

initCanvas();