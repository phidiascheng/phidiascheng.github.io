
const { useState, useEffect, useMemo  } = React;

import { loadLessStyle, removeElementById } from './utility.js';

import { DrawBubbles } from './DrawBubbles.js';

export { Header }


// ----------------------------------------------------------------------------------------->


function Header({id: id}) {
    const lessStyle = /* css */`
    .header {
    position: fixed;
    width: 100%;
    z-index: 199;
    }
    .header .header-top,
    .header .header-top-workView {
    display: flex;
    height: 72px;
    background: SandyBrown;
    z-index: 99;
    padding: 0 calc((100% - 1200px)/2);
    box-shadow: 0 10px 40px 0 var(--shadowcolor);
    }
    .header .header-top .h-left,
    .header .header-top-workView .h-left {
    display: flex;
    flex-basis: 0;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 1;
    }
    .header .header-top .h-left a,
    .header .header-top-workView .h-left a {
    margin-left: 18px;
    width: 36px;
    height: 36px;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    }
    .header .header-top .h-left a img,
    .header .header-top-workView .h-left a img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    }
    .header .header-top .h-right,
    .header .header-top-workView .h-right {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    flex-basis: 1000px;
    margin-right: 20px;
    }
    .header .header-top .h-right .notSelected .tag,
    .header .header-top .h-right .select .tag,
    .header .header-top-workView .h-right .notSelected .tag,
    .header .header-top-workView .h-right .select .tag {
    padding: 0px 10px 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    }
    .header .header-top .h-right .notSelected .tag .spacedot,
    .header .header-top .h-right .notSelected .tag .dot,
    .header .header-top .h-right .select .tag .spacedot,
    .header .header-top-workView .h-right .notSelected .tag .spacedot,
    .header .header-top .h-right .select .tag .dot,
    .header .header-top-workView .h-right .notSelected .tag .dot,
    .header .header-top-workView .h-right .select .tag .spacedot,
    .header .header-top-workView .h-right .select .tag .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: relative;
    top: -12px;
    left: 0px;
    }
    .header .header-top .h-right .notSelected:hover .dropdownmenu,
    .header .header-top .h-right .select:hover .dropdownmenu,
    .header .header-top-workView .h-right .notSelected:hover .dropdownmenu,
    .header .header-top-workView .h-right .select:hover .dropdownmenu {
    border-radius: 5px;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s 0.3s, visibility 0s 0.3s;
    }
    .header .header-top .h-right .notSelected:hover .dropdownmenu p a:hover,
    .header .header-top .h-right .select:hover .dropdownmenu p a:hover,
    .header .header-top-workView .h-right .notSelected:hover .dropdownmenu p a:hover,
    .header .header-top-workView .h-right .select:hover .dropdownmenu p a:hover {
    color: Silver;
    }
    .header .header-top .h-right .select .tag a,
    .header .header-top-workView .h-right .select .tag a {
    color: white;
    }
    .header .header-top .h-right .select .tag:hover .dropdownmenu p a:hover,
    .header .header-top-workView .h-right .select .tag:hover .dropdownmenu p a:hover {
    color: Silver;
    }
    .header .header-top .h-right .select .dot,
    .header .header-top-workView .h-right .select .dot {
    background: white;
    }
    .header .header-top .h-right .dropdownmenu,
    .header .header-top-workView .h-right .dropdownmenu {
    position: absolute;
    min-width: 60px;
    padding: 10px 10px 10px;
    z-index: 1;
    background-color: Bisque;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s 0.2s, visibility 0s 0.5s;
    }
    .header .header-top .h-right .dropdownmenu p,
    .header .header-top-workView .h-right .dropdownmenu p {
    line-height: 30px;
    }
    @media (max-width: 800px) {
    .header .header-top .h-right,
    .header .header-top-workView .h-right {
        display: none;
    }
    }
    .header .header-top .h-right-close,
    .header .header-top-workView .h-right-close {
    display: none;
    }
    @media (max-width: 800px) {
    .header .header-top .h-right-close,
    .header .header-top-workView .h-right-close {
        display: flex;
        flex-basis: 0;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
        margin-right: 1em;
    }
    .header .header-top .h-right-close svg,
    .header .header-top-workView .h-right-close svg {
        cursor: pointer;
        width: 2em;
        height: 2em;
    }
    }
    .header .header-top-workView {
    height: 36px;
    padding: 0 10px;
    }
    .header .header-top-workView .h-left a {
    margin-left: 16px;
    }
    .header .header-top-workView .h-left a img {
    width: 30px;
    height: 30px;
    }
    .header .header-top-workView .h-right {
    display: none;
    }
    .header .header-top-workView .h-right-close {
    display: flex;
    flex-basis: 0;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
    margin-right: 1em;
    }
    .header .header-top-workView .h-right-close svg {
    cursor: pointer;
    width: 2em;
    height: 2em;
    }
    `;/* css */


    const lessStyleForWorkView = /* css */`

    `;/* css */
    
    useMemo ( () => {
        loadLessStyle (lessStyle, 'styHeader')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('styHeader')
        })
    },[]);


    const [sidebarShelterSwitchableStyle, setSidebarShelterStyle] = useState({
        sidebar: {width: '0'}, shelter: {visibility: 'hidden',ocacity: '0',}
    });


    function siderbarSwitcher(){
        setSidebarShelterStyle( sidebarShelterSwitchableStyle.sidebar.width == '0' ?
            {sidebar: {width: '60%'}, shelter: {visibility: 'visible',opacity: '0.6'}} :
            {sidebar: {width: '0'}, shelter: {visibility: 'hidden',opacity: '0'}}
         )
    }


    return (
        React.createElement(React.Fragment, null, React.createElement("div", {
            className: "header"
        }, React.createElement("div", {
            className: id == 'WorkView' ? "header-top-workView" : 'header-top'
        }, React.createElement("div", {
            className: "h-left"
        }, React.createElement("a", {
            href: "#/"
        }, React.createElement("img", {
            src: "./data/img/logo.png",
            alt: "Quiet"
        }))), id != 'WorkView' && React.createElement(HRight, {
            id: id
        }), React.createElement(HRightClose, {
            onClick: siderbarSwitcher
        })), id != 'WorkView' && React.createElement(DrawBubbles, null)), React.createElement(SidebarAndShelter, {
            style: sidebarShelterSwitchableStyle,
            onClick: siderbarSwitcher
        }))
    );
}


// ----------------------------------------------------------------------------------------->


/* const Test =  forwardRef((props, ref) => {
        const [style, setStyle] = useState({color: 'blue'});
        const testRef = useRef();
        useImperativeHandle(ref, () => {
            return {
                handleClick(){
                    setStyle({color:'red'})
                }
            }
        });    
        return <p style={style} ref={testRef}>test</p>
    }
) */


// ----------------------------------------------------------------------------------------->


function HRight({id:id}){

    const tags = [  {name:"首页", link:"/"}, 
                    {name:"博客 ", link:"blog"},
                    // {name:"关于我", link:"about"}, 
                    {name:"课程表", link:"schedual"},
                    {name:"练习", link:"work"}
                ];

    return (
        React.createElement("div", {
            className: "h-right"
        }, tags.map(tag => React.createElement("div", {
            key: tag.name,
            className: id == tag.link ? 'select' : 'notSelected'
        }, React.createElement("div", {
            className: "tag"
        }, React.createElement("span", {
            className: "spacedot"
        }), React.createElement("a", {
            href: '#' + tag.link
        }, tag.name), React.createElement("span", {
            className: "dot"
        })))))
    );
}


// ----------------------------------------------------------------------------------------->


function HRightClose({onClick:siderbarSwitcher}) {

    return (
        React.createElement("div", {
            className: "h-right-close",
            onClick: siderbarSwitcher
        }, React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "24",
            height: "24"
        }, React.createElement("path", {
            fill: "none",
            d: "M0 0h24v24H0z"
        }), React.createElement("path", {
            d: "M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z",
            fill: "rgba(68,68,68,1)"
        })))
    )
}


// ----------------------------------------------------------------------------------------->


function SidebarAndShelter({style:propStyle, onClick:siderbarSwitcher}){

    const lessStyle = /* css */`
    .sidebar {
    width: 0;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 999;
    text-align: center;
    box-shadow: -6px 0 20px var(--shadowcolor);
    transition: width 0.5s ease-in-out;
    }
    .sidebar .topo {
    width: 100%;
    height: 82px;
    background-color: sandybrown;
    background-size: 100%;
    position: relative;
    display: flex;
    align-items: flex-end;
    }
    .sidebar .topo h2 {
    color: white;
    z-index: 1;
    position: relative;
    margin: 0 0 10px 10px;
    font-size: 1.2em;
    box-sizing: border-box;
    }
    .sidebar .topo:before {
    content: '';
    background-repeat: repeat;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
    }
    .sidebar ul {
    width: 100%;
    margin-top: 50px;
    }
    .sidebar ul li {
    height: 50px;
    list-style: none;
    font-size: 1.2em;
    text-align: right;
    margin-right: 10px;
    }
    .sidebar ul li a {
    display: grid;
    color: var(--fontcolor);
    text-overflow: ellipsis;
    width: 100%;
    text-decoration: none;
    }
    .sidebar .my_foot {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    position: absolute;
    bottom: 0;
    }
    .sidebar .my_foot a {
    text-decoration: none;
    margin-right: 10px;
    display: inline-block;
    }
    .sidebar .my_foot a img {
    width: 30px;
    height: 30px;
    }
    `;/* css */

    useMemo( () => {
        loadLessStyle (lessStyle, 'stySidebr')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('stySidebr')
        })
    },[]);


    const tags = [  { label: '首页', link: '' },
                    { label: '博客', link: 'blog' },
                    // { label: '关于我', link: 'about' },
                    { label: '课程表', link: 'schedual' },
                    { label: '练习', link: 'work' },
                ]


    const shelterStyle = {
        cursor: 'pointer',
        position: 'fixed',
        left: '0',
        top: '0', 
        right: '0',
        bottom: '0',
        backgroundColor: 'var(--fontcolor)',
        zIndex: '108',
        transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out'
    }


    return (
        React.createElement(React.Fragment, null, React.createElement("div", {
            className: "sidebar",
            style: propStyle.sidebar,
            onClick: siderbarSwitcher
        }, React.createElement("div", {
            className: "topo"
        }, React.createElement("h2", null, "I'm Cheyenne")), React.createElement("ul", null, tags.map(tag => React.createElement("li", {
            key: tag.link
        }, React.createElement("a", {
            href: '#' + tag.link
        }, tag.label)))), React.createElement("div", {
            className: "my_foot"
        }, React.createElement("a", {
            target: "_blank",
            href: "https://github.com/phidiascheng"
        }, React.createElement("img", {
            src: "./data/img/imggithub.png",
            alt: "Quiet"
        })))), React.createElement("div", {
            style: { ...shelterStyle,
            ...propStyle.shelter
            },
            onClick: siderbarSwitcher
        }))
    )
}


// ----------------------------------------------------------------------------------------->



