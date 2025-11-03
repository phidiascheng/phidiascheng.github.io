
// const { refreshStyles } = less

export { loadLessStyle, removeElementById }


// ----------------------------------------------------------------------------------------->


function loadLessStyle (lessStyle, elementId) {
    const less = document.createElement('style');
    // less.type = "text/less"
    less.type = "text/css"
    less.id = elementId
    less.textContent = lessStyle
    document.head.appendChild(less);
    // refreshStyles();
}


// ----------------------------------------------------------------------------------------->


function removeElementById(elementId){
    const element = document.getElementById(elementId)
    if (element){
        element.remove()
    }
}



