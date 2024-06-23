let t = 0;
let duration = 100; // 动画的总帧数
let rectY = -400; // 长方形初始的Y坐标
let ellipseMoveDuration = 60; // 椭圆移动的总帧数
let ellipseMoveStartFrame; // 椭圆开始移动的帧
let rectDropDuration = 60; // 长方形下降的总帧数
let rectDropStartFrame; // 长方形开始下降的帧
let lineExpandDuration = 30; // 线条扩展的总帧数
let lineExpandStartFrame; // 线条开始扩展的帧
let triangleDropDuration = 60; // 三角形和箭头下降的总帧数
let triangleDropStartFrame; // 三角形和箭头开始下降的帧
let arrowMoveDuration = 120; // 箭头移动的总帧数
let arrowMoveStartFrame; // 箭头开始移动的帧
let pauseDuration = 42; // 每个动画部分之间的停留时间
let newShapeStartFrame; // 新的形状开始的帧
let newShapeDuration = 60; // 新的形状动画的总帧数
let squareOverEllipseStartFrame; // 新正方形包裹椭圆的开始帧
let resetAnimationFrame; // 重置动画的帧数

function setup() {
    let canvas = createCanvas(1280, 720);
    canvas.parent('canvas-container'); // 将画布放置在指定的div中
    angleMode(DEGREES);
    frameRate(60); // 设置帧率，可选
    ellipseMoveStartFrame = duration; // 椭圆开始移动的帧
    rectDropStartFrame = ellipseMoveStartFrame + ellipseMoveDuration + pauseDuration; // 长方形开始下降的帧
    lineExpandStartFrame = rectDropStartFrame + rectDropDuration + pauseDuration; // 线条开始扩展的帧
    triangleDropStartFrame = lineExpandStartFrame + lineExpandDuration + pauseDuration; // 三角形和箭头开始下降的帧
    arrowMoveStartFrame = triangleDropStartFrame + triangleDropDuration + pauseDuration; // 箭头开始移动的帧
    newShapeStartFrame = arrowMoveStartFrame + arrowMoveDuration + pauseDuration; // 新形状开始的帧
    squareOverEllipseStartFrame = newShapeStartFrame + newShapeDuration + pauseDuration; // 新正方形包裹椭圆的开始帧
    resetAnimationFrame = squareOverEllipseStartFrame + newShapeDuration + 60; // 重置动画的帧数
}

