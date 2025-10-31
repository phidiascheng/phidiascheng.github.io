
export { Vocabulary } 

const {  useEffect, useMemo  } = React;

import { loadLessStyle, removeElementById } from './utility.js';





function Vocabulary(){

    const lessStyle = /* css */`
        .work_main{
            max-width: 100%;
            text-align: center; 
        }
/*         @media screen and (max-width:840px) {
            .work_main .pdfbox {width: 95%; aspect-ratio: 3/2.2;}
        }
        @media screen and (min-width:840px) {
            .work_main .pdfbox {width: 800px; aspect-ratio: 3/2.2;}
        }  */
        @font-face {
            font-family: "Courier New";
            font-style: normal;
            font-weight: 100;
            src: url('./assets/fonts/CourierNew.ttf') format('truetype');
        }

        #header{
            display: flex;
            justify-content: left;
            height: 20px;
            align-items: center;
        }

        #wordBox {
            display: flex;
            justify-content: center;
            align-items: start;
            height: calc(100vh - 53px - 20px - 5px);
            font-family: 'Times New Roman', Times, serif;
        }
        #word {
            -webkit-user-select: none;
            height: calc((100vh - 53px - 20px - 5px)*0.3);
            font-size: calc((100vh - 20px - 20px - 5px)*0.28);
            display: flex;
            justify-content: center;
            align-items: end;
            color: #d62626;
            font-family:  'Times New Roman', Times, serif;
            margin-bottom: 3vh;
        }
        .exp {
            -webkit-user-select: none;
            height: calc((100vh - 53px - 20px - 5px)*0.13);
            font-size: calc((100vh - 53px - 20px - 5px)*0.12);
            display: flex;
            justify-content: left;
            align-items: center;
            color: blue;
            border: solid;
            border-width: 0.5vh;
            border-color: white;
            border-radius: 1vh;
        }
        .chosed{
            background-color: rgb(212, 223, 183);
            border-color: red;
        }
        .correct{
            color: red;
            border-color: red;
            background-color: antiquewhite;
        }
        .wrong{
            color: black;
        }
        .optionLabel{
            font-family: 'Courier New', "SimSun";
            position: relative;
            top: 0.3vh;
            width: 1em;
        }
        .optionText{
            font-family: "SimSun";
            position: relative;
            top: 0.2vh;
        }
        #progressBar{
            height:5px; 
            width:90%; 
            background-color: gray;
        }
        #statistics{
            text-align: left;
            display: none; 
            width: 80%;
        }
    `;/* css */



    useMemo( () => {
        loadLessStyle (lessStyle, 'stywVocab')
    },[])

    useEffect( () => {
        document.addEventListener("keydown", keydownListerner);
        document.addEventListener("wheel", wheelListerner);

        return ( () => {
            removeElementById('stywVocab')
            document.removeEventListener("keydown", keydownListerner);
            document.removeEventListener("wheel", wheelListerner);
        })
    },[]);


    /* -------------------------------- */

    let words = [];
    let currentIndex = 0;
    let isFileReady = false;
    let correctAnswer = 0;
    let chosedAnswer = 0;
    let optionNumber = 4
    let isAnswerChecked = false

    const options = ['A','B', 'C', 'D']
    let fileName = ''



    function readFile(){
        const file = event.target.files[0];
        fileName = file.name.split(/[\s,_.-]+/)[0]
        if (file && file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                const rows = content.split('\n').filter(row => row.trim() !== '');
                words = rows.map(row => {
                    const items = row.split("\t").map(str => str.trim());
                    items[2] = Number(items[2]);
                    items[3] = Number(items[3]);
                    return items
                });

                words.sort((a, b) => a[2] - b[2]);
                isFileReady = true;
                currentIndex = 0;

                document.getElementById("statistics").style.display = 'none'
                document.getElementById("mainBoard").style.display = 'block'
                display()
            };
            reader.readAsText(file);
        } else {
            alert("Please select a valid .txt file.");
        }
    }


    function shuffleArray(arr) {
        arr.sort(function (a, b) {
            return Math.random() - 0.5;
        });
    }

    /*-----------------------------------------------------------------*/

    function moveTo(targ){
        document.getElementById(chosedAnswer).classList.remove('chosed')
        chosedAnswer = targ
        document.getElementById(chosedAnswer).classList.add('chosed')
    }

    /*-----------------------------------------------------------------*/

    function startNext(){
        if( currentIndex < words.length - 1 ){
            currentIndex += 1
            isAnswerChecked = false
            display()
        }
        else {
            dispStatistics()
            save()
        }
    }


    function playAudio(){
        const mp3Url = "http://dict.youdao.com/dictvoice?type=0&audio="+words[currentIndex][0];
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = mp3Url;
        audioPlayer.load();
        audioPlayer.play().catch(error => {
            // console.error('播放音频时出错:', error);
        });
    }



    function display(){
        document.getElementById("word").textContent = words[currentIndex][0];
        let orderArray = [...Array(words.length).keys()]
        orderArray.splice(currentIndex, 1);
        shuffleArray(orderArray)

        let optionsIndices = orderArray.slice(0, optionNumber - 1)
        correctAnswer = Math.floor(Math.random() * optionNumber);
        optionsIndices.splice(correctAnswer, 0, currentIndex)
        chosedAnswer = 0

        for (let i = 0; i < optionNumber; i++){
            document.getElementById(i).classList = 'exp'
            document.getElementById(i).innerHTML = `<span class="optionLabel">${options[i]}</span>`+`<span class="optionText">${words[optionsIndices[i]][1]}</span>`;
        }
        document.getElementById(chosedAnswer).classList.add('chosed')
        document.getElementById("progressBar").style.width = (currentIndex+1)/words.length * 100 + "%"
        playAudio()
    }


    function keydownListerner(event){
        if ( isFileReady ){
            if( !isAnswerChecked ){
                if ( event.code == "Space" ) {
                    checkAnswer()
                }
                else if ( event.code == 'ArrowUp' ){
                    if( chosedAnswer > 0){
                        moveTo( chosedAnswer - 1 )
                    }
                }
                else if ( event.code == 'ArrowDown' ){
                    if( chosedAnswer < optionNumber - 1){
                        moveTo( +chosedAnswer + 1 )
                    }
                }
            }
            else {
                if ( event.code == "Space" )
                    startNext()
            }

            if ( event.altKey && event.code == 'KeyS'){
                dispStatistics()
                save()
            }
        }
    }

    function wheelListerner(event){
        if (isFileReady){
            if (event.deltaY > 0){
                if( chosedAnswer > 0){
                    moveTo( chosedAnswer - 1 )
                }
            }
            else{
                if( chosedAnswer < optionNumber - 1){
                    moveTo( +chosedAnswer + 1 )
                }
            }
        }
    }

    function optionClick(){
        if( isFileReady ){
            if( !isAnswerChecked )
                checkAnswer()
            else
                startNext()
        }
    }

    function optionMouseMove(i){
        if( isFileReady ){
           moveTo(i)
        }
    }


    function checkAnswer(){
        if (chosedAnswer == correctAnswer){
            words[currentIndex][2] = String( +words[currentIndex][2] + 1 )
            words[currentIndex][4] += 1
            document.getElementById(chosedAnswer).innerHTML += `<span style="color: red">✓</span>`
            document.getElementById(chosedAnswer).classList.add('correct')
        } 
        else {
            words[currentIndex][3] = String( +words[currentIndex][3] + 1 )
            words[currentIndex][4] = 0
            document.getElementById(chosedAnswer).innerHTML += `<span style="color: red">✗</span>`
            document.getElementById(chosedAnswer).classList.add('wrong')
            document.getElementById(correctAnswer).classList.add('correct')
        }
        isAnswerChecked = true
    }


    /*-----------------------------------------------------------------*/

    function dispStatistics(){
        document.getElementById("word").innerHTML = '';
        for (let i = 0; i < optionNumber; i++ ){
            document.getElementById(i).textContent = '';
            document.getElementById(i).classList = 'exp';
        }

        const currentInd = isAnswerChecked ? currentIndex + 1 : currentIndex

        document.getElementById("mainBoard").style.display = 'none'
        document.getElementById("statistics").style.display = 'block'
        let fontSize = 7
        document.getElementById("statistics").innerHTML = `<span style='font-size: ${fontSize}vh; font-family:"SimSun"'>错误的单词有：</span><br>`
        for( let i = 0; i < currentInd; i++){
            if( words[i][4] == 0 )
                document.getElementById("statistics").innerHTML += `<span style="font-size: ${fontSize}vh; color: red; font-family:'Times New Roman'">${words[i][0]}、</span>`
            if (i % 5 == 4)
                document.getElementById("statistics").innerHTML += '<br>'
        }
        document.getElementById("statistics").innerHTML += `<br><br><br><br><span style='font-size: ${fontSize}vh; font-family:"SimSun"'>正确的单词有：</span><br>`
        for( let i = 0; i < currentInd; i++){
            if( words[i][4] == 1 )
                document.getElementById("statistics").innerHTML += `<span style="font-size: ${fontSize}vh; color: green;font-family:'Times New Roman'">${words[i][0]}、</span>`
            if (i % 5 == 4)
                document.getElementById("statistics").innerHTML += '<br>'
        }
        document.getElementById("statistics").innerHTML += `<br><br><br><br><span style='font-size: ${fontSize}vh; font-family:"SimSun"'>没做的单词有：</span><br>`
        console.log(currentIndex)
        console.log(words.length)
        for( let i = currentInd; i < words.length; i++){
            console.log(i)
            document.getElementById("statistics").innerHTML += `<span style="font-size: 4vh; color: black; font-family:'Times New Roman'">${words[i][0]}、</span>`
            if (i % 5 == 4)
                document.getElementById("statistics").innerHTML += '<br>'
        }
    }

    /*-----------------------------------------------------------------*/

    function save(){

        const now = new Date();
        const year = now.getFullYear().toString().slice(-2); 
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const day = String(now.getDate()).padStart(2, '0');      
        const hours = String(now.getHours()).padStart(2, '0'); 
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const arrayString = words.map(row => row.join("\t ")).join("\n");
        const blob = new Blob([arrayString], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}_${month}${day}.${hours}${minutes}.txt`;
        link.click();

        document.getElementById('fileInput').value = '';
        isFileReady = false
    }


    return (
    <div class="card-display">

        <a>
            <h2 className="card-title"></h2>
        </a>
        <div className="work_main">

            <div id="header">
                <span style={{fontSize: "8.5pt", fontFamily: "arial"}}>读取词库&nbsp;&nbsp;</span>
                <input type="file" id="fileInput" accept=".txt" onChange={readFile} />
            </div>
            
            <div id="wordBox">
                <div id="mainBoard" style={{width: "80%"}} >
                    <div id="word"> </div>
                    <div id="0" class="exp" onMouseMove={()=> {optionMouseMove(0)}} onClick={optionClick}> </div>
                    <div id="1" class="exp" onMouseMove={()=> {optionMouseMove(1)}} onClick={optionClick}> </div>
                    <div id="2" class="exp" onMouseMove={()=> {optionMouseMove(2)}} onClick={optionClick}> </div>
                    <div id="3" class="exp" onMouseMove={()=> {optionMouseMove(3)}} onClick={optionClick}> </div>
                </div>
                <div><audio id="audioPlayer"></audio></div>
                <div id="statistics"></div>
            </div>
            <div id="progressBar"></div>


        </div>

    </div>    
    )
}