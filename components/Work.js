

export { Clock, Pdfsheets, Bishunsheet, Dict, Bishun } 

const {  useEffect, useMemo  } = React;

import { loadLessStyle, removeElementById } from './utility.js';


// ----------------------------------------------------------------------------------------->


function Clock(){

    const lessStyle = /* css */`
            .work_main{
                max-width: 100%;
                text-align: center; 
                .button{
                    border: solid; 
                    border-width: 1px; 
                    border-radius: 8px;
                    width: 200px; 
                    height: 40px; 
                    margin: 20px;
                    background-color: aliceblue;
                    span{
                        position: relative;
                        top: -1.5px;
                        font-family: var(--serifFont); 
                        font-size: 26px;
                    }
                    &:active{
                        color: grey;
                        background-color: lavenderblush;
                    }
                }
            }
            @media screen and (max-width:840px) {
                .work_main .pdfbox {width: 95%; aspect-ratio: 3/2.2;}
            }
            @media screen and (min-width:840px) {
                .work_main .pdfbox {width: 800px; aspect-ratio: 3/2.2;}
            }  
    `;/* css */

    function loadJs(){
        const script = document.createElement('script');
        script.src = './assets/js/pdf-lib.min.js';
        script.type = 'text/javascript';
        script.id = 'jswkClock'
        document.head.appendChild(script);
    }

    useMemo( () => {
        loadJs()
        loadLessStyle (lessStyle, 'stywClock')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('stywClock')
            removeElementById('jswkClock')
        })
    },[]);


    return (
    <div class="card-display">

        <a><h2 className="card-title">时钟练习</h2></a>
        <div className="work_main">
            <div>
                <div><button className="button" id="createCalcPDFFile" onClick={createClock}><span>生成时钟练习</span></button></div>
                <div><iframe className="pdfbox" id="pdf" style={{display: 'none'}}></iframe></div>
            </div>
        </div>

    </div>    
    )

    async function createClock(){
        const { PDFDocument, StandardFonts, rgb } = PDFLib
        const thickness = 0.2;
        const color = rgb(0, 0, 0);
        const dashArray = [1, 0.5];
        const opacity = 0.75;
        const pi = 3.1415926535;

        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([297, 210]);
        const R = 20;
        const r = 1;
        const Lh = 9;
        const Lm = 15;
        const Ln = 17;
        const MarkM = 1;
        const Markm = 1;
        const startx = 13.5;
        const dx = 54;
        const dy = 63;
        const starty = 10.5;

        for (let i = 0; i<5; i++){
            for (let j = 0; j<3; j++){
                let x = startx + i*dx + 0.5*dx;
                let y = starty + j*dy + 0.5*dy;
                page.drawCircle({x: x, y: y, size: r, borderWidth: thickness, borderColor: color, color:color});
                page.drawCircle({x: x, y: y, size: R, borderWidth: thickness, borderColor: color});

                for(let k = 0; k<60; k++){
                    const theta = k/30*pi;
                    const xs = x + (R-Markm)*Math.sin(theta);
                    const ys = y + (R-Markm)*Math.cos(theta);
                    const xe = x + R*Math.sin(theta);
                    const ye = y + R*Math.cos(theta);
                    if(k%15 ==0){
                        const xs = x + (R-MarkM*1.5)*Math.sin(theta);
                        const ys = y + (R-MarkM*1.5)*Math.cos(theta);
                        page.drawLine({start: { x: xs, y: ys },end: { x: xe, y: ye },thickness: thickness*4,color: color,opacity: opacity,});
                    }
                    else if (k%5 == 0) {
                        const xs = x + (R-MarkM)*Math.sin(theta);
                        const ys = y + (R-MarkM)*Math.cos(theta);
                        page.drawLine({start: { x: xs, y: ys },end: { x: xe, y: ye },thickness: thickness*3,color: color,opacity: opacity,});
                    }
                    else{
                        const xs = x + (R-Markm)*Math.sin(theta);
                        const ys = y + (R-Markm)*Math.cos(theta);
                        page.drawLine({start: { x: xs, y: ys },end: { x: xe, y: ye },thickness: thickness,color: color,opacity: opacity,});
                    }
                }
                var hour = Math.floor(Math.random() * 12);
                var min = Math.floor(Math.random() * 60);

                const thetaM = min/30*pi;
                const thetaH = hour/6*pi + min/60*1/6*pi;
                const thetaMR  = thetaM + pi/2;
                const thetaML  = thetaM - pi/2;
                const thetaHR  = thetaH + pi/2;
                const thetaHL  = thetaH - pi/2;

                const xHa = 0 + Lh*Math.sin(thetaH);
                const yHa = 0 - Lh*Math.cos(thetaH);
                const xHb = 0 + r*Math.sin(thetaHL);
                const yHb = 0 - r*Math.cos(thetaHL);
                const xHc = 0 + r*Math.sin(thetaHR);
                const yHc = 0 - r*Math.cos(thetaHR);
                const pathH = 'M '+xHa+' '+yHa+' L '+xHb+' '+yHb+' L '+xHc+' '+yHc+' Z';
                page.drawSvgPath(pathH, { x: x, y: y,borderWidth: thickness,borderColor: color,color: color,});

                const xMa = 0 + Lm*Math.sin(thetaM);
                const yMa = 0 - Lm*Math.cos(thetaM);
                const xMb = 0 + r*Math.sin(thetaML);
                const yMb = 0 - r*Math.cos(thetaML);
                const xMc = 0 + r*Math.sin(thetaMR);
                const yMc = 0 - r*Math.cos(thetaMR);
                const pathM = 'M '+xMa+' '+yMa+' L '+xMb+' '+yMb+' L '+xMc+' '+yMc+' Z';
                page.drawSvgPath(pathM, { x: x, y: y,borderWidth: thickness,borderColor: color,color: color,});

                for (let k=0; k<12; k++){
                    const thetaN = (k)/6*pi;
                    const xc = x + Ln*Math.sin(thetaN);
                    const yc = y + Ln*Math.cos(thetaN);
                    let fontsize = 3;

                    const font = await pdfDoc.embedFont(StandardFonts.CourierBold);
                    var textWidth = font.widthOfTextAtSize(k.toString(), fontsize);
                    var xx = xc - textWidth / 2;
                    var yy = yc - fontsize / 2 + fontsize/7;

                    page.moveTo(xx, yy);
                    page.drawText(k.toString(),{size: fontsize,font: font});
                }
            }
        }

        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        document.getElementById('pdf').src = pdfDataUri+'#toolbar=0&view=Fit';
        document.getElementById('pdf').style.display = "";
    }

}


// ----------------------------------------------------------------------------------------->


