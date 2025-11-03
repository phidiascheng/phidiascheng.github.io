const { useState, useEffect, useRef  } = React;

export { DrawBubbles }


// ----------------------------------------------------------------------------------------->


class Point {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.r = Math.random() * 25 + 1.5;
        var colours = ["#ffff00", "#66ffff", "#3399ff", "#99ff00", "#ff9900"];
        this.color = colours[Math.floor(Math.random() * colours.length)];
        this.dy = -Math.random() * 1 + 0.5;
        this.dx = Math.random() * 2 - 1;


        this.physx = function (canvas, pointList) {
            this.y -= this.dy;
            this.x += this.dx;
            if (this.y - this.r > canvas.height || this.y + this.r < 0 || this.x - this.r > canvas.width || this.x - this.r < 0) {
                pointList.splice(pointList.indexOf(this), 1);
            }
        };


        this.draw = function (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            ctx.stroke();
        };
    }
}


// ----------------------------------------------------------------------------------------->


function DrawBubbles(){

    const [width, setWidth] = useState(window.innerWidth)
    const [iniHeight, setIniHeight] = useState( width > 800 ? 100 : 84 )
    const [height, setHeight] = useState( iniHeight )
    const [scrollHeight, setScrollHeight] = useState( 0 )


    const canvas = useRef(null);
    var count = useRef(0)
    var pointList = []
    var isMouseOver = useRef(null)
    var mouse = useRef({x: 0,y: 0})


    useEffect(() => {

        function handleResize () {
            const newWidth = window.innerWidth
            const newIniHeight = newWidth > 800 ? 100 : 84
            setWidth(newWidth)
            setIniHeight(newIniHeight)
            setHeight(newIniHeight > scrollHeight ? newIniHeight - scrollHeight : 0)
        };

        function handleScroll () {
            const newScroll = window.scrollY
            setScrollHeight(newScroll)
            setHeight(iniHeight > newScroll ? iniHeight - newScroll : 0)
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        drawBubbles()

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        }
        
    }, []);


    function handleMouseOver(e){
        isMouseOver.current = true
        mouse.current.x = e.pageX
        mouse.current.y = e.pageY
    }

    function handleMouseOut(){
        isMouseOver.current = false
    }

    function handleMouseMove(e){
        mouse.current.x = e.pageX
        mouse.current.y = e.pageY
    }


    function drawBubbles(){
        if ( isMouseOver.current ){
            if ( count.current == 5 ) {
                var posX = mouse.current.x
                var posY = mouse.current.y - 72 - scrollHeight;
                pointList.push(new Point(posX, posY));
                count.current = 0;
            } else {
                count.current += 1;
            }
        }
        if(canvas.current){
            const ctx = canvas.current.getContext('2d')
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
            for (var i in pointList) {
                pointList[i].draw(ctx);
                pointList[i].physx(canvas.current, pointList);
            }
        }
        requestAnimationFrame(drawBubbles)
    }
    
    
    const style = {
        position: 'fixed',
        margin: '0px',
        padding: '0px',
    }


    return(
        React.createElement("canvas", {
            style: style,
            width: width + 'px',
            height: height + 'px',
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut,
            onMouseMove: handleMouseMove,
            ref: canvas
        })
    ) 
}