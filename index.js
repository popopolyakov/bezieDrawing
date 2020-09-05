let svg = document.querySelector('.drawPlace')

let dots = []

const xmlns="http://www.w3.org/2000/svg"

console.log(document)

function firstClick(e) {
/*     let curSvg = document.createElement('svg')
    curSvg.setAttribute('width', document.documentElement.clientWidth)
    curSvg.setAttribute('height', document.documentElement.clientHeight) */
/*     while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    } */
    //console.log(svg)
    let firstDot = document.createElementNS(xmlns, 'circle')
    
    firstDot.style.cx = e.x 
    firstDot.style.cy = e.y 
    firstDot.style.r = 4
    firstDot.style.stroke = 'grey'
    firstDot.style.fill = 'transparent'
    firstDot.style['stroke-width'] = 2
    firstDot.classList.add('dot')

    svg.append(firstDot)
    svg.removeEventListener('mousedown', firstClick)
    svg.removeEventListener('mouseup', firstClick)
    svg.removeEventListener('mousemove', nextLine)
    svg.addEventListener("mousemove", nextLine)
}

function nextLine(e) {
    console.log(svg.querySelectorAll('.phantomNextLine, .path'))
    while (svg.querySelectorAll('.phantomNextLine, .path').length) {
        console.log(!!svg.querySelector('.phantomNextLine'))
        if (svg.querySelector('.phantomNextLine')) { svg.removeChild(svg.querySelector('.phantomNextLine')) };
        console.log(!!svg.querySelector('.phantomPath'));
        if (svg.querySelector('.phantomPath')) { svg.removeChild(svg.querySelector('.phantomPath')) };
    }
    let curLine = document.createElementNS(xmlns, 'line'), path
    //console.log(svg.querySelector('.dot').style.cx)
    let curStartDot = svg.querySelectorAll('.dot')
    curLine.setAttribute('x1', curStartDot[curStartDot.length-1].style.cx)
    curLine.setAttribute('x2', e.x)
    curLine.setAttribute('y1', curStartDot[curStartDot.length-1].style.cy)
    curLine.setAttribute('y2', e.y)
    curLine.style.stroke = 'grey'
    curLine.style.fill = 'transparent'
    curLine.classList.add('phantomNextLine')
    curLine.style['stroke-width'] = 2
    svg.append(curLine)
    console.log(document.querySelector('path'), dots.length>0)
    if (dots.length>0) {
        path = document.createElementNS(xmlns, 'path')
        path.style.stroke = 'blue'
        path.style.fill = 'transparent'
        console.log(dots.map((item, i) => { return i === 0 ? '' : `C ${item.x} ${item.y}` }))
        console.log(dots);
        let partOfPath = dots.map((item, i) => {
            console.log(item)
            console.log(dots.length)
            if (dots.length === 1 ) {
                const animPartOfBezie = `${e.x} ${e.y}, ${curLine.x1.animVal.value} ${curLine.y1.animVal.value}`
                return  ` M ${item.position.x} ${item.position.y} C ${item.direction.x} ${item.direction.y}, ` + animPartOfBezie
            } else if (dots.length === 2) {
                const animPartOfBezie = ` S ${e.x} ${e.y}, ${curLine.x1.animVal.value} ${curLine.y1.animVal.value}`
                if (i === 0) {
                    return  ` M ${item.position.x} ${item.position.y} C ${item.direction.x} ${item.direction.y}`
                } else {
                    return ` ${item.direction.x} ${item.direction.y}, ${item.position.x} ${item.position.y}` + animPartOfBezie
                } 
            } else {
                const animPartOfBezie = `S ${e.x} ${e.y}, ${curLine.x1.animVal.value} ${curLine.y1.animVal.value}`
                if (i === 0) {
                    return  ` M ${item.position.x} ${item.position.y} C ${item.direction.x} ${item.direction.y}, `
                } else if (i === 1) {
                    return `${item.direction.x} ${item.direction.y}, ${item.position.x} ${item.position.y} `
                } else if (i === dots.length-1) {
                    return `S ${item.direction.x} ${item.direction.y}, ${item.position.x} ${item.position.y} ` + animPartOfBezie
                } else {
                    return `S ${item.direction.x} ${item.direction.y}, ${item.position.x} ${item.position.y} `
                }
            }
        })
        console.log(partOfPath)
        const pathDirection= partOfPath.join('')
        
        path.setAttribute('d', pathDirection)
        path.classList.add('phantomPath')
        console.log(path)
        svg.append(path)
    }
    svg.addEventListener('mouseup', firstClick)
    svg.addEventListener('mouseup', saveLine)
    svg.addEventListener('mouseup', saveBezie)
}

function saveBezie() {

    let curPath = svg.querySelectorAll('.phantomPath')[svg.querySelectorAll('.phantomPath').length - 1]
    console.log(curPath)
    curPath.classList.toggle('phantomPath')
    svg.querySelectorAll('.savePath').forEach(function(item){item.remove()})
    curPath.classList.toggle('savePath')
    svg.removeEventListener('mouseup', saveBezie)
}

function saveLine() {
    
    let curLine = svg.querySelectorAll('.phantomNextLine')[svg.querySelectorAll('.phantomNextLine').length - 1]
    curLine.classList.toggle('phantomNextLine')
    curLine.classList.toggle('saveLine')
    //console.log(curLine)
    svg.removeEventListener('mouseup', saveLine)
    svg.removeEventListener('mousedown', nextLine)
    svg.removeEventListener('mouseup', nextLine)
    svg.removeEventListener('mousemove', nextLine)
    //console.log(curLine)
    dots.push({
        position: {x: curLine.x1.animVal.value, y: curLine.y1.animVal.value},
        direction: {x: curLine.x2.animVal.value, y: curLine.y2.animVal.value}
    })
    
    console.log(dots)
    svg.addEventListener('mousedown', nextClick)
}

function nextClick(e) {

    let firstDot = document.createElementNS(xmlns, 'circle')
    
    firstDot.style.cx = e.x 
    firstDot.style.cy = e.y 
    firstDot.style.r = 4
    firstDot.style.stroke = 'grey'
    firstDot.style.fill = 'transparent'
    firstDot.style['stroke-width'] = 2
    firstDot.classList.add('dot')
    
    svg.append(firstDot)
    svg.removeEventListener('mousedown', nextClick)
    svg.removeEventListener('mouseup', nextClick)
    svg.removeEventListener('mousemove', nextLine)
    svg.addEventListener("mousemove", nextLine)
}

function saveDot() {
    curLine = svg.querySelector('.dot')
    curLine.classList.toggle('dot')
    curLine.classList.toggle('saveDot')
    svg.removeEventListener('mouseup', saveLine)
    console.log(dots)
}

svg.addEventListener('mousedown', firstClick)


// Переименовать точки (круги)