function Pdfsheets(){
    const lessStyle = /* css */`
            .work_main{
                max-width: 100%;
                text-align: center; 
                label{
                    font-size: 20px;
                    line-height: 0px;
                    font-family: var(--serifFont);
                    span{
                        font-family: var(--sansSerifFont);
                    }
                }
                .inputtext{
                    border: solid; 
                    border-width: 1px; 
                    border-radius: 15px;
                    border-color: rgb(241, 148, 104);
                    font-family: var(--serifFont); 
                    font-size: 30px;
                    text-align: center;
                    margin: 10px 0;
                    padding-bottom: 3px;
                }
                .button{
                    border: solid; 
                    border-width: 1px; 
                    border-radius: 8px;
                    width: 150px; 
                    height: 30px; 
                    margin: 10px;
                    background-color: aliceblue;
                    span{
                        position: relative;
                        top: -1px;
                        font-family: var(--serifFont); 
                    }
                    &:active{
                        color: grey;
                        background-color: lavenderblush;
                    }
                }
            }

            @media screen and (max-width:900px) {
                .work_main .pdfbox {
                    width: 90%; 
                    aspect-ratio: 3/2.2;
                }
            }
            @media screen and (min-width:900px) {
                .work_main .pdfbox {
                    width: 840px; 
                    aspect-ratio: 3/2.2;
                }
            }
    `;/* css */

    function loadJs(){
        const script = document.createElement('script');
        script.src = './assets/js/pdf-lib.min.js';
        script.type = 'text/javascript';
        script.id = 'jswkPdfsh'
        document.head.appendChild(script);
        const scripta = document.createElement('script');
        scripta.src = './assets/js/fontkit.umd.min.js';
        scripta.type = 'text/javascript';
        scripta.id = 'jswkPdfFk'
        document.head.appendChild(scripta);
    }

    useMemo( () => {
        loadJs()
        loadLessStyle (lessStyle, 'stywPdfsh')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('jswkPdfsh')
            removeElementById('stywPdfsh')
            removeElementById('jswkPdfFk')
        })
    },[]);

    return (
    <div class="card-display">
        <a><h2 class="card-title">笔顺练习</h2></a>

        <div class="work_main">
            <div><label class="label" for="text-input"><span>输入汉字</span> <br /> 例如: 弯弯的月儿小小的船，;;小小的船儿两头尖。;;我在小小的船里坐 <br /> 半角;;作为换行符，标点和空格也算一个字符</label></div>
            <div><input class="inputtext" style={{width:'100%'}} id="text-input" type="text" placeholder="汉字:" /></div>
            <div><label class="label" for="text-input"><span> 输入拼音或英文 </span><br /> 例如: 拼音 wan, wan, de, yue, er ;; Xiao, Xiao, de, chuan<br />
                半角backtick(\`)作为句子分隔，半角逗号作为拼音分隔，支持带音调的字符，可以任意空格，空格会被忽略掉<br />
                或输入英文: today is a nice day. ;; we are going to play.<br />
                英文句子首尾的空格会被去掉，但中间的会保留。英文格里识别英文格式，其他识别拼音格式</label></div>
            <div><input class="inputtext" style={{width:'100%'}} id="text-pinyin" type="text" placeholder="拼音:" /></div>

            <div>
                <button class="button" style={{fontSize: '20px'}} id="createPDFFile" onClick={createTianzige}><span>生成田字格</span></button>
                <button class="button" style={{fontSize: '20px'}} id="createPDFFile" onClick={createYingyuge}><span>生成英语格</span></button>
                <button class="button" style={{fontSize: '20px'}} id="createPDFFile" onClick={createPinyinge}><span>生成拼音格</span></button>
                <button class="button" style={{fontSize: '20px'}} id="createPDFFile" onClick={createZuowenge}><span>生成作文格</span></button>
                <button class="button" style={{fontSize: '20px'}} id="createPDFFile" onClick={createCalcpaper}><span>生成加减草稿纸</span></button>
                <button class="button" style={{fontSize: '20px'}} id="createPDFFile" onClick={createDivpaper}><span>生成除法草稿纸</span></button>
            </div>
            <div><iframe class="pdfbox" id="pdf" style={{display: 'none'}}></iframe></div>

        </div>
    </div>   
    )

async function createDivpaper() {
        const { PDFDocument, StandardFonts, rgb } = PDFLib
        const color = rgb(0, 0, 0);
        const thickness = 0.2;
        const dashArray = [1, 0.5];
        const opacity = 0.75;

        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([297, 210]);
        const startx = 10;
        const starty = 10;
        
        for (let i=0;i<8;i++){
            for (let j=0; j<4; j++){
                page.drawLine({start: { x: startx+35.875*i, y: starty + 50.3*j +26 },end: { x: startx+35.875*i, y: starty + 50.3*j +6 +26},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+6, y: starty + 50.3*j +26 },end: { x: startx+35.875*i+6, y: starty + 50.3*j +6 +26},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i, y: starty + 50.3*j +26 },end: { x: startx+35.875*i+6, y: starty + 50.3*j +26},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i, y: starty + 50.3*j +6+26},end: { x: startx+35.875*i+6, y: starty + 50.3*j+6 +26},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});

                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j },end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*1},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*1},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*1 +0.5},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*1+0.5},thickness: thickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*1 +1},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*1 +1},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*2 +1},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*2 +1},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*3 +1},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*3 +1},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*3 +1.5},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*3+1.5},thickness: thickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*3 +2},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*3 +2},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*4 +2},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*4 +2},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*5 +2},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*5 +2},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});

                page.drawLine({start: { x: startx+35.875*i+8 -0.5, y: starty + 50.3*j +6*5 +2.5},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*5+2.5},thickness: thickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8 -0.5, y: starty + 50.3*j +6*5 +2.5},end: { x: startx+35.875*i+8 -0.5 -1.8, y: starty + 50.3*j +6*5 +2.5 -8},thickness: thickness,color:color, opacity: opacity,});

                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*5 +3},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*5 +3},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+35.875*i+8, y: starty + 50.3*j +6*6 +3},end: { x: startx+35.875*i+8+6*3, y: starty + 50.3*j+6*6 +3},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});

                for (let k=0; k<4; k++){
                    page.drawLine({start: { x: startx+35.875*i+8 +k*6, y: starty + 50.3*j},end: { x: startx+35.875*i+8 +k*6, y: starty + 50.3*j+6},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                    page.drawLine({start: { x: startx+35.875*i+8 +k*6, y: starty + 50.3*j +6 +1},end: { x: startx+35.875*i+8 +k*6, y: starty + 50.3*j+6*3 +1},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                    page.drawLine({start: { x: startx+35.875*i+8 +k*6, y: starty + 50.3*j +6*3 +2},end: { x: startx+35.875*i+8 +k*6, y: starty + 50.3*j+6*5+2},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                    page.drawLine({start: { x: startx+35.875*i+8 +k*6, y: starty + 50.3*j +6*5 +3},end: { x: startx+35.875*i+8 +k*6, y: starty + 50.3*j+6*6+3},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                }
            }
        }
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        document.getElementById('pdf').src = pdfDataUri+'#toolbar=0&view=Fit';
        document.getElementById('pdf').style.display = "";
    }

// ----------------------------------------------->
    
async function createCalcpaper() {
        const { PDFDocument, StandardFonts, rgb } = PDFLib
        const color = rgb(0, 0, 0);
        const thickness = 0.2;
        const dashArray = [1, 0.5];
        const opacity = 0.75;
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([297, 210]);
        const startx = 10;
        const starty = 10;

        for (let i=0;i<8;i++){
            for (let j=0; j<5; j++){
                page.drawLine({start: { x: startx+36*i, y: starty + 39.25*j },end: { x: startx+36*i+24, y: starty + 39.25*j},thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+36*i, y: starty + 39.25*j +6.2 },end: { x: startx+36*i+24, y: starty+ 39.25*j+ 6.2 },thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+36*i, y: starty + 39.25*j +6.7 },end: { x: startx+36*i+24, y: starty+ 39.25*j+ 6.7 },thickness: thickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i, y: starty + 39.25*j +7.2 },end: { x: startx+36*i+24, y: starty+ 39.25*j+ 7.2 },thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+36*i, y: starty + 39.25*j +7.2 +6.2 },end: { x: startx+36*i+24, y: starty+ 39.25*j+ 7.2 + 6.2 },thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+36*i, y: starty + 39.25*j +7.2 +6.2*2 },end: { x: startx+36*i+24, y: starty+ 39.25*j + 7.2 + 6.2*2 },thickness: thickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: startx+36*i, y: starty + 39.25*j + 19.6 +0.5 },end: { x: startx+36*i+24, y: starty+ 39.25*j + 19.6 +0.5 },thickness: thickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6, y: starty + 39.25*j + 20.6 },end: { x: startx+36*i+24 , y: starty+ 39.25*j + 20.6 },thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6, y: starty + 39.25*j + 20.6 +6.2},end: { x: startx+36*i+24 , y: starty+ 39.25*j + 20.6 +6.2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6, y: starty + 39.25*j + 20.6 +12.4},end: { x: startx+36*i+24 , y: starty+ 39.25*j + 20.6 +12.4},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});

                page.drawLine({start: { x: startx+36*i , y: starty + 39.25*j },end: { x: startx+36*i, y: starty+ 39.25*j + 6.2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i , y: starty + 39.25*j +7.2 },end: { x: startx+36*i, y: starty+ 39.25*j +7.2 + 6.2*2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});

                page.drawLine({start: { x: startx+36*i +6, y: starty + 39.25*j },end: { x: startx+36*i+6, y: starty+ 39.25*j + 6.2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6, y: starty + 39.25*j +7.2 },end: { x: startx+36*i+6, y: starty+ 39.25*j +7.2 + 6.2*2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6, y: starty + 39.25*j +8.2 +6.2*2},end: { x: startx+36*i+6, y: starty+ 39.25*j +8.2 + 6.2*4},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});

                page.drawLine({start: { x: startx+36*i +6*2, y: starty + 39.25*j },end: { x: startx+36*i+6*2, y: starty+ 39.25*j + 6.2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6*2, y: starty + 39.25*j +7.2 },end: { x: startx+36*i+6*2, y: starty+ 39.25*j +7.2 + 6.2*2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6*2, y: starty + 39.25*j +8.2 +6.2*2},end: { x: startx+36*i+6*2, y: starty+ 39.25*j +8.2 + 6.2*4},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});

                page.drawLine({start: { x: startx+36*i +6*3, y: starty + 39.25*j },end: { x: startx+36*i+6*3, y: starty+ 39.25*j + 6.2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6*3, y: starty + 39.25*j +7.2 },end: { x: startx+36*i+6*3, y: starty+ 39.25*j +7.2 + 6.2*2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6*3, y: starty + 39.25*j +8.2 +6.2*2},end: { x: startx+36*i+6*3, y: starty+ 39.25*j +8.2 + 6.2*4},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});

                page.drawLine({start: { x: startx+36*i +6*4, y: starty + 39.25*j },end: { x: startx+36*i+6*4, y: starty+ 39.25*j + 6.2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6*4, y: starty + 39.25*j +7.2 },end: { x: startx+36*i+6*4, y: starty+ 39.25*j +7.2 + 6.2*2},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
                page.drawLine({start: { x: startx+36*i +6*4, y: starty + 39.25*j +8.2 +6.2*2},end: { x: startx+36*i+6*4, y: starty+ 39.25*j +8.2 + 6.2*4},thickness: thickness,color:color, dashArray: dashArray, opacity: opacity,});
            }
        }
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        document.getElementById('pdf').src = pdfDataUri+'#toolbar=0&view=Fit';
        document.getElementById('pdf').style.display = "";
    }

// ----------------------------------------------->

async function createZuowenge() {
        const { PDFDocument, StandardFonts, rgb } = PDFLib
        const color = rgb(0, 0, 0);
        const thickness = 0.2;
        const dashArray = [1, 0.5];
        const opacity = 0.75;
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([210, 297]);
        const startx = 10;
        const dx = 6.13;
        const dy = 8.5;
        const starty = 16;
        
        page.drawLine({start: { x: startx, y: starty },end: { x: startx, y: starty+dy*31-1.5 },thickness: thickness,color: color,opacity: opacity,});
        page.drawLine({start: { x: startx+dx*31, y: starty },end: { x: startx+dx*31, y: starty+dy*31-1.5 },thickness: thickness,color: color,opacity: opacity,});
        for (let i=0; i<31; i++){
            for (let j=0;j<31;j++){
                page.drawLine({start: { x: startx+(i+1)*dx, y: starty + dy*j },end: { x: startx+(i+1)*dx, y: starty+dy*j+7 },thickness: thickness,color: color,opacity: opacity,});
            }
        }
        for (let i=0;i<31;i++){
            page.drawLine({start: { x: startx, y: starty + dy*i },end: { x: startx+dx*31, y: starty+dy*i },thickness: thickness,color: color,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + dy*i+7 },end: { x: startx+dx*31, y: starty+dy*i+7 },thickness: thickness,color: color,opacity: opacity,});
        }

        let inputh =document.getElementById('text-input').value;
        let Hanzi = inputh.split(";;");
        if (inputh != ''){
            pdfDoc.registerFontkit(fontkit);
            var urlKai = "./assets/fonts/STKai.ttf";
            var fontBytesKai = await fetch(urlKai).then((res) => res.arrayBuffer());
            const fontKai = await pdfDoc.embedFont(fontBytesKai);
            for (let j=0;j<Hanzi.length;j++){
                for(let i=0;i<Hanzi[j].length;i++){
                    page.moveTo(startx+i*dx, starty+(30-j)*dy+1.5);
                    page.drawText(Hanzi[j][i],{size: 6,font:fontKai});
                }
            }    
        }
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        document.getElementById('pdf').src = pdfDataUri+'#toolbar=0&view=Fit';
        document.getElementById('pdf').style.display = "";
    }

// ----------------------------------------------->

async function createTianzige() {
        const { PDFDocument, StandardFonts, rgb } = PDFLib
        const color = rgb(0, 0, 0);
        const thickness = 0.2;
        const dashArray = [1, 0.5];
        const opacity = 0.75;
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([297, 210]);
        const startx = 10;
        const starty = 25;

        page.drawLine({start: { x: startx, y: starty },end: { x: startx, y: starty+20*8 },thickness: thickness,color: color,opacity: opacity,});
        page.drawLine({start: { x: startx+23*12, y: starty },end: { x: startx+23*12, y: starty+20*8 },thickness: thickness,color: color,opacity: opacity,});
        for (let i=0;i<8;i++){
            page.drawLine({start: { x: startx, y: starty + 20*i },end: { x: startx+23*12, y: starty+20*i },thickness: thickness,color: color,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 20*i+6 },end: { x: startx+23*12, y: starty+20*i+6 },thickness: thickness,color: color,dashArray: dashArray,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 20*i+12 },end: { x: startx+23*12, y: starty+20*i+12 },thickness: thickness,color: color,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 20*i+12+2.6 },end: { x: startx+23*12, y: starty+20*i+12+2.6 },thickness: thickness,color: color,dashArray: dashArray,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 20*i+12+2.6+2.8 },end: { x: startx+23*12, y: starty+20*i+12+2.6+2.8 },thickness: thickness,color: color,dashArray: dashArray,opacity: opacity,});
        }
        page.drawLine({start: { x: startx, y: starty + 20*8 },end: { x: startx+23*12, y: starty+20*8 },thickness: thickness,color: color,opacity: opacity,});
        for (let i=0;i<23;i++){
            for (let j=0;j<8;j++){
                page.drawLine({start: { x: startx+i*12+6, y: starty + 20*j },end: { x: startx+i*12+6, y: starty+20*j+12 },thickness: thickness,color: color,dashArray: dashArray,opacity: opacity,});
            }
        }
        for (let i=0;i<22;i++){
            for (let j=0;j<8;j++){
                page.drawLine({start: { x: startx+i*12+12, y: starty + 20*j },end: { x: startx+i*12+12, y: starty+20*j+12 },thickness: thickness,color: color,opacity: opacity,});
            }
        }

        let inputh =document.getElementById('text-input').value;
        if (inputh != ''){
            pdfDoc.registerFontkit(fontkit);
            var urlKai = "./assets/fonts/STKai.ttf";
            var fontBytesKai = await fetch(urlKai).then((res) => res.arrayBuffer());
            const fontKai = await pdfDoc.embedFont(fontBytesKai);

            let Hanzi = inputh.split(";;");
            for (let j=0;j<Hanzi.length;j++){
                for(let i=0;i<Hanzi[j].length;i++){
                    page.moveTo(startx+i*12, starty+(7-j)*20+2);
                    page.drawText(Hanzi[j][i],{size: 12,font:fontKai});
                }
            }
        }

        let inputp =document.getElementById('text-pinyin').value;
        if (inputp != ''){
            pdfDoc.registerFontkit(fontkit);
            var urlPin = "./assets/fonts/PinyinW3-Light.ttf";
            var fontBytesPin = await fetch(urlPin).then((res) => res.arrayBuffer());
            const fontPin = await pdfDoc.embedFont(fontBytesPin);
        
            let iPinyin = inputp.replace(/\s/g,'').split(";;");
            let Pinyin = [];
            for (let i=0; i<iPinyin.length;i++){
                let str = iPinyin[i].split(",");
                Pinyin.push(str);
            }
            for (let j=0;j<Pinyin.length;j++){
                for(let i=0;i<Pinyin[j].length;i++){
                    var textWidth = fontPin.widthOfTextAtSize(Pinyin[j][i], 5.6);
                    page.moveTo(startx+i*12+6-textWidth/2, starty+(7-j)*20+15);
                    page.drawText(Pinyin[j][i],{size: 5.6,font:fontPin});
                }
            }
        }
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        document.getElementById('pdf').src = pdfDataUri+'#toolbar=0&view=Fit';
        document.getElementById('pdf').style.display = "";
    }

// ----------------------------------------------->

async function createYingyuge() {
        const { PDFDocument, StandardFonts, rgb } = PDFLib
        const color = rgb(0, 0, 0);
        const thickness = 0.2;
        const dashArray = [1, 0.5];
        const opacity = 0.75;
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([297, 210]);
        const startx = 10;
        const endx = 287;
        const starty = 14.5;
        const endy = 210-14.5;

        page.drawLine({start: { x: startx, y: starty },end: { x: startx, y: endy },thickness: thickness,color: color,opacity: opacity,});
        page.drawLine({start: { x: endx, y: starty },end: { x: endx, y: endy },thickness: thickness,color: color,opacity: opacity,});
        for (let i=0;i<11;i++){
            page.drawLine({start: { x: startx, y: starty + 17*i },end: { x: endx, y: starty+17*i },thickness: thickness,color: color,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 17*i+3.5 },end: { x: endx, y: starty+17*i+3.5 },thickness: thickness,color: color,dashArray: dashArray,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 17*i+7.5 },end: { x: endx, y: starty+17*i+7.5 },thickness: thickness,color: color,dashArray: dashArray,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 17*i+11 },end: { x: endx, y: starty+17*i+11 },thickness: thickness,color: color,opacity: opacity,});
        }

        let inputp =document.getElementById('text-pinyin').value;
        if (inputp != ''){
            pdfDoc.registerFontkit(fontkit);
            var urlPin = "./assets/fonts/PinyinW3-Light.ttf";
            var fontBytesPin = await fetch(urlPin).then((res) => res.arrayBuffer());
            const fontPin = await pdfDoc.embedFont(fontBytesPin);

            let iPinyin = inputp.split(";;");
            let Pinyin = [];
            for (let i=0; i<iPinyin.length;i++){
                let str = iPinyin[i].trim();
                Pinyin.push(str);
            }
            for(let i=0;i<Pinyin.length;i++){
                page.moveTo(startx+1, starty+(11-i)*17-13);
                page.drawText(Pinyin[i],{size: 8,font:fontPin});
            }
        }
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        document.getElementById('pdf').src = pdfDataUri+'#toolbar=0&view=Fit';
        document.getElementById('pdf').style.display = "";
    }

// ----------------------------------------------->

async function createPinyinge() {
        const { PDFDocument, StandardFonts, rgb } = PDFLib
        const color = rgb(0, 0, 0);
        const thickness = 0.2;
        const dashArray = [1, 0.5];
        const opacity = 0.75;
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([297, 210]);
        const startx = 10;
        const endx = 287;
        const nodes = 10;
        const starty = 14.5;
        const endy = 210-14.5;

        page.drawLine({start: { x: startx, y: starty },end: { x: startx, y: endy },thickness: thickness,color: color,opacity: opacity,});
        page.drawLine({start: { x: endx, y: starty },end: { x: endx, y: endy },thickness: thickness,color: color,opacity: opacity,});
        for (let i=0;i<11;i++){
            page.drawLine({start: { x: startx, y: starty + 17*i },end: { x: endx, y: starty+17*i },thickness: thickness,color: color,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 17*i+3.5 },end: { x: endx, y: starty+17*i+3.5 },thickness: thickness,color: color,dashArray: dashArray,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 17*i+7.5 },end: { x: endx, y: starty+17*i+7.5 },thickness: thickness,color: color,dashArray: dashArray,opacity: opacity,});
            page.drawLine({start: { x: startx, y: starty + 17*i+11 },end: { x: endx, y: starty+17*i+11 },thickness: thickness,color: color,opacity: opacity,});
        }
        for (let i=0;i<nodes;i++){
            for (let j=0;j<11;j++){
                page.drawLine({start: { x: startx+277/nodes*i, y: starty + 17*j },end: { x: startx+277/nodes*i, y: starty+17*j+11 },thickness: thickness,color: color,opacity: opacity,});
            }
        }

        let inputp =document.getElementById('text-pinyin').value;
        if (inputp != ''){
            pdfDoc.registerFontkit(fontkit);
            var urlPin = "./assets/fonts/PinyinW3-Light.ttf";
            var fontBytesPin = await fetch(urlPin).then((res) => res.arrayBuffer());
            const fontPin = await pdfDoc.embedFont(fontBytesPin);
        
            let iPinyin = inputp.replace(/\s/g,'').split(";;");
            let Pinyin = [];
            for (let i=0; i<iPinyin.length;i++){
                let str = iPinyin[i].split(",");
                Pinyin.push(str);
            }
            for(let i=0; i<Pinyin.length;i++){
                for(let j=0; j<Pinyin[i].length; j++){
                    var textWidth = fontPin.widthOfTextAtSize(Pinyin[i][j], 8);
                    page.moveTo(startx + 277/nodes/2 + j* 277/nodes - textWidth/2, starty+(11-i)*17-13);
                    page.drawText(Pinyin[i][j],{size: 8,font:fontPin});
                }
            }
        }
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        document.getElementById('pdf').src = pdfDataUri+'#toolbar=0&view=Fit';
        document.getElementById('pdf').style.display = "";
    }

}


// ----------------------------------------------------------------------------------------->



function Bishunsheet(){
    
    const lessStyle = /* css */`
            .work_main{
                max-width: 100%;
                text-align: center; 
                .label{
                    font-family: var(--serifFont); 
                    font-size: 30px;
                }
                .inputtext{
                    border: solid; 
                    border-width: 1px; 
                    border-radius: 15px;
                    border-color: rgb(241, 148, 104);
                    font-family: var(--serifFont); 
                    font-size: 40px;
                    text-align: center;
                    margin: 10px 0;
                    padding-bottom: 3px;
                }
                .button{
                    border: solid; 
                    border-width: 1px; 
                    border-radius: 8px;
                    width: 150px; 
                    height: 40px; 
                    margin: 10px;
                    background-color: aliceblue;
                    span{
                        position: relative;
                        top: -1.5px;
                        font-family: var(--serifFont); 
                        font-size: 26px;
                    }
                    &:active{
                        color: grey;
                        background-color: lavenderblush;
                    }
                }
            }

            @media screen and (max-width:900px) {
                .work_main {
                    .pdfbox {
                        width: 95%; 
                        aspect-ratio: 3/2.2;
                    }
                    .inputtext { 
                        width:95%;
                    }
                    .label{
                        font-size: 24px;
                    }
                }
            }
            @media screen and (min-width:900px) {
                .work_main {
                    .pdfbox {
                        width: 840px; 
                        aspect-ratio: 3/2.2;
                    }
                    .inputtext { 
                        width:800px;
                    }
                }
            }
    `/* css */

    function loadJs(){
        const script = document.createElement('script');
        script.src = './assets/js/pdf-lib.min.js';
        script.type = 'text/javascript';
        script.id = 'jswkBishu'
        document.head.appendChild(script);
    }

    useMemo( () => {
        loadJs()
        loadLessStyle (lessStyle, 'stywBishu')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('stywBishu')
            removeElementById('jswkBishu')
        })
    },[]);

    return (
        <div class="card-display">
            <a><h2 class="card-title">笔顺练习</h2></a>
            <div class="work_main">
                <div><label class="label" for="text-input">输入汉字 最多12个汉字</label></div>
                <div><input class="inputtext" id="text-input" type="text" placeholder="汉字:" onKeyDown={clickPress} /></div>
                <div><button class="button" id="createPDFFile" onClick={createHanzi}><span>生成笔顺</span></button></div>
                <div id="timer"></div>
                <div><iframe class="pdfbox" id="pdf" style={{display: 'none'}}></iframe></div>
            </div>
        </div>
    )


    function clickPress(event){
        if (event.key == "Enter") {
            createHanzi();
        }
    }

    async function createHanzi() {

        const { degrees,PDFDocument, StandardFonts, rgb, popGraphicsState, pushGraphicsState, scale, translate,} = PDFLib

        const word =document.getElementById('text-input').value;
        let words = "";
        var re= RegExp("^[A-Za-z0-9]+$");
        var re1=RegExp("^[\u4E00-\u9FA5A-Za-z0-9]+$");
        for (let char of word){
            if (re.test(char) || !re1.test(char)){
            }
            else{
                words = words + char;
            }
        }
        if(words ==""){
            alert("没有输入任何汉字");
        }
        else{
            const pdfDoc = await PDFLib.PDFDocument.create();
            const page = pdfDoc.addPage([297, 210]);
            const color = rgb(0, 0, 0);
            const dashArray = [1, 0.5];
            const opacity = 0.75;
            const gridthickness = 0.1;
            const strokethickness = 6;
            page.pushOperators(
                pushGraphicsState(),
                scale(1, -1),
                translate(0, -210),
            );
        
            let startx = 12;
            let starty = 10;
            let size = 14;
            let charNum = 12;
            if(words.length < 12){
                charNum = words.length;
                starty = (210-14*words.length-2*(words.length-1))/2;
            }
        
            var charDatas = [];
            for (let i=0; i<charNum;i++){
                // const charData = await fetch("/search/dict/zh/"+words[i])
                // .then(res => res.json());
                // const charData = await HanziWriter.loadCharacterData(words[i]);  // 上面一句使用自己服务器获取数据，这一句使用cdn获取；

                var databaseURL = ''
                var fileID = 0
                await import("../assets/dicts/hanziData/hanziIndex.js").then( (h)=>{        
                    var hanziIndex = [...h.hanzi.index]
                    for (let j=0; j<hanziIndex.length; j++){
                        if (hanziIndex[j].includes(words[i])){
                            fileID = j+1
                            break
                        }
                    }
                })

                if (fileID != 0){
                    databaseURL = "./assets/dicts/hanziData/hanzi-"+String(fileID)+".json"
                    var jsondata = await fetch(databaseURL).then(x => x.json());
                    var data = jsondata[words[i]]
                    charDatas.push(data)
                }
                else{
                    alert(words[i]+' 字没有找到')
                }
            }

            for (let i=0; i<charDatas.length;i++){
                let y = starty + i*16;
                let x = startx;
                page.drawLine({start: { x: x, y: y },end: { x: x+size, y: y},thickness: gridthickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: x+size+7, y: y },end: { x: x+size*19+7, y: y},thickness: gridthickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: x+size, y: y+size },end: { x: x, y: y+size},thickness: gridthickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: x+size+7, y: y+size },end: { x: x+size*19+7, y: y+size},thickness: gridthickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: x, y: y },end: { x: x, y: y+size},thickness: gridthickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: x+size+7, y: y },end: { x: x+size+7, y: y+size},thickness: gridthickness,color:color, opacity: opacity,});
                page.drawLine({start: { x: x, y: y+size/2 },end: { x: x+size, y: y+size/2},thickness: gridthickness,color:color, dashArray: dashArray,opacity: opacity,});
                page.drawLine({start: { x: x+size+7, y: y+size/2 },end: { x: x+size*19+7, y: y+size/2},thickness: gridthickness,color:color, dashArray: dashArray,opacity: opacity,});

                const charData = charDatas[i];

                for (let j=0; j<19; j++){
                    if(j > 0){
                        x = startx + 7 + j*14;
                    }
                    page.drawLine({start: { x: x, y: y },end: { x: x+size, y: y+size},thickness: gridthickness,color:color, dashArray: dashArray,opacity: opacity,});
                    page.drawLine({start: { x: x+size, y: y+size },end: { x: x+size, y: y},thickness: gridthickness,color:color, opacity: opacity,});
                    page.drawLine({start: { x: x+size, y: y },end: { x: x, y: y+size},thickness: gridthickness,color:color, dashArray: dashArray,opacity: opacity,});
                    page.drawLine({start: { x: x+size/2, y: y },end: { x: x+size/2, y: y+size},thickness: gridthickness,color:color, dashArray: dashArray,opacity: opacity,});	

                    if (j==0){
                        var strokes = charData.strokes.slice(0, charData.strokes.length + 1);
                        strokes.forEach(function(stroke){
                            page.drawSvgPath(stroke,{x:x,y:y+ 90*size/100,scale:0.1*size/100, rotate: degrees(0),borderColor: color, color:color,borderWidth:strokethickness});
                        })
                    }
                    else if (j<=charData.strokes.length) {
                        var strokes = charData.strokes.slice(0, j);
                        var k = 0;
                        strokes.forEach(function(stroke){
                            k++;
                            if (k==strokes.length){
                                page.drawSvgPath(stroke,{x:x,y:y+ 90*size/100,scale:0.1*size/100, rotate: degrees(0),borderColor: color, color:color,borderWidth:strokethickness});
                            }
                            else{
                                page.drawSvgPath(stroke,{x:x,y:y+ 90*size/100,scale:0.1*size/100, rotate: degrees(0),borderColor: color,borderWidth:strokethickness});
                            }
                        });
                    }
                    else {
                        var strokes = charData.strokes.slice(0, charData.strokes.length + 1);
                        strokes.forEach(function(stroke){
                            page.drawSvgPath(stroke,{x:x,y:y+ 90*size/100,scale:0.1*size/100, rotate: degrees(0),borderColor: color,borderWidth:strokethickness});
                        })
                    }
                }
            }
            page.pushOperators(popGraphicsState());
            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            document.getElementById('pdf').src = pdfDataUri+'#toolbar=0&view=Fit';
            document.getElementById('pdf').style.display = "";  
        }
    }
}



// ----------------------------------------------------------------------------------------->



function Dict(){

    const lessStyle = /* css */`
            .fixhead{
                height: 180px;
                width: 100%;
                background-color: white; 
                position: fixed;
                top: 24px;
                left: 50%;
                transform: translate(-50%, 0%);	

                .inputbox{
                    max-width: 100%;
                    text-align: center; 
                    margin-top: -30px;
                    label{
                        font-family: var(--serifFont); 
                        font-size: 36px;
                    }
                    .inputtext{
                        border: solid; 
                        border-width: 1px; 
                        border-radius: 15px;
                        border-color: rgb(241, 148, 104);
                        font-size: 36px;
                        font-family: var(--serifFont);
                        text-align: center;
                        margin: 10px 0;
                        padding-bottom: 3px;
                    }
                    .button{
                        border: solid; 
                        border-width: 1px; 
                        border-radius: 8px;
                        width: 100px; 
                        height: 40px; 
                        background-color: aliceblue;
                        span{
                            font-family: var(--serifFont); 
                            font-size: 28px;
                            position: relative;
                            top: -2.5px;
                        }
                        &:active{
                            color: grey;
                            background-color: lavenderblush;
                        }
                    }
                }
            }

            .dictbox{
                display: flex; 
                max-width: 100%;
                flex-wrap: wrap;
                justify-content: center; 
                align-items: stretch;
                margin-top: 180px;

                .translationbox{
                    display: flex;
                    flex-grow: 1;
                    flex-shrink: 1;
                    flex-basis: 600px;
                    justify-content: center;
                    align-items: top;
                    margin: 20px 5px;
                    font-size: 28px;
                    ul{
                        padding: 20px 40px;
                        border: solid; 
                        border-width: 1px; 
                        border-radius: 15px;
                        border-color: rgb(241, 148, 104);
                        li{
                            list-style-type: none;
                            font-family: var(--serifFont);
                        }
                        li+li{
                            margin-top: 20px;
                        }
                        .type{
                            font-style: italic;
                            font-size: 20px;
                            color: red;
                            font-family: var(--sansSerifFont);
                        }
                    }
                }
                .phrasebox{
                    font-size: 20px;
                    ul{
                        li{
                            list-style-type: none;
                            font-family: var(--serifFont);
                        }
                        li+li{
                            margin-top: 10px;
                        }
                    }
                    &:extend(.dictbox .translationbox);
                }
            }

            @media screen and (max-width:650px) {
                .dictbox .translationbox, .dictbox .phrasebox{flex-grow: 1;}
                .fixhead .inputbox .inputtext{ width: calc(100% - 20px);}
            }
            @media screen and (min-width:650px) {
                .dictbox .translationbox, .dictbox .phrasebox{flex-grow: 0;}
                .fixhead .inputbox .inputtext{ width: 600px;}
            }	
    `/* css */

    useMemo( () => {
        loadLessStyle (lessStyle, 'stywkDict')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('stywkDict')
        })
    },[]);


    return(
    <div class="card-display">
        <div class="fixhead">
            <a><h2 class="card-title">网页词典</h2></a>
            <div class="inputbox">
                <div>
                    <div><label lang="en" for="text-input">输入单词:</label></div>
                    <div><input id="input" class="inputtext" type="text" onKeyDown={clickPress} placeholder="输入:"></input></div>
                    <div><button id="search" class="button" onClick={getchar} ><span>查询</span></button></div>
                    <div><audio id="audioPlayer"></audio></div>
                </div>
            </div>
        </div>
        <div>
            <div class="dictbox">
                <div class="translationbox"><div id="dict"></div></div>
                <div class="phrasebox"><div id="phrases"></div></div>
            </div>
        </div>
    </div>
    )

function clickPress(event){
    if (event.key == "Enter") {
            getchar();
    }
}

async function getchar(){
        var words = "";
        const word =document.getElementById('input').value;
        words = "";
        var re2= RegExp("^[A-Za-z]+$"); //英文
        var re= RegExp("^[A-Za-z0-9]+$"); //英文和数字
        var re1=RegExp("^[\u4E00-\u9FA5A-Za-z0-9]+$");// 汉字、英文、数字
        for (let char of word){
            if (!re2.test(char)){
                // 不是字母 pass
            }
            else{
                words = words + char;
            }
        }

        if(words != ""){

            var databaseURL = ''
            var fileID = 0
            await import("../assets/dicts/dictData/dictIndex.js").then( (h)=>{        
                var dictIndex = [...h.dict.index]
                for (let j=0; j<dictIndex.length; j++){
                    if (dictIndex[j].includes(words)){
                        fileID = j+1
                        break
                    }
                }
            })

            var dictData;

            if ( fileID != 0 ){
                databaseURL = "./assets/dicts/dictData/dict-"+String(fileID)+".json"
                var jsondata = await fetch(databaseURL).then(x => x.json());
                dictData = jsondata[words]
            }
            else{
                dictData = {"t":[{"y":"我的词典里没有这个单词","t":""}]}
            }

            // var sound = new SpeechSynthesisUtterance(words);
            // window.speechSynthesis.speak(sound);

            const mp3Url = "http://dict.youdao.com/dictvoice?type=0&audio="+words;
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = mp3Url;
            audioPlayer.load();
            audioPlayer.play().catch(error => {
                console.error('播放音频时出错:', error);
            });

            const target = document.getElementById("dict");
            target.innerHTML = '';
            var content = '<ul>';
            var newdiv = document.createElement('div');
            var tran = dictData.t;
            for (let i=0; i<tran.length; i++){
                var translation = tran[i].t;
                var type = tran[i].y;
                content += `<li><span class="type">${type}</span>&nbsp;&nbsp;&nbsp;${translation}</li>`;
            }
            content += '</ul>'
            newdiv.innerHTML = content;
            target.appendChild(newdiv);

            const targetphrase = document.getElementById("phrases");
            targetphrase.innerHTML = '';
            var contentphrase = '<ul>';
            var newdivphrase = document.createElement('div');
            var phra = dictData.p;
            if (phra){
                for (let i=0; i<phra.length; i++){
                    var phrase = phra[i].p;
                    var translation = phra[i].t;
                    contentphrase += `<li> ${phrase} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${translation} </li>`;
                }
            }
            contentphrase += `</ul>`;
            newdivphrase.innerHTML = contentphrase;
            targetphrase.appendChild(newdivphrase);

            window.scrollTo(0, 0);
        }
    }

}


// ----------------------------------------------------------------------------------------->


function Bishun(){

    const lessStyle = /* css */`
            @font-face {
                font-family: "pinyin";
                font-style: normal;
                font-weight: 100;
                src: url('./assets/fonts/PinyinW3-Light.ttf') format('truetype');
            }
            .work_main{
                display: flex; 
                max-width: 100%;
                flex-wrap: wrap;
                justify-content: center; 
                align-items: stretch;
                .bishun_box{
                    display: flex;
                    flex-grow: 0;
                    flex-shrink: 1;
                    justify-content: center;
                    align-items: center;
                    border: solid; 
                    border-width: 1px;
                    border-radius: 20px;
                    border-color: rgb(241, 148, 104);
                    width: 450px; 
                    height: 450px; 
                    margin: 20px 50px 0px 50px;
                }
                .input_box{
                    display: flex;
                    flex-grow: 0;
                    flex-shrink: 1;
                    justify-content: center;
                    align-items: center;
                    margin: 20px;
                    div{
                        text-align: center;
                    }
                    .inputtext{
                        border: solid; 
                        border-width: 1px; 
                        border-radius: 15px;
                        border-color: rgb(241, 148, 104);
                        width:450px; 
                        font-family: var(--serifFont); 
                        font-size: 60px;
                        text-align: center;
                        margin: 10px 0px 20px 0px;
                        padding-bottom: 6.5px;
                    }
                    .button{
                        border: solid; 
                        border-width: 1px; 
                        border-radius: 8px;
                        width: 100px; 
                        height: 50px; 
                        background-color: aliceblue;
                        span{
                            position: relative;
                            top: -2px;
                            font-family: var(--serifFont); 
                            font-size: 30px;
                        }
                        &:active{
                            color: grey;
                            background-color: lavenderblush;
                        }
                    }
                }
                .pinyin{
                    margin-left: 20px;
                    list-style: disc;
                    .explanation{
                        margin-left: 50px;
                        list-style: square;
                        li{
                            font-family: var(--serifFont);
                            font-size: 22px;
                        }
                        .words{
                            margin-left: 40px;
                            list-style-position:inside;
                            li{
                                list-style: circle;
                            }
                            .wordbox{
                                font-family: var(--serifFont);
                                font-size: 20px;
                                color: rgb(255, 17, 0);
                                flex-shrink: 0;
                            }
                            .textbox{
                                font-family: var(--serifFont);
                                font-size: 20px;
                            }
                        }
                    }
                    .pinyinbox{
                        font-family: "pinyin" ;
                        font-size: 26px;
                        color: rgb(47, 51, 255);
                    }
                }
            }

            #explanation{
                margin-top: 20px;		
            }

            @media screen and (max-width:500px) {
                .work_main{
                    display: block;
                    .input_box {
                        margin: 0px;
                    }
                    .input_box .inputtext{
                        width: calc(100% - 2px);
                        margin: 10px 0px 20px 0px
                    }
                    .bishun_box{
                        width: calc(100% - 2px);
                        margin: 20px 0 0 0;
                    }
                    .pinyin .explanation{
                        margin-left: 20px;
                        .words{
                            margin-left: 20px;
                        }
                    }
                }
                .goTop{
                    display: none;
                }
            }        
    `/* css */

    function loadJs(){
        const script = document.createElement('script');
        script.src = './assets/js/hanzi-writer.min.js';
        script.type = 'text/javascript';
        script.id = 'jswkBisun'
        document.head.appendChild(script);
    }

    useMemo( () => {
        loadJs()
        loadLessStyle (lessStyle, 'stywBisun')
    },[])

    useEffect( () => {
        return ( () => {
            removeElementById('stywBisun')
            removeElementById('jswkBisun')
        })
    },[]);


    let writer = ''


    return (
    <div class="card-display">
        <a><h2 class="card-title">中文字典</h2></a>

        <div class="work_main">
                <div>
                    <div class="input_box">
                        <div>
                            <div><input id="text-input"  class="inputtext" type="text" placeholder="输入汉字:" onKeyDown={clickPress} /></div>
                            <div><button id="animate-button" class="button" onClick={showchar} ><span>演示</span></button></div>
                        </div>
                    </div>
                    <div class="bishun_box"/*  ref="bishunBox" */>
                        <div id="character-target-div"></div>
                    </div>
                </div>

                <div style={{flexBasis: '450px'}} id="explanation"></div>
        </div>
	</div>
    )

function clickPress(event){
    if (event.key == "Enter") {
        showchar();
    }
}

async function showchar(){
        var words = await getchar();
        demo(words)
        getexplanations(words);
    }

async function getexplanations(char) {

        var fileID = 0
        await import("../assets/dicts/xinhuaData/xinhuaIndex.js").then( (h)=>{        
            var xinhuaIndex = [...h.xinhua.index]
            for (let j=0; j<xinhuaIndex.length; j++){
                if (xinhuaIndex[j].includes(char)){
                    fileID = j+1
                    break
                }
            }
        })

        var pronunciations;
        var databaseURL = ''
        if (fileID != 0){
            databaseURL = "./assets/dicts/xinhuaData/xinhua-"+String(fileID)+".json"
            var jsondata = await fetch(databaseURL).then(x => x.json());
            pronunciations = jsondata[char]
        }
        else{
            pronunciations = {"error":"没有找到这个字"}
        }
        let targetexp = document.getElementById("explanation");
        targetexp.innerHTML = '';
        var content = `<ul class='pinyin'>`;
        var newdivexp = document.createElement('div');
        for (let i=0; i<pronunciations.length; i++){
            let pronunciation = pronunciations[i];
            for (let key in pronunciation){
                content += `<li><span class="pinyinbox">${key}</span></li>`;
                var pronuncontent = `<ul class='explanation'>`;
                for (let j=0; j<pronunciation[key].length; j++){
                    var exp = pronunciation[key][j];
                    if (exp.hasOwnProperty('e')){
                        pronuncontent += `<li>${quanjiao(exp["e"])}</li>`;
                    }
                    if (exp.hasOwnProperty('w')){
                        var wordcontent = `<ul class='words'>`;
                        let words = exp['w'];
                        for (let k=0; k<words.length; k++){
                            wordcontent += `<li><div style="display:flex"><div class="wordbox">${words[k]['w']}</div>`;
                            if (words[k].hasOwnProperty('t')){
                                wordcontent += `<div style="width:40px"></div><div class="textbox">${quanjiao(words[k]['t'])}</div><div>`;
                            }
                            wordcontent += `</li>`;
                        }
                        wordcontent += `</ul>`;
                        pronuncontent += wordcontent;
                    }
                }
                pronuncontent += `</ul>`;
                content += pronuncontent;
            }
        }
        content += `</ul>`
        newdivexp.innerHTML = content;
        targetexp.appendChild(newdivexp);
    }

async function demo(char){

        var databaseURL = ''
        var fileID = 0
        await import("../assets/dicts/hanziData/hanziIndex.js").then( (h)=>{        
            var hanziIndex = [...h.hanzi.index]
            for (let j=0; j<hanziIndex.length; j++){
                if (hanziIndex[j].includes(char)){
                    fileID = j+1
                    break
                }
            }
        })

        if (fileID == 0){
            alert(char+' 字没有找到')
            if (writer != '' ){
                // writer.hideCharacter()
                writer.setCharacter('')
            }
        }
        else{
            databaseURL = "./assets/dicts/hanziData/hanzi-"+String(fileID)+".json"


            var width = document.getElementById('text-input').clientWidth;
            document.getElementById('character-target-div').innerHTML = "";
            writer = await HanziWriter.create('character-target-div', char, {
                charDataLoader: function(char, onComplete) {
                    // fetch("/search/dict/zh/"+char).then(x=>x.json()).then(json => onComplete(json));
                    // fetch("../../../assets/hanzi.json")
                    fetch(databaseURL)
                    .then(x=>x.json())
                    // .then(x => JSON.stringify(x)) // return string
                    // .then(x => {
                    //     alert(x)
                    //     return x
                    // })
                    // .then(x => JSON.parse(x))
                    .then(x => x[char])
                    // .then(x => JSON.stringify(x)) // return string
                    // .then(x => {
                    //     alert(x)
                    //     return x
                    // })
                    // .then(x=> alert(typeof(x)))
                    .then(json => onComplete(json));
                },   
                width: width,
                height: width,
                padding: 5,
                showOutline: true,
                strokeAnimationSpeed: 2,
                delayBetweenStrokes: 400,
            });
            show()
        }
    }

function show(){
        writer.animateCharacter();
    }

async function getchar(){
        const word =document.getElementById('text-input').value;
        var words = "";
        var re= RegExp("^[A-Za-z0-9]+$"); //英文和数字
        var re1=RegExp("^[\u4E00-\u9FA5A-Za-z0-9]+$");// 汉字、英文、数字
        for (let char of word){
            if (re.test(char) || !re1.test(char)){
                // 不是汉字 pass
            }
            else{
                words = words + char;
            }
        }
        if(words == ""){
            // 没有输入任何汉字
        }
        else{
            words = words[0]; //取第一个汉字     
        }
        return words;
    }

function quanjiao(txt) {
        var result = '';
        for (let i in txt){
            if (txt[i] == ","){
                result += "，";
            } else if (txt[i] == "(") {
                result += "（";
            } else if (txt[i] == ")") {
                result += "）";
            } else if (txt[i] == ":") {
                result += "：";
            } else if (txt[i] == ";") {
                result += "；";
            } else if (txt[i] == " ") {
                continue;
            } else {
                result += txt[i];
            }
        }
        return result;
    }

}

// ----------------------------------------------------------------------------------------->

