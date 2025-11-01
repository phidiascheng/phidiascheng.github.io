
const { useParams } = ReactRouterDOM;

const {  useEffect, useMemo  } = React;

import { loadLessStyle, removeElementById } from './utility.js';

import { Blog } from './Blog.js';

import { Clock, Pdfsheets, Bishunsheet, Dict, Bishun } from './Work.js';

import { Vocabulary } from './WorkB.js';

export { CardBody }


// ----------------------------------------------------------------------------------------->


function CardBody({id:id}){
    const lessStyle = /* css */`
            .main {
                display: flex;
                flex-grow: 1;
                flex-basis: auto;
                flex-direction: column;
                margin-top: 0px;
                .card {
                    display: flex;
                    max-width: 100%;
                    padding: 0 calc((100% - 1200px)/2) 40px;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: stretch;
                    background-color: var(--bodybackgroundcolor);
                    .card-display {
                        display: flex;
                        flex-grow: 1;
                        flex-shrink: 1;
                        flex-basis: 720px;
                        margin: 20px;
                        background-color: white;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0 20px 40px 0 var(--shadowcolor);
                        flex-direction: column;
                        position: relative;
                        transition: ease-in-out;
                        transition-duration: 0.5s;
                        transition-property: box-shadow;
                        &:hover {
                            box-shadow: 0 10px 40px 20px var(--hovershadowcolor);
                        }
                        a {
                            text-decoration: none;
                            .card-title {
                                padding: 20px 30px 0px;
                                display: flex;
                                flex-grow: 1;
                                font-size: 18px;
                                font-weight: 500;
                                line-height: 36px;
                                color: black;
                            }
                            .card-title-indented{
                                padding-left: 60px;
                                padding-top: 35px;
                                &:extend(.main .card .card-display a .card-title);
                            }
                        }
                        .card-date {
                            padding-left: 30px;
                            margin: 0;
                            font-size: 12px;
                            line-height: 18px;
                            color: Chocolate;
                        }
                        .card-date-indented{
                            padding-left: 60px;
                            &:extend(.main .card .card-display .card-date);
                        }
                        .card-text {
                            padding: 15px 30px 25px;
                            font-size: 18px;
                            line-height: 36px;
                            flex-grow: 1;
                            overflow: hidden;
                            p{
                                font-size: 16px;
                                color: var(--fontcolor);
                                line-height: 25px;
                            }
                            p+p{
                                margin-top: 10px;
                            }
                            img{
                                display: block;
                                margin: 20px auto;
                            }
                            blockquote {
                                padding: 0 0 0 10px;
                                display: flex;
                                border-left: 3px solid  LightBlue;
                                align-items: center;
                                margin: 20px 0;
                                .link{
                                    color: grey;
                                    font-size: 16px;
                                }
                            }
                            li {
                                color: Maroon;
                                list-style-position: inside;
                            }
                        }
                        .card-text-indented{
                            &:extend(.main .card .card-display .card-text all);
                            padding: 35px 120px 90px;
                            p{
                                line-height: 35px;
                            }
                            p+p{
                                margin-top: 30px;
                            }
                            li{
                                list-style-type: decimal;
                                margin-top: 50px;
                                margin-bottom: 20px;
                                &:first-child{
                                    margin-top: 5px;
                                }
                            }
                        }
                    }
                    .page{
                        display: flex;
                        width: 100%;
                        align-items: center;
                        padding-left: 43px;
                        div{
                            display: flex;
                            align-items: center;
                            cursor: pointer; 
                            padding: 10px 5px;
                            text-decoration-line: none;
                        }
                        .currentpage a{
                            color: Crimson;
                            font-weight: bold;
                        }
                    }
                }
                .card-workView{
                    &:extend( .main .card all);
                    margin-top: 20px;
                    padding: 0;
                    background-color: white;
                    .card-display {
                        margin: 5px;
                        box-shadow: none;
                        &:hover {
                            box-shadow: none;
                        }
                    }
                }
            }

            @media screen and (max-width:800px) {
                .main .card, .main .card-workView {
                    .card-display {
                        margin: 3px;
                        a .card-title{
                            padding-top: 6px;
                            padding-left: 3px;
                            padding-right: 10px;
                        }
                        .card-date{
                            padding-left: 3px;
                        }
                        .card-text{
                            padding: 10px 3px;
                        }
                        .showmore{ 
                            margin: 10px 0 5px;
                            padding: 0px 0px 0px 3px;
                        }
                    }
                    .page{
                        padding-left: 3px;
                        div{
                            padding: 5px 3px;
                        }
                    }
                }
            }
    `;/* css */

    let { work } = useParams();
    
    useMemo( () => {
        loadLessStyle (lessStyle, 'styCardBd')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('styCardBd')
        })
    },[]);


    return (

        <div className="main">
            <div className={ id == 'WorkView' ? 'card-workView' : 'card'}>
                { id == '/' && <Home /> }
                { id == 'about' && <About /> }
                { id == 'blog' && <Blog /> }
                { id == 'schedual' && <Schedual /> }
                { id == 'work' && <Work /> }
                { id == 'WorkView' && <WorkView id={work} /> }
            </div>
        </div>
    
    )
}


