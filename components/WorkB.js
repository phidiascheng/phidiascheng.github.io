
export { Vocabulary } 

const {  useEffect, useMemo  } = React;

import { loadLessStyle, removeElementById } from './utility.js';





function Vocabulary(){

    const lessStyle = /* css */`
        @font-face {
            font-family: "Courier New";
            font-style: normal;
            font-weight: 100;
            src: url('./assets/fonts/CourierNew.ttf') format('truetype');
        }
        .work_main{
            display: block;
            text-align: center; 
            margin-top: 13px;
            #header{
                display: flex;
                justify-content: left;
                height: 20px;
                align-items: center;
                #headerLabel{
                    text-align: left;
                    width: 5em;
                    font-size: 8.5pt;
                    font-family: 'arial';
                }
            }
            #wordBox {
                display: block;
                height: calc(100vh - 53px - 20px - 5px);
                font-family: 'Times New Roman', Times, serif;
                #word {
                    -webkit-user-select: none;
                    height: calc((100vh - 53px - 20px - 5px)*0.3);
                    font-size: calc((100vh - 20px - 20px - 5px)*0.28);
                    display: flex;
                    justify-content: center;
                    align-items: end;
                    margin-bottom: 3vh;
                    overflow: hidden;
                    white-space: nowrap;
                    #wordText{
                        color: #d62626;
                        position:relative;
                        top: 0em;
                        font-family:  'Times New Roman', Times, serif;
                    }
                    .wordScroll {
                        display: inline-block;
                        animation: wordTextScroll 20s linear infinite;
                    }
                    @keyframes wordTextScroll {
                        0% { transform: translateX(50%); }
                        100% { transform: translateX(-100%); }
                    }
                }
                .exp {
                    -webkit-user-select: none;
                    height: calc((100vh - 53px - 20px - 5px)*0.13);
                    font-size: calc((100vh - 53px - 20px - 5px)*0.12);
                    display: flex;
                    justify-content: left;
                    color: blue;
                    border: solid;
                    border-width: 0.5vh;
                    border-color: white;
                    border-radius: 1vh;
                    margin: 0 1em;
                    @media (max-width: 1200px){
                        margin: 0;
                    }
                    .optionLabel{
                        text-align: center;
                        min-width: 1em;
                        .optLabel{
                            font-family: 'Courier New', "SimSun";
                            position: relative;
                            top: -3vh;
                        }
                    }
                    .optionText{
                        flex-grow: 0;
                        text-align: left;
                        overflow: hidden;
                        white-space: nowrap;
                        .optText{
                            position: relative;
                            top: -2vh;
                            font-family: "SimSun";
                            font-size: calc((100vh - 53px - 20px - 5px)*0.12);
                        }
                        .expScroll {
                            display: inline-block;
                            animation: expTextScroll 20s linear infinite;
                        }
                        @keyframes expTextScroll {
                            0% { transform: translateX(0vw); }
                            100% { transform: translateX(-100%); }
                        }
                    }
                    .optionTextFade{
                        -webkit-mask-image: linear-gradient(90deg, transparent, black 5%);
/*                         mask-image: linear-gradient(90deg, transparent, black 5%); */
                    }
                    .optionMark{
                        font-family: "SimSun";
                        font-size: calc((100vh - 53px - 20px - 5px)*0.16);
                        position: relative;
                        color: red;
                        display: inline-block;
                        text-align: center;
                        width: 0.5em;
                        top: -3.2vh;
                    }
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
            }
        #statistics{
            text-align: left;
            display: none; 
            padding: 0 3vw;
            @media (max-width:  1200px){
                padding: 0;
            }
        }
        #progressBar{
            height:5px; 
            width:90%; 
            background-color: gray;
        }
        }


`;/* css */



    useMemo( () => {
        loadLessStyle (lessStyle, 'stywVocab')
    },[])

    useEffect( () => {
        document.addEventListener("keydown", keydownListerner);
        document.addEventListener("wheel", wheelListerner);
        window.addEventListener("resize", resizeListerner);

        return ( () => {
            removeElementById('stywVocab')
            document.removeEventListener("keydown", keydownListerner);
            document.removeEventListener("wheel", wheelListerner);
            window.removeEventListener("resize", resizeListerner);
        })
    },[]);

    const musicWrong = new Audio('./data/audio/wrong.m4a');
    const musicRight = new Audio('./data/audio/right.m4a');

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
        checkTextOverFlow(chosedAnswer,targ)
        document.getElementById(chosedAnswer).classList.remove('chosed')
        chosedAnswer = targ
        document.getElementById(chosedAnswer).classList.add('chosed')
    }

    /*-----------------------------------------------------------------*/

    function checkTextOverFlow(orig, targ){
        document.getElementById("exp"+orig+"Text").classList = 'optText'
        document.getElementById("optionText"+orig).classList = "optionText"
        let ele = document.getElementById("optionText"+targ)
        if( !document.getElementById("exp"+targ+"Text").classList.contains("expScroll") ){
            if (ele.scrollWidth > ele.clientWidth){
                document.getElementById("exp"+targ+"Text").classList.add("expScroll")
                ele.classList.add("optionTextFade")
            }
        }
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


    function playAudio(type){
        if(type == 'word'){
            const mp3Url = "http://dict.youdao.com/dictvoice?type=0&audio="+words[currentIndex][0];
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = mp3Url;
            audioPlayer.load();
            audioPlayer.play().catch(error => {
                // console.error('播放音频时出错:', error);
            });
        }
        else if (type == 'wrong'){
            // musicWrong.play();
            const audioPlayer = document.getElementById('wrongPlayer');
            audioPlayer.load();
            audioPlayer.play().catch(error => {
                // console.error('播放音频时出错:', error);
            });
        }
        else if (type == 'right'){
            // musicRight.play();
            const audioPlayer = document.getElementById('rightPlayer');
            audioPlayer.load();
            audioPlayer.play().catch(error => {
                // console.error('播放音频时出错:', error);
            });
        }
    }


    function resetState(){

        document.getElementById("statistics").style.display = 'none'
        document.getElementById("wordBox").style.display = 'block'
        document.getElementById("progressBar").style.display = 'block'

        document.getElementById("wordText").classList = ''
        document.getElementById("wordText").innerText = ''
        for ( let i=0; i<4; i++){
            document.getElementById("exp"+i+"Label").innerText = ''
            document.getElementById("exp"+i+"Text").innerText = ''
            document.getElementById("exp"+i+"Mark").innerText = ''
            document.getElementById("optionText"+i).classList = 'optionText'
            document.getElementById(i).classList = 'exp'
        }
    }


    function display(){

        resetState()
        document.getElementById("wordText").innerText = words[currentIndex][0];
        let ele = document.getElementById("word")
        if(ele.scrollWidth > ele.clientWidth){
            document.getElementById("wordText").classList.add("wordScroll")
        }

        let orderArray = [...Array(words.length).keys()]
        orderArray.splice(currentIndex, 1);
        shuffleArray(orderArray)

        let optionsIndices = orderArray.slice(0, optionNumber - 1)
        correctAnswer = Math.floor(Math.random() * optionNumber);
        optionsIndices.splice(correctAnswer, 0, currentIndex)
        chosedAnswer = 0

        for (let i = 0; i < optionNumber; i++){
            document.getElementById("exp"+i+"Label").innerText = options[i]
            document.getElementById("exp"+i+"Text").innerText = words[optionsIndices[i]][1]
        }
        document.getElementById(chosedAnswer).classList.add('chosed')
        document.getElementById("progressBar").style.width = (currentIndex+1)/words.length * 100 + "%"
        playAudio('word')
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
                if ( event.code == "Space" ){
                    startNext()
                }
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

    function resizeListerner(){
        console.log('resized')
        display()
    }



    function optionClick(){
        if( isFileReady ){
            if( !isAnswerChecked ){
                checkAnswer()
            }
            else{
                startNext()
            }
        }
    }

    function optionMouseMove(i){
        if( isFileReady ){
           moveTo(i)
        }
    }


    function checkAnswer(){
        if (chosedAnswer == correctAnswer){
            playAudio('right')
            words[currentIndex][2] = String( +words[currentIndex][2] + 1 )
            words[currentIndex][4] = +(words[currentIndex][4]) + 1
            document.getElementById("exp"+chosedAnswer+"Mark").innerText += "✓"
            document.getElementById(chosedAnswer).classList.add('correct')
        } 
        else {
            playAudio('wrong')
            words[currentIndex][3] = String( +words[currentIndex][3] + 1 )
            words[currentIndex][4] = 0
            document.getElementById("exp"+chosedAnswer+"Mark").innerText = "✗"
            document.getElementById(chosedAnswer).classList.add('wrong')
            document.getElementById(correctAnswer).classList.add('correct')
        }
        isAnswerChecked = true
    }


    /*-----------------------------------------------------------------*/

    function dispStatistics(){

        const currentInd = isAnswerChecked ? currentIndex + 1 : currentIndex

        document.getElementById("wordBox").style.display = 'none'
        document.getElementById("statistics").style.display = 'block'
        document.getElementById("progressBar").style.display = 'none'
        let fontSize = 7
        document.getElementById("statistics").innerHTML = `<span style='font-size: ${fontSize}vh; font-family:"SimSun"'>错误的单词有：</span><br>`
        for( let i = 0; i < currentInd; i++){
            if( words[i][4] == 0 ){
                document.getElementById("statistics").innerHTML += `<span style="font-size: ${fontSize}vh; color: red; font-family:'Times New Roman'">${words[i][0]}、</span>`
            }
        }
        document.getElementById("statistics").innerHTML += `<br><br><br><br><span style='font-size: ${fontSize}vh; font-family:"SimSun"'>正确的单词有：</span><br>`
        for( let i = 0; i < currentInd; i++){
            if( words[i][4] > 0 ){
                document.getElementById("statistics").innerHTML += `<span style="font-size: ${fontSize}vh; color: green;font-family:'Times New Roman'">${words[i][0]}、</span>`
            }
        }
        document.getElementById("statistics").innerHTML += `<br><br><br><br><span style='font-size: ${fontSize}vh; font-family:"SimSun"'>没做的单词有：</span><br>`
        for( let i = currentInd; i < words.length; i++){
            document.getElementById("statistics").innerHTML += `<span style="font-size: 4vh; color: black; font-family:'Times New Roman'">${words[i][0]}、</span>`
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






    const expList = [0,1,2,3].map(i => 
        <div id={i} class="exp" onMouseMove={()=>{optionMouseMove(i)}} onClick={optionClick}>
            <div class="optionLabel">
                <span id={"exp"+i+"Label"} class="optLabel">
                </span>
            </div>
            <div id={"optionText"+i} class="optionText">
                <span id={"exp"+i+"Text"} class="optText">
                </span>
            </div>
            <span id={"exp"+i+"Mark"} class="optionMark">
            </span>
        </div>
    )

    return (
    <div class="card-display">
        <div className="work_main">
            <div id="header">
                <span id="headerLabel">读取词库</span>
                <input type="file" id="fileInput" accept=".txt" onChange={readFile} />
            </div>
            
            <div id="wordBox">
                <div id="word">
                    <span id="wordText"></span>
                </div>

                { expList }
                
                <div><audio id="audioPlayer"></audio></div>
                <div><audio id="wrongPlayer" preload="auto" src="./data/audio/wrong.m4a"></audio></div>
                <div><audio id="rightPlayer" preload="auto" src="./data/audio/right.m4a"></audio></div>
            </div>
            <div id="statistics"></div>
            <div id="progressBar"></div>
        </div>
    </div>    
    )
}