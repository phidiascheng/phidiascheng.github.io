
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
            * {
                margin: 0;
                padding: 0;
                font-family: "OpenSans",sans-serif,serif;
                --bodybackgroundcolor : #f1f5fb;
                --shadowcolor: rgba(50,50,50,0.05);
                --hovershadowcolor:rgba(50,50,50,0.2);
                --fontcolor: rgb(50,50,50);
                --serifFont:  "Times New Roman", "Times", "新宋体", "宋体", "简宋", "宋体-简", "SimSun", serif;
                --sansSerifFont: "OpenSans","Arial", "Helvetica","苹方-简", "黑体-简", "冬青黑体简体中文", "微软雅黑", "黑体", "华文黑体", sans-serif;
                --monospaceFont: "Courier New", monospace;
            }

            body{
                background-color: var(--bodybackgroundcolor);
            }

            a {
                &:link { 
                    text-decoration: none; 
                    color: var(--fontcolor);
                } 
                &:visited { 
                    text-decoration: none; 
                    color: var(--fontcolor);
                }
            }
    `;/* css */    

    useMemo(() => {
        loadLessStyle(lessStyle, 'stySubvue')
        if (id == 'WorkView') {
            document.body.style.backgroundColor = 'white';
        }
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('stySubvue')
        })
    },[]);

    return (
    <React.Fragment>

        <Header id={id} />
        { (id != 'WorkView') &&
            <HeaderBg />
        }
        <CardBody id={id} />
        <GoTop />
    
    </React.Fragment>
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
                .bg-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                    span {
                        display: flex;
                        font-size: 36px;
                        line-height: 18px;
                        color: DarkSlateGray;
                        align-items: flex-end;
                        img {
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                        }
                    }
                    h2 {
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
                }
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

        <div className="header-bg">
            <div className="bg-content">
                <span><img className="site-logo" src="./data/img/logo.png" alt="Q" /></span>
                <h2>Hi, i&#39;m Cheyenne</h2>
            </div>
        </div>
    
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
    <div 
        style={{...goTopStyle,  ...goTopTranslation }}
        onClick={handleClick}
        >

        <span 
            style={{...spanStyle, ...spanDynamicStyle}}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            >
            
            <svg 
                style={svgStyle}
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                
                <g><path d="M13 12v8h-2v-8H4l8-8 8 8z"></path></g>

            </svg>
        </span>
    </div>        
    )
}