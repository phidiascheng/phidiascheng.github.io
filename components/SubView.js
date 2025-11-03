
const { useEffect, useState, useMemo } = React;

import { loadLessStyle, removeElementById } from './utility.js';

import { Header } from './Header.js';

import { CardBody } from './CardBody.js';

export { SubView }


// ----------------------------------------------------------------------------------------->


function SubView( { id: id } ) {

    const lessStyle = /* css */`
    @font-face {
    font-family: "OpenSans";
    font-style: normal;
    font-weight: 100;
    src: url('./assets/fonts/OpenSans-Regular.ttf') format('truetype');
    }
    @font-face {
    font-family: "SimSun";
    font-style: normal;
    font-weight: 100;
    src: url('./assets/fonts/SimSun.ttf') format('truetype');
    }
    @font-face {
    font-family: "PingFang";
    font-style: normal;
    font-weight: 100;
    src: url('./assets/fonts/PingFangSC-Regular.ttf') format('truetype');
    }
    @font-face {
    font-family: "STKai";
    font-style: normal;
    font-weight: 100;
    src: url('./assets/fonts/STKai.ttf') format('truetype');
    }
    @font-face {
    font-family: "SimHei";
    font-style: normal;
    font-weight: 100;
    src: url('./assets/fonts/simhei.ttf') format('truetype');
    }
    * {
    margin: 0;
    padding: 0;
    font-family: "OpenSans", "PingFang", "SimHei", "STKai";
    --bodybackgroundcolor: #f1f5fb;
    --shadowcolor: rgba(50, 50, 50, 0.05);
    --hovershadowcolor: rgba(50, 50, 50, 0.2);
    --fontcolor: #323232;
    }
    body {
    background-color: var(--bodybackgroundcolor);
    }
    a:link {
    text-decoration: none;
    color: var(--fontcolor);
    }
    a:visited {
    text-decoration: none;
    color: var(--fontcolor);
    }
    `;/* css */    

    useMemo(() => {
        loadLessStyle(lessStyle, 'stySubvue')
        if (id == 'WorkView')
            document.body.style.backgroundColor = 'white';
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('stySubvue')
        })
    },[]);


    return (
        React.createElement(React.Fragment, null, React.createElement(Header, {
            id: id
        }), id != 'WorkView' && React.createElement(HeaderBg, null), React.createElement(CardBody, {
            id: id
        }), React.createElement(GoTop, null))
    ) 
}


// ----------------------------------------------------------------------------------------->


function HeaderBg () {

    const lessStyle = /* css */`
    .header-bg {
    width: 100%;
    padding-top: 92px;
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;
    background: linear-gradient(to top, var(--bodybackgroundcolor), #fffcf9);
    }
    .header-bg .bg-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    }
    .header-bg .bg-content span {
    display: flex;
    font-size: 36px;
    line-height: 18px;
    color: DarkSlateGray;
    align-items: flex-end;
    }
    .header-bg .bg-content span img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    }
    .header-bg .bg-content h2 {
    display: flex;
    margin-top: 4px;
    font-size: 16px;
    font-weight: normal;
    line-height: 22px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    color: DarkSlateGray;
    }
    `;/* css */

    useMemo( () => {
        loadLessStyle (lessStyle, 'styHeadbg')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('styHeadbg')
        })
    },[]);

    
    return (

        React.createElement("div", {
            className: "header-bg"
        }, React.createElement("div", {
            className: "bg-content"
        }, React.createElement("span", null, React.createElement("img", {
            className: "site-logo",
            src: "./data/img/logo.png",
            alt: "Q"
        })), React.createElement("h2", null, "Hi, i'm Cheyenne")))    
    );
}


// ----------------------------------------------------------------------------------------->


function GoTop(){

    const [borderStyle, setBorderStyle] = useState("1px solid var(--hovershadowcolor)")
    const [disp, setDisp] = useState('block')
    const [translate, setTranslate] = useState('translate(100px,0)')

    useEffect(() => {
        function handleResize () {
            setDisp(window.innerWidth > 800 ? 'block' : 'none')
        };

        function handleScroll () {
            setTranslate(window.scrollY > 500 ? 'translate(0px,0)' : 'translate(100px,0)')
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        }        
    }, []);


    const goTopStyle = {
            position: 'fixed',
            right: '30px',
            bottom: '80px',
            transition: 'transform .5s ease-in-out',
            display: 'block'
        }

    const goTopTranslation = {
            transform: translate,
            display: disp
        }

    const spanStyle = {
            display: 'block',
            borderRadius: '50%',
            width: '66px',
            height: '66px',
            cursor: 'pointer',
            opacity: '0.8',
            background: 'var(--shadowcolor)',
            textAlign: 'center',
            border: '1px solid var(--hovershadowcolor)',
            transition: 'border .5s',
            border: borderStyle,
        }

    
    const spanDynamicStyle = {
            '-moz-transition': 'border .5s',/* Firefox 4 */
            '-webkit-transition': 'border .5s',/* Safari 和 Chrome */
            '-o-transition': 'border .5s',/* Opera */  
        }


    const svgStyle = {
            width: '30px',
            height: '30px',
            marginTop: '17.5px',
            opacity: '0.7'
        }

    
    function handleMouseOver(){
        setBorderStyle("1.2px solid CornflowerBlue")
    }

    function handleMouseOut(){
        setBorderStyle("1px solid var(--hovershadowcolor)")
    }

    function handleClick(){
        window.scrollTo({ top: 0, behavior: "smooth",});
    }

    return(
        React.createElement("div", {
            style: { ...goTopStyle,
            ...goTopTranslation
            },
            onClick: handleClick
        }, React.createElement("span", {
            style: { ...spanStyle,
            ...spanDynamicStyle
            },
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut
        }, React.createElement("svg", {
            style: svgStyle,
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg"
        }, React.createElement("g", null, React.createElement("path", {
            d: "M13 12v8h-2v-8H4l8-8 8 8z"
        })))))
    )
}