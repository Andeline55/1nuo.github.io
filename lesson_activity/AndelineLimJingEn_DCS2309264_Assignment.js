let t = 0;
let duration = 100; // Total frames for the animation
let rectY = -400; // Initial Y coordinate of the rectangle
let ellipseMoveDuration = 60; // Total frames for the ellipse movement
let ellipseMoveStartFrame;
let rectDropDuration = 60; // Total frames for the rectangle drop
let rectDropStartFrame;
let lineExpandDuration = 30; // Total frames for the line expansion
let lineExpandStartFrame;
let triangleDropDuration = 60; // Total frames for the triangle and arrow drop
let triangleDropStartFrame;
let arrowMoveDuration = 120; // Total frames for the arrow movement
let arrowMoveStartFrame;
let pauseDuration = 42; // Pause duration between each part of the animation
let newShapeStartFrame;
let newShapeDuration = 60; // Total frames for the new shape animation
let squareOverEllipseStartFrame;
let resetAnimationFrame;

function setup() {
    let canvas = createCanvas(1280, 720);
    canvas.parent('canvas-container'); // Attach canvas to the specified div
    angleMode(DEGREES);
    frameRate(60);
    ellipseMoveStartFrame = duration;
    rectDropStartFrame = ellipseMoveStartFrame + ellipseMoveDuration + pauseDuration;
    lineExpandStartFrame = rectDropStartFrame + rectDropDuration + pauseDuration;
    triangleDropStartFrame = lineExpandStartFrame + lineExpandDuration + pauseDuration;
    arrowMoveStartFrame = triangleDropStartFrame + triangleDropDuration + pauseDuration;
    newShapeStartFrame = arrowMoveStartFrame + arrowMoveDuration + pauseDuration;
    squareOverEllipseStartFrame = newShapeStartFrame + newShapeDuration + pauseDuration;
    resetAnimationFrame = squareOverEllipseStartFrame + newShapeDuration + 60;
}

function draw() {
    if (frameCount >= resetAnimationFrame) {
        frameCount = 0;
        return;
    }

    background(51);
    t = min(frameCount / duration, 1);

    if (t < 1) {
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
        ellipse(ellipseX, height / 2, 112.5, 112.5);
    }

    if (frameCount >= rectDropStartFrame) {
        let rectT = min((frameCount - rectDropStartFrame) / rectDropDuration, 1);
        if (rectT < 1) {
            rectY = lerp(-400, height / 2 - 250, rectT);
            noFill();
            stroke(255);
            strokeWeight(4);
            rect(width / 2 - 150, rectY, 300, 500);
        } else {
            noFill();
            stroke(255);
            strokeWeight(4);
            rect(width / 2 - 150, height / 2 - 250, 300, 500);
            if (frameCount >= lineExpandStartFrame) {
                let lineT = min((frameCount - lineExpandStartFrame) / lineExpandDuration, 1);
                let upperLineY = lerp(height / 2 - 250, height / 2 - 70, lineT);
                line(width / 2 - 150, upperLineY, width / 2 + 150, upperLineY);
                let lowerLineY = lerp(height / 2 + 250, height / 2 + 60, lineT);
                line(width / 2 - 150, lowerLineY, width / 2 + 150, lowerLineY);
            }
            if (frameCount >= triangleDropStartFrame) {
                let triangleT = min((frameCount - triangleDropStartFrame) / triangleDropDuration, 1);
                let triangleX = lerp(0, width / 2 - 150, triangleT);
                let triangleY = lerp(0, height / 2 - 250, triangleT);
                noFill();
                stroke(255);
                strokeWeight(4);
                beginShape();
                vertex(triangleX, triangleY);
                vertex(triangleX + 150, triangleY);
                vertex(triangleX, triangleY + 150);
                endShape(CLOSE);
                if (frameCount >= arrowMoveStartFrame) {
                    let arrowT = min((frameCount - arrowMoveStartFrame) / arrowMoveDuration, 1);
                    stroke(255, 234, 62);
                    strokeWeight(4);
                    let arrowX = triangleX + 75 + arrowT * (width - triangleX - 75);
                    let arrowY = triangleY + 75 - arrowT * (triangleY + 75);
                    if (arrowX <= width && arrowY >= 0) {
                        line(arrowX + 25, arrowY + 25, arrowX - 75 + 25, arrowY - 75 + 25);
                        line(arrowX - 75 + 25, arrowY - 75 + 25, arrowX - 25 + 25, arrowY - 75 + 25);
                        line(arrowX - 75 + 25, arrowY - 75 + 25, arrowX - 75 + 25, arrowY - 25 + 25);
                    }
                } else {
                    stroke(255, 234, 62);
                    strokeWeight(4);
                    let arrowX = triangleX + 75;
                    let arrowY = triangleY + 75;
                    line(arrowX + 25, arrowY + 25, arrowX - 75 + 25, arrowY - 75 + 25);
                    line(arrowX - 75 + 25, arrowY - 75 + 25, arrowX - 25 + 25, arrowY - 75 + 25);
                    line(arrowX - 75 + 25, arrowY - 75 + 25, arrowX - 75 + 25, arrowY - 25 + 25);
                }
            }
        }
    }

    if (frameCount >= newShapeStartFrame) {
        let newShapeT = min((frameCount - newShapeStartFrame) / newShapeDuration, 1);
        noFill();
        stroke(255, 234, 62);
        strokeWeight(4);
        let squareSize = lerp(0, 150, newShapeT);
        let squareX = lerp(width / 2, width / 2 - 150, newShapeT);
        let squareY = lerp(height / 2, height / 2 - 250, newShapeT);
        rect(squareX, squareY, squareSize, squareSize);
        let dropX = squareX - 60;
        let dropY = squareY;
        let dropSize = lerp(0, 60, newShapeT);
        fill(255, 234, 62);
        noStroke();
        rect(dropX, dropY, dropSize, dropSize, 40, 0, 40, 40);
        if (newShapeT >= 1) {
            fill(51);
            textSize(40);
            textAlign(CENTER, CENTER);
            text("?", dropX + dropSize / 2, dropY + dropSize / 2);
        }
    }

    if (frameCount >= squareOverEllipseStartFrame) {
        let squareOverEllipseT = min((frameCount - squareOverEllipseStartFrame) / newShapeDuration, 1);
        let squareSize = lerp(0, 250, squareOverEllipseT);
        let squareX = lerp(width / 2 + 75 - squareSize / 2, width / 2 + 75 - squareSize / 2, squareOverEllipseT);
        let squareY = lerp(height / 2 - squareSize / 2, height / 2 - squareSize / 2, squareOverEllipseT);
        noFill();
        stroke(255, 193, 0);
        strokeWeight(4);
        rect(squareX, squareY, squareSize, squareSize);
        let dropNewT = min((frameCount - squareOverEllipseStartFrame) / newShapeDuration, 1);
        let dropNewX = squareX + squareSize;
        let dropNewY = squareY + squareSize;
        let dropNewSize = lerp(0, 60, dropNewT);
        fill(255, 193, 0);
        noStroke();
        rect(dropNewX, dropNewY, dropNewSize, dropNewSize, 0, 40, 40, 40);
        if (dropNewT >= 1) {
            fill(51);
            textSize(40);
            textAlign(CENTER, CENTER);
            text("!", dropNewX + dropNewSize / 2, dropNewY + dropNewSize / 2);
        }
    }
}