// ----------------------------------------------------------------------------------------->


function Home() {
    return (
    <React.Fragment>
        <div className="card-display">
            <a><h2 className="card-title">I'm Cheyenne.</h2></a>
            <div className="card-date">Nice to meet you.</div>
            <div className="card-text">
                <p>HOME PAGE</p>
            </div>
        </div>
        <div className="page"><div><a href="/">[返回博客]</a></div></div>
    </React.Fragment>
    );
}


// ----------------------------------------------------------------------------------------->


function About() {
    return (
        <div className="card-display">
            <a><h2 className="card-title">I'm Cheyenne.</h2></a>
            <div className="card-date">Nice to meet you.</div>
            <div className="card-text">
                <p>我的英文名叫Cheyenne，我来自重庆，我在四川外国语大学九龙坡区附属小学上二年级。</p>
                <img src="./data/img/aboutme.JPG" alt="Quiet" />
            </div>
        </div>
    );
}


// ----------------------------------------------------------------------------------------->


function Work() {
    return (
        <div class="card-display">

            <a><h2 class="card-title">练习</h2></a>

            <div class="card-date">Work hard, play harder.</div>

            <div class="card-text">

                <p><a target="blank" href="#work/bishun">汉字词典</a></p>

                <p><a target="blank" href="#work/dict">单词词典</a></p>

                <p><a target="blank" href="#work/pdfsheets">书写练习</a></p>

                <p><a target="blank" href="#work/bishunsheet">笔顺练习</a></p>
                
                <p><a target="blank" href="#work/clock">时钟练习</a></p>

                <p><a target="blank" href="#work/vocabulary">背背单词</a></p>

            </div>

        </div>
    );
}


// ----------------------------------------------------------------------------------------->


function Schedual() {

    const lessStyle = /* css */`    
            @keyframes blinker {  
                0% { opacity: 1.0; }
                50% { opacity: 0.0; }
                100% { opacity: 1.0; }
            }
            
            .schedual{
                display: flex; 
                justify-content: center;
                table {
                    border-collapse: collapse; 
                    display: flex;
                    justify-content: center;
                    tr {
                        border-bottom: 1px solid #ddd;
                        display: flex;
                        justify-content: center;
                        &:first-child td{
                            font-family: "PingFang";
                        }
                        td {
                            display: flex;
                            justify-content: center;
                            text-align: center;
                            padding: 10px;
                            font-family: "STKai";
                            flex: 0 0 auto;
                            width: 120px;
                            line-height: 25px;
                            span {
                                font-family: "STKai";
                            }
                            .semihided{
                                color: lightgray;
                            }
                            &:first-child {
                                width: 40px;
                                padding-left: 0;
                            }
                        }
                        &:nth-child(3),
                        &:nth-child(7),
                        &:nth-child(9) {
                            background-color: Azure;
                            font-size: 18px;
                        }
                        &:nth-child(3) td,
                        &:nth-child(7) td,
                        &:nth-child(9) td {
                            line-height: 8px;
                        }
                    }
                    .tips{
                        display: flex;
                        justify-content: center;
                        position: relative;
                        div {
                            display: flex;
                            justify-content: center;
                            font-family: "STKai";
                            .blink {
                                width: 6px;
                                height: 6px;
                                border-radius: 6px;
                                animation: blinker 2s linear infinite;
                                background-color: red;
                                position: absolute;
                                left: -4px;
                                top: 4px;
                            }
                        }
                        .tip{
                            display: block;
                            position: absolute;
                            visibility: hidden;
                            width: 80px;
                        }
                        &:hover .tip{
                            visibility: visible;
                            background-color: LavenderBlush;
                            padding: 2px 5px;
                            border: solid;
                            border-color: sandybrown;
                            border-width: 0.5px;
                            border-radius: 5px;
                            top: 27px;
                            z-index: 99;
                        }
                    }
                }
            }

            @media screen and (max-width: 800px) {
                .schedual table tr td{
                    width:75px;
                    &:first-child{
                        width: 30px;
                        text-align: center;
                        padding-left: 0;
                    }
                }
            }
            @media screen and (max-width: 600px) {
                .schedual table tr{
                    td{
                        width:54px;
                        &:first-child{
                            display: none;
                        }
                        &:last-child .tips:hover .tip{
                            top: 0px;
                            left: -100px;
                        }
                        &:nth-child(2) .tips:hover .tip{
                            top: 0px;
                            left: 40px;
                        }
                    }
                    &:nth-child(4n) td{
                        line-height: 1em;
                    }
                }
            }
            @media screen and (max-width: 350px) {
                .schedual table tr{
                    td {
                        width:48px;
                        &:first-child{
                            display: none;
                        }
                    }
                    &:nth-child(4n) td{
                        line-height: 1em;
                    }
                }
            }
    `;/* css */


    useMemo( () => {
        loadLessStyle (lessStyle, 'stySchedu')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('stySchedu')
        })
    },[]);

    return (
        <div class="card-display">
            <a><h2 class="card-title">课程表</h2></a>
            <div class="card-date">School timetable.</div>
            <div class="card-text">
                <div class="schedual">
                    <table><tbody>
                        <tr>
                            <td></td>
                            <td>星期一</td>
                            <td>星期二</td>
                            <td>星期三</td>
                            <td>星期四</td>
                            <td>星期五</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>数学</td>
                            <td>语文</td>
                            <td>数学</td>
                            <td>语文</td>
                            <td>数学</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colspan="5">大课间</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>语文</td>
                            <td>数学</td>
    {/*                         <!--td>
                                <div class="tips">
                                    <div>
                                        p
                                        <div class="blink"></div>
                                    </div>
                                    <div class="tip">
                                        <div>综合实践</div>
                                    </div>
                                </div>
                            </td--> */}
                            <td>体育</td>
                            <td>科学</td>
                            <td>语文</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>科学</td>
                            <td>美术</td>
                            <td>英语</td>
                            <td>游泳</td>
                            <td>语文</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>劳动</td>
                            <td>道法</td>
                            <td>音乐</td>
                            <td>游泳</td>
                            <td>美术</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colspan="5">午休</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>道法</td>
                            <td>综合</td>
                            <td>语文</td>
                            <td>音乐</td>
                            <td>足球</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colspan="5">大课间</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>延时</td>
                            <td>社团</td>
                            <td>延时</td>
                            <td>延时</td>
                            <td>班会</td>
                        </tr>
                    </tbody></table>
                </div>
                <p>&nbsp;</p>
            </div>
        </div>
    );
}



function WorkView ({id:id}){
    
    if (!id) {
        id = 'bishun'
    }

    return (
    <React.Fragment>
        { id == 'clock' && <Clock /> }
        { id == 'bishun' && <Bishun /> }
        { id == 'dict' && <Dict /> }
        { id == 'pdfsheets' && <Pdfsheets /> }
        { id == 'bishunsheet' && <Bishunsheet /> }
        { id == 'vocabulary' && <Vocabulary /> }
    </React.Fragment>
    )
}

