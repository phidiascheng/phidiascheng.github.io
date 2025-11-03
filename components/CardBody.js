
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
    }
    .main .card,
    .main .card-workView {
    display: flex;
    max-width: 100%;
    padding: 0 calc((100% - 1200px)/2) 40px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    background-color: var(--bodybackgroundcolor);
    }
    .main .card .card-display,
    .main .card-workView .card-display {
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
    }
    .main .card .card-display:hover,
    .main .card-workView .card-display:hover {
    box-shadow: 0 10px 40px 20px var(--hovershadowcolor);
    }
    .main .card .card-display a,
    .main .card-workView .card-display a {
    text-decoration: none;
    }
    .main .card .card-display a .card-title,
    .main .card .card-display a .card-title-indented,
    .main .card-workView .card-display a .card-title,
    .main .card-workView .card-display a .card-title-indented {
    padding: 20px 30px 0px;
    display: flex;
    flex-grow: 1;
    font-size: 18px;
    font-weight: 500;
    line-height: 36px;
    color: black;
    }
    .main .card .card-display a .card-title-indented,
    .main .card-workView .card-display a .card-title-indented {
    padding-left: 60px;
    padding-top: 35px;
    }
    .main .card .card-display .card-date,
    .main .card .card-display .card-date-indented,
    .main .card-workView .card-display .card-date,
    .main .card-workView .card-display .card-date-indented {
    padding-left: 30px;
    margin: 0;
    font-size: 12px;
    line-height: 18px;
    color: Chocolate;
    }
    .main .card .card-display .card-date-indented,
    .main .card-workView .card-display .card-date-indented {
    padding-left: 60px;
    }
    .main .card .card-display .card-text,
    .main .card .card-display .card-text-indented,
    .main .card-workView .card-display .card-text,
    .main .card-workView .card-display .card-text-indented {
    padding: 15px 30px 25px;
    font-size: 18px;
    line-height: 36px;
    flex-grow: 1;
    overflow: hidden;
    }
    .main .card .card-display .card-text p,
    .main .card .card-display .card-text-indented p,
    .main .card-workView .card-display .card-text p,
    .main .card-workView .card-display .card-text-indented p {
    font-size: 16px;
    color: var(--fontcolor);
    line-height: 25px;
    }
    .main .card .card-display .card-text p + p,
    .main .card .card-display .card-text-indented p + p,
    .main .card-workView .card-display .card-text p + p,
    .main .card-workView .card-display .card-text-indented p + p {
    margin-top: 10px;
    }
    .main .card .card-display .card-text img,
    .main .card .card-display .card-text-indented img,
    .main .card-workView .card-display .card-text img,
    .main .card-workView .card-display .card-text-indented img {
    display: block;
    margin: 20px auto;
    }
    .main .card .card-display .card-text blockquote,
    .main .card .card-display .card-text-indented blockquote,
    .main .card-workView .card-display .card-text blockquote,
    .main .card-workView .card-display .card-text-indented blockquote {
    padding: 0 0 0 10px;
    display: flex;
    border-left: 3px solid  LightBlue;
    align-items: center;
    margin: 20px 0;
    }
    .main .card .card-display .card-text blockquote .link,
    .main .card .card-display .card-text-indented blockquote .link,
    .main .card-workView .card-display .card-text blockquote .link,
    .main .card-workView .card-display .card-text-indented blockquote .link {
    color: grey;
    font-size: 16px;
    }
    .main .card .card-display .card-text li,
    .main .card .card-display .card-text-indented li,
    .main .card-workView .card-display .card-text li,
    .main .card-workView .card-display .card-text-indented li {
    color: Maroon;
    list-style-position: inside;
    }
    .main .card .card-display .card-text-indented,
    .main .card-workView .card-display .card-text-indented {
    padding: 35px 120px 90px;
    }
    .main .card .card-display .card-text-indented p,
    .main .card-workView .card-display .card-text-indented p {
    line-height: 35px;
    }
    .main .card .card-display .card-text-indented p + p,
    .main .card-workView .card-display .card-text-indented p + p {
    margin-top: 30px;
    }
    .main .card .card-display .card-text-indented li,
    .main .card-workView .card-display .card-text-indented li {
    list-style-type: decimal;
    margin-top: 50px;
    margin-bottom: 20px;
    }
    .main .card .card-display .card-text-indented li:first-child,
    .main .card-workView .card-display .card-text-indented li:first-child {
    margin-top: 5px;
    }
    .main .card .page,
    .main .card-workView .page {
    display: flex;
    width: 100%;
    align-items: center;
    padding-left: 43px;
    }
    .main .card .page div,
    .main .card-workView .page div {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 5px;
    text-decoration-line: none;
    }
    .main .card .page .currentpage a,
    .main .card-workView .page .currentpage a {
    color: Crimson;
    font-weight: bold;
    }
    .main .card-workView {
    margin-top: 20px;
    padding: 0;
    background-color: white;
    }
    .main .card-workView .card-display {
    margin: 5px;
    box-shadow: none;
    }
    .main .card-workView .card-display:hover {
    box-shadow: none;
    }
    @media screen and (max-width: 800px) {
    .main .card .card-display,
    .main .card-workView .card-display,
    .main .card-workView .card-display {
        margin: 3px;
    }
    .main .card .card-display a .card-title,
    .main .card-workView .card-display a .card-title,
    .main .card .card-display a .card-title-indented,
    .main .card-workView .card-display a .card-title,
    .main .card-workView .card-display a .card-title-indented {
        padding-top: 6px;
        padding-left: 3px;
        padding-right: 10px;
    }
    .main .card .card-display .card-date,
    .main .card-workView .card-display .card-date,
    .main .card .card-display .card-date-indented,
    .main .card-workView .card-display .card-date,
    .main .card-workView .card-display .card-date-indented {
        padding-left: 3px;
    }
    .main .card .card-display .card-text,
    .main .card-workView .card-display .card-text,
    .main .card .card-display .card-text-indented,
    .main .card-workView .card-display .card-text,
    .main .card-workView .card-display .card-text-indented {
        padding: 10px 3px;
    }
    .main .card .card-display .showmore,
    .main .card-workView .card-display .showmore,
    .main .card-workView .card-display .showmore {
        margin: 10px 0 5px;
        padding: 0px 0px 0px 3px;
    }
    .main .card .page,
    .main .card-workView .page,
    .main .card-workView .page {
        padding-left: 3px;
    }
    .main .card .page div,
    .main .card-workView .page div,
    .main .card-workView .page div {
        padding: 5px 3px;
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
        React.createElement("div", {
                className: "main"
            }, React.createElement("div", {
                className: id == 'WorkView' ? 'card-workView' : 'card'
            }, 
            id == '/' && React.createElement(Home, null), 
            id == 'blog' && React.createElement(Blog, null), 
            id == 'schedual' && React.createElement(Schedual, null), 
            id == 'work' && React.createElement(Work, null), 
            id == 'WorkView' && React.createElement(WorkView, {
                id: work
        })))
    )
}