function draw() {
    if (frameCount >= resetAnimationFrame) {
        frameCount = 0; // 重置 frameCount，使动画重新开始
        return;
    }

    background(51);

    // 动画时间推进
    t = min(frameCount / duration, 1); // 使用frameCount来计算进度，确保t在0到1之间

    if (t < 1) {
        // 画逐渐变化的形状
        fill(255, 234, 62);
        noStroke();
        beginShape();
        vertex(300 * (1 - t) + width / 2 * t, 100 * (1 - t) + height / 2 * t);
        vertex(800 * (1 - t) + width / 2 * t, 100 * (1 - t) + height / 2 * t);
        vertex(400 * (1 - t) + width / 2 * t, 500 * (1 - t) + height / 2 * t);
        vertex(300 * (1 - t) + width / 2 * t, 500 * (1 - t) + height / 2 * t);
        endShape(CLOSE);

        fill(255);
        beginShape();
        vertex(800 * (1 - t) + width / 2 * t, 100 * (1 - t) + height / 2 * t);
        vertex(800 * (1 - t) + width / 2 * t, 500 * (1 - t) + height / 2 * t);
        vertex(400 * (1 - t) + width / 2 * t, 500 * (1 - t) + height / 2 * t);
        endShape(CLOSE);

        fill(255, 193, 0);
        beginShape();
        vertex(300 * (1 - t) + width / 2 * t, 500 * (1 - t) + height / 2 * t);
        vertex(400 * (1 - t) + width / 2 * t, 500 * (1 - t) + height / 2 * t);
        vertex(300 * (1 - t) + width / 2 * t, 600 * (1 - t) + height / 2 * t);
        endShape(CLOSE);
    }

    // 椭圆动画部分
    if (frameCount >= ellipseMoveStartFrame) {
        let ellipseT = (frameCount - ellipseMoveStartFrame) / ellipseMoveDuration;
        let ellipseX;
        if (ellipseT < 0.5) {
            ellipseX = lerp(width / 2 + 75, width + 100, ellipseT * 2);
        } else if (ellipseT >= 0.5 && ellipseT < 1) {
            ellipseX = lerp(-100, width / 2 + 75, (ellipseT - 0.5) * 2);
        } else {
            ellipseX = width / 2 + 75;
        }
        fill(255, 193, 0);
        noStroke();
        ellipse(ellipseX, height / 2, 112.5, 112.5); // 调整圆形位置和大小
    }

    // 动画时间推进，用于长方形的下降
    if (frameCount >= rectDropStartFrame) {
        let rectT = min((frameCount - rectDropStartFrame) / rectDropDuration, 1); // 使用frameCount来计算进度，确保rectT在0到1之间

        if (rectT < 1) {
            // 更新并绘制长方形
            rectY = lerp(-400, height / 2 - 250, rectT); // 使用lerp函数计算长方形的Y坐标
            noFill();
            stroke(255); // 设置边框颜色
            strokeWeight(4); // 设置边框宽度
            rect(width / 2 - 150, rectY, 300, 500); // 调整长方形的高度
        } else {
            // 画静止的长方形
            noFill();
            stroke(255); // 设置边框颜色
            strokeWeight(4); // 设置边框宽度
            rect(width / 2 - 150, height / 2 - 250, 300, 500); // 调整长方形的高度

            // 动画时间推进，用于线条的扩展
            if (frameCount >= lineExpandStartFrame) {
                let lineT = min((frameCount - lineExpandStartFrame) / lineExpandDuration, 1); // 使用frameCount来计算进度，确保lineT在0到1之间

                // 绘制上方线条
                let upperLineY = lerp(height / 2 - 250, height / 2 - 70, lineT); // 向下移动线条位置
                line(width / 2 - 150, upperLineY, width / 2 + 150, upperLineY);

                // 绘制下方线条
                let lowerLineY = lerp(height / 2 + 250, height / 2 + 60, lineT); // 向下移动线条位置
                line(width / 2 - 150, lowerLineY, width / 2 + 150, lowerLineY);
            }

            // 动画时间推进，用于三角形和箭头的下降
            if (frameCount >= triangleDropStartFrame) {
                let triangleT = min((frameCount - triangleDropStartFrame) / triangleDropDuration, 1); // 使用frameCount来计算进度，确保triangleT在0到1之间

                // 计算三角形和箭头的位置
                let triangleX = lerp(0, width / 2 - 150, triangleT);
                let triangleY = lerp(0, height / 2 - 250, triangleT);

                // 绘制三角形
                noFill();
                stroke(255); // 设置三角形边框颜色为白色
                strokeWeight(4); // 设置边框宽度
                beginShape();
                vertex(triangleX, triangleY);
                vertex(triangleX + 150, triangleY);
                vertex(triangleX, triangleY + 150);
                endShape(CLOSE);

                // 动画时间推进，用于箭头的移动
                if (frameCount >= arrowMoveStartFrame) {
                    let arrowT = min((frameCount - arrowMoveStartFrame) / arrowMoveDuration, 1); // 使用frameCount来计算进度，确保arrowT在0到1之间

                    // 绘制箭头
                    stroke(255, 234, 62); // 设置箭头颜色
                    strokeWeight(4);
                    let arrowX = triangleX + 75 + arrowT * (width - triangleX - 75); // 箭头中心X，逐渐向右上角移动出画布
                    let arrowY = triangleY + 75 - arrowT * (triangleY + 75); // 箭头中心Y
                    if (arrowX <= width && arrowY >= 0) { // 确保箭头在画布内
                        line(arrowX + 25, arrowY + 25, arrowX - 75 + 25, arrowY - 75 + 25); // 箭头主干
                        line(arrowX - 75 + 25, arrowY - 75 + 25, arrowX - 25 + 25, arrowY - 75 + 25); // 箭头左翼
                        line(arrowX - 75 + 25, arrowY - 75 + 25, arrowX - 75 + 25, arrowY - 25 + 25); // 箭头右翼
                    }
                } else {
                    // 绘制初始位置的箭头
                    stroke(255, 234, 62); // 设置箭头颜色
                    strokeWeight(4);
                    let arrowX = triangleX + 75; // 箭头中心X
                    let arrowY = triangleY + 75; // 箭头中心Y
                    line(arrowX + 25, arrowY + 25, arrowX - 75 + 25, arrowY - 75 + 25); // 箭头主干
                    line(arrowX - 75 + 25, arrowY - 75 + 25, arrowX - 25 + 25, arrowY - 75 + 25); // 箭头左翼
                    line(arrowX - 75 + 25, arrowY - 75 + 25, arrowX - 75 + 25, arrowY - 25 + 25); // 箭头右翼
                }
            }
        }
    }

    // 新形状的动画部分
    if (frameCount >= newShapeStartFrame) {
        let newShapeT = min((frameCount - newShapeStartFrame) / newShapeDuration, 1); // 使用frameCount来计算进度，确保newShapeT在0到1之间

        // 绘制空心黄色正方形
        noFill();
        stroke(255, 234, 62); // 设置边框颜色
        strokeWeight(4); // 设置边框宽度
        let squareSize = lerp(0, 150, newShapeT); // 动态计算正方形的大小
        let squareX = lerp(width / 2, width / 2 - 150, newShapeT); // 动态计算正方形的X位置
        let squareY = lerp(height / 2, height / 2 - 250, newShapeT); // 动态计算正方形的Y位置
        rect(squareX, squareY, squareSize, squareSize);

        // 绘制水滴形状
        let dropX = squareX - 60; // 水滴形状的X位置
        let dropY = squareY; // 水滴形状的Y位置
        let dropSize = lerp(0, 60, newShapeT); // 动态计算水滴形状的大小
        fill(255, 234, 62); // 设置水滴形状颜色
        noStroke();
        rect(dropX, dropY, dropSize, dropSize, 40, 0, 40, 40); // 使用圆角矩形绘制水滴形状

        // 在水滴形状中间添加"?"符号
        if (newShapeT >= 1) {
            fill(51); // 设置问号的颜色
            textSize(40); // 设置问号的大小
            textAlign(CENTER, CENTER); // 设置文本对齐方式
            text("?", dropX + dropSize / 2, dropY + dropSize / 2); // 绘制问号
        }
    }

    // 新正方形包裹椭圆的动画部分
    if (frameCount >= squareOverEllipseStartFrame) {
        let squareOverEllipseT = min((frameCount - squareOverEllipseStartFrame) / newShapeDuration, 1); // 使用frameCount来计算进度，确保squareOverEllipseT在0到1之间

        // 绘制包裹椭圆的正方形
        let squareSize = lerp(0, 250, squareOverEllipseT); // 动态计算正方形的大小
        let squareX = lerp(width / 2 + 75 - squareSize / 2, width / 2 + 75 - squareSize / 2, squareOverEllipseT); // 动态计算正方形的X位置
        let squareY = lerp(height / 2 - squareSize / 2, height / 2 - squareSize / 2, squareOverEllipseT); // 动态计算正方形的Y位置
        noFill();
        stroke(255, 193, 0); // 设置正方形的颜色
        strokeWeight(4); // 设置边框宽度
        rect(squareX, squareY, squareSize, squareSize); // 绘制包裹椭圆的正方形

        // 新水滴形状的动画部分
        let dropNewT = min((frameCount - squareOverEllipseStartFrame) / newShapeDuration, 1); // 使用frameCount来计算进度，确保dropNewT在0到1之间

        let dropNewX = squareX + squareSize; // 水滴形状的X位置
        let dropNewY = squareY + squareSize; // 水滴形状的Y位置
        let dropNewSize = lerp(0, 60, dropNewT); // 动态计算水滴形状的大小
        fill(255, 193, 0); // 设置水滴形状颜色
        noStroke();
        rect(dropNewX, dropNewY, dropNewSize, dropNewSize, 0, 40, 40, 40); // 使用圆角矩形绘制水滴形状

        // 在水滴形状中间添加"!"符号
        if (dropNewT >= 1) {
            fill(51); // 设置"!"符号的颜色
            textSize(40); // 设置"!"符号的大小
            textAlign(CENTER, CENTER); // 设置文本对齐方式
            text("!", dropNewX + dropNewSize / 2, dropNewY + dropNewSize / 2); // 绘制"!"符号
        }
    }
}