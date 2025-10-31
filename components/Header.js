
const { useState, useEffect, useMemo  } = React;

import { loadLessStyle, removeElementById } from './utility.js';

import { DrawBubbles } from './DrawBubbles.js';

export { Header }


// ----------------------------------------------------------------------------------------->


function Header({id: id}) {
    const lessStyle = /* css */`
            .header{
                position: fixed;
                width: 100%;
                z-index: 199;
                .header-top {
                    display: flex;
                    height: 72px;
                    background: SandyBrown;
                    z-index: 99;
                    padding: 0 calc((100% - 1200px)/2);
                    box-shadow: 0 10px 40px 0 var(--shadowcolor);
                    .h-left { 
                        display: flex;
                        flex-basis: 0;
                        justify-content: flex-start;
                        align-items: center;
                        flex-grow: 1;
                        a {
                            margin-left: 18px;
                            width: 36px;
                            height: 36px;
                            background-size: 100% 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: black;
                            img {
                                width: 36px;
                                height: 36px;
                                border-radius: 50%;
                            }
                        }
                    }
                    .h-right {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-end;
                        align-items: center;
                        align-content: center;
                        flex-basis: 1000px;
                        margin-right: 20px;
                        .notSelected{
                            .tag{
                                padding: 0px 10px 0px 10px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 40px;
                                .spacedot {
                                    display: inline-block;
                                    width: 5px;
                                    height: 5px;
                                    border-radius: 50%;
                                    position: relative;
                                    top: -12px;
                                    left: 0px;
                                }
                                .dot {
                                    &:extend(.header .header-top .h-right .notSelected .tag .spacedot all);
                                }
                            }
                            &:hover .dropdownmenu{
                                border-radius: 5px;
                                opacity: 1;
                                visibility: visible;
                                transition: opacity 0.3s 0.3s, visibility 0s 0.3s;
                                p a:hover{
                                    color: Silver;
                                }
                            }
                        }
                        .select{
                            .tag {
                                a {
                                    color: white;
                                }
                                &:hover .dropdownmenu p a:hover{
                                    color: Silver;
                                }
                            }
                            .dot{
                                background: white;
                            }
                            &:extend(.header .header-top .h-right .notSelected all);
                        }
                        .dropdownmenu{
                            position: absolute;
                            min-width: 60px;
                            padding: 10px 10px 10px;
                            z-index: 1;
                            background-color: Bisque;
                            opacity: 0;
                            visibility: hidden;
                            transition: opacity 0.3s 0.2s, visibility 0s 0.5s;
                            p{
                                line-height: 30px;
                            }
                        }
                        @media (max-width:800px) {
                            display: none;
                        }
                    }
                    .h-right-close {
                        display: none;
                        @media (max-width:800px) {
                            display: flex;
                            flex-basis: 0;
                            justify-content: flex-end;
                            align-items: center;
                            flex-grow: 1;
                            margin-right: 1em;
                            svg {
                                cursor: pointer;
                                width: 2em;
                                height: 2em;
                            }
                        }
                    }
                }
                .header-top-workView {
                    &:extend(.header .header-top all);
                    height: 36px;
                    padding: 0 10px;
                    .h-left {
                        a {
                            margin-left: 16px;
                            img {
                                width: 30px;
                                height: 30px;
                            }
                        }
                    }
                    .h-right {
                        display: none;
                    }
                    .h-right-close{
                        display: flex;
                        flex-basis: 0;
                        justify-content: flex-end;
                        align-items: center;
                        flex-grow: 1;
                        margin-right: 1em;
                        svg {
                            cursor: pointer;
                            width: 2em;
                            height: 2em;
                        }
                    }
                }
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
    <React.Fragment>

        <div className="header">
            <div className={ id=='WorkView' ? "header-top-workView" : 'header-top'}>
                <div className="h-left"><a href="#/"><img src="./data/img/logo.png" alt="Quiet" /></a></div>
                { (id != 'WorkView') &&
                    <HRight id={id} />
                }
                <HRightClose onClick={siderbarSwitcher} />
                {/* <Test ref={sidebarRef} /> */}
            </div> 
            {
                (id != 'WorkView') &&
                <DrawBubbles />
            }
        </div>
        <SidebarAndShelter style={sidebarShelterSwitchableStyle} onClick={siderbarSwitcher} />
    
    </React.Fragment>
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
                    {name:"关于我", link:"about"}, 
                    {name:"课程表", link:"schedual"},
                    {name:"练习", link:"work"}
                ];

    return (
        <div className="h-right">
            {tags.map( tag => (
                <div key={tag.name}  className={id==tag.link? 'select' : 'notSelected'}>
                    <div className="tag">
                        <span className="spacedot"></span>
                        <a href={'#'+tag.link}>{tag.name}</a>
                        <span className="dot"></span>
                    </div>
                </div>
            ))}
        </div>
    );
}


// ----------------------------------------------------------------------------------------->


function HRightClose({onClick:siderbarSwitcher}) {

    return (
        <div className="h-right-close" onClick={siderbarSwitcher}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" /><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(68,68,68,1)" />
            </svg>
        </div>
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
            
                .topo { 
                    width: 100%;
                    height: 82px;
                    background-color: sandybrown;
                    background-size: 100%;
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    h2 {
                        color: white;
                        z-index: 1;
                        position: relative;
                        margin: 0 0 10px 10px;
                        font-size: 1.2em;
                        box-sizing: border-box
                    }
                    &:before {
                        content: '';
                        background-repeat: repeat;
                        height: 100%;
                        left: 0;
                        position: absolute;
                        top: 0;
                        width: 100%;
                        z-index: 1
                    }
                }
                ul { 
                    width: 100%;
                    margin-top: 50px;
                    li {
                        height: 50px;
                        list-style: none;
                        font-size: 1.2em;
                        text-align: right;
                        margin-right: 10px;
                        a {
                            display: grid;
                            color: var(--fontcolor);
                            text-overflow: ellipsis;
                            width: 100%;
                            text-decoration: none;
                        }
                    }
                }
                .my_foot {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    position: absolute;
                    bottom: 0;
                    a {
                        text-decoration: none;
                        margin-right: 10px;
                        display: inline-block;
                        img {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
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
                    { label: '关于我', link: 'about' },
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
    <React.Fragment>

        <div className="sidebar" style={propStyle.sidebar} onClick={siderbarSwitcher}>
            <div className="topo"><h2>I'm Cheyenne</h2></div>
            <ul>
            {tags.map( tag => (
                <li key={tag.link}><a href={'#'+tag.link}>{ tag.label }</a></li>
            ))}
            </ul>
            <div className="my_foot">
                <a target="_blank" href="https://github.com/phidiascheng">
                <img src="./data/img/imggithub.png" alt="Quiet" />
                </a>
            </div>        
        </div>
        <div style={{...shelterStyle, ...propStyle.shelter}} onClick={siderbarSwitcher}></div>  
    
    </React.Fragment>
    )
}


// ----------------------------------------------------------------------------------------->