// ----------------------------------------------------------------------------------------->


function Home() {
    return (
        React.createElement(React.Fragment, null, React.createElement("div", {
                className: "card-display"
            }, React.createElement("a", null, React.createElement("h2", {
                className: "card-title"
            }, "I'm Cheyenne.")), React.createElement("div", {
                className: "card-date"
            }, "Nice to meet you."), React.createElement("div", {
                className: "card-text"
            }, React.createElement("p", null, "我的英文名叫Cheyenne，我来自重庆，我在四川外国语大学九龙坡区附属小学上二年级。"), React.createElement("img", {
                src: "./data/img/aboutme.JPG",
                alt: "Quiet"
        }))))
    );
}


// ----------------------------------------------------------------------------------------->


function Work() {
    return (
        React.createElement("div", {
                class: "card-display"
            }, React.createElement("a", null, React.createElement("h2", {
                class: "card-title"
            }, "\u7EC3\u4E60")), React.createElement("div", {
                class: "card-date"
            }, "Work hard, play harder."), React.createElement("div", {
                class: "card-text"
            }, React.createElement("p", null, React.createElement("a", {
                target: "blank",
                href: "#work/bishun"
            }, "\u6C49\u5B57\u8BCD\u5178")), React.createElement("p", null, React.createElement("a", {
                target: "blank",
                href: "#work/dict"
            }, "\u5355\u8BCD\u8BCD\u5178")), React.createElement("p", null, React.createElement("a", {
                target: "blank",
                href: "#work/pdfsheets"
            }, "\u4E66\u5199\u7EC3\u4E60")), React.createElement("p", null, React.createElement("a", {
                target: "blank",
                href: "#work/bishunsheet"
            }, "\u7B14\u987A\u7EC3\u4E60")), React.createElement("p", null, React.createElement("a", {
                target: "blank",
                href: "#work/clock"
            }, "\u65F6\u949F\u7EC3\u4E60")), React.createElement("p", null, React.createElement("a", {
                target: "blank",
                href: "#work/vocabulary"
            }, "\u80CC\u80CC\u5355\u8BCD")))
        )
    );
}


// ----------------------------------------------------------------------------------------->


function Schedual() {

    const lessStyle = /* css */`    
    @keyframes blinker {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
    }
    .schedual {
    display: flex;
    justify-content: center;
    }
    .schedual table {
    border-collapse: collapse;
    display: flex;
    justify-content: center;
    }
    .schedual table tr {
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: center;
    }
    .schedual table tr:first-child td {
    font-family: "PingFang";
    }
    .schedual table tr td {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 10px;
    font-family: "STKai";
    flex: 0 0 auto;
    width: 120px;
    line-height: 25px;
    }
    .schedual table tr td span {
    font-family: "STKai";
    }
    .schedual table tr td .semihided {
    color: lightgray;
    }
    .schedual table tr td:first-child {
    width: 40px;
    padding-left: 0;
    }
    .schedual table tr:nth-child(3),
    .schedual table tr:nth-child(7),
    .schedual table tr:nth-child(9) {
    background-color: Azure;
    font-size: 18px;
    }
    .schedual table tr:nth-child(3) td,
    .schedual table tr:nth-child(7) td,
    .schedual table tr:nth-child(9) td {
    line-height: 8px;
    }
    .schedual table .tips {
    display: flex;
    justify-content: center;
    position: relative;
    }
    .schedual table .tips div {
    display: flex;
    justify-content: center;
    font-family: "STKai";
    }
    .schedual table .tips div .blink {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    animation: blinker 2s linear infinite;
    background-color: red;
    position: absolute;
    left: -4px;
    top: 4px;
    }
    .schedual table .tips .tip {
    display: block;
    position: absolute;
    visibility: hidden;
    width: 80px;
    }
    .schedual table .tips:hover .tip {
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
    @media screen and (max-width: 800px) {
    .schedual table tr td {
        width: 75px;
    }
    .schedual table tr td:first-child {
        width: 30px;
        text-align: center;
        padding-left: 0;
    }
    }
    @media screen and (max-width: 600px) {
    .schedual table tr td {
        width: 54px;
    }
    .schedual table tr td:first-child {
        display: none;
    }
    .schedual table tr td:last-child .tips:hover .tip {
        top: 0px;
        left: -100px;
    }
    .schedual table tr td:nth-child(2) .tips:hover .tip {
        top: 0px;
        left: 40px;
    }
    .schedual table tr:nth-child(4n) td {
        line-height: 1em;
    }
    }
    @media screen and (max-width: 350px) {
    .schedual table tr td {
        width: 48px;
    }
    .schedual table tr td:first-child {
        display: none;
    }
    .schedual table tr:nth-child(4n) td {
        line-height: 1em;
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
        React.createElement("div", {
                class: "card-display"
            }, React.createElement("a", null, React.createElement("h2", {
                class: "card-title"
            }, "\u8BFE\u7A0B\u8868")), React.createElement("div", {
                class: "card-date"
            }, "School timetable."), React.createElement("div", {
                class: "card-text"
            }, React.createElement("div", {
                class: "schedual"
            }, React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null, "\u661F\u671F\u4E00"), React.createElement("td", null, "\u661F\u671F\u4E8C"), React.createElement("td", null, "\u661F\u671F\u4E09"), React.createElement("td", null, "\u661F\u671F\u56DB"), React.createElement("td", null, "\u661F\u671F\u4E94")), React.createElement("tr", null, React.createElement("td", null, "1"), React.createElement("td", null, "\u6570\u5B66"), React.createElement("td", null, "\u8BED\u6587"), React.createElement("td", null, "\u6570\u5B66"), React.createElement("td", null, "\u8BED\u6587"), React.createElement("td", null, "\u6570\u5B66")), React.createElement("tr", null, React.createElement("td", null), React.createElement("td", {
                colspan: "5"
            }, "\u5927\u8BFE\u95F4")), React.createElement("tr", null, React.createElement("td", null, "2"), React.createElement("td", null, "\u8BED\u6587"), React.createElement("td", null, "\u6570\u5B66"), React.createElement("td", null, "\u4F53\u80B2"), React.createElement("td", null, "\u79D1\u5B66"), React.createElement("td", null, "\u8BED\u6587")), React.createElement("tr", null, React.createElement("td", null, "3"), React.createElement("td", null, "\u79D1\u5B66"), React.createElement("td", null, "\u7F8E\u672F"), React.createElement("td", null, "\u82F1\u8BED"), React.createElement("td", null, "\u6E38\u6CF3"), React.createElement("td", null, "\u8BED\u6587")), React.createElement("tr", null, React.createElement("td", null, "4"), React.createElement("td", null, "\u52B3\u52A8"), React.createElement("td", null, "\u9053\u6CD5"), React.createElement("td", null, "\u97F3\u4E50"), React.createElement("td", null, "\u6E38\u6CF3"), React.createElement("td", null, "\u7F8E\u672F")), React.createElement("tr", null, React.createElement("td", null), React.createElement("td", {
                colspan: "5"
            }, "\u5348\u4F11")), React.createElement("tr", null, React.createElement("td", null, "5"), React.createElement("td", null, "\u9053\u6CD5"), React.createElement("td", null, "\u7EFC\u5408"), React.createElement("td", null, "\u8BED\u6587"), React.createElement("td", null, "\u97F3\u4E50"), React.createElement("td", null, "\u8DB3\u7403")), React.createElement("tr", null, React.createElement("td", null), React.createElement("td", {
                colspan: "5"
            }, "\u5927\u8BFE\u95F4")), React.createElement("tr", null, React.createElement("td", null, "6"), React.createElement("td", null, "\u5EF6\u65F6"), React.createElement("td", null, "\u793E\u56E2"), React.createElement("td", null, "\u5EF6\u65F6"), React.createElement("td", null, "\u5EF6\u65F6"), React.createElement("td", null, "\u73ED\u4F1A"))))), React.createElement("p", null, "\xA0"))
        )
    );
}



function WorkView ({id:id}){
    
    if (!id) {
        id = 'bishun'
    }

    return (
        React.createElement(React.Fragment, null, 
            id == 'clock' && React.createElement(Clock, null), 
            id == 'bishun' && React.createElement(Bishun, null), 
            id == 'dict' && React.createElement(Dict, null), 
            id == 'pdfsheets' && React.createElement(Pdfsheets, null), 
            id == 'bishunsheet' && React.createElement(Bishunsheet, null), 
            id == 'vocabulary' && React.createElement(Vocabulary, null)
        )
    )
}

