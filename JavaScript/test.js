
    const PANEL_NUM = 16;              //パネルの数

    const COLOR_MAX = 225;             //色の最大値

    const DIFF_COLOR_NUM = 25;         //正解の色を生成するときの差異

    const COUNT_DOWN_TIME = 1100;

    let winner = Math.floor(Math.random() * PANEL_NUM);

    //パネルの色の乱数用
    let red;
    let green;
    let blue;

    let correctColor;           //正解の色

    let inCorrectColor;         //不正解の色

    let isInputDelay = false;   //正解を押してから次を押せるようになるまでの時間

    let isPlayGame = true;      //デバッグようにとりあえずtrue

    let timeCount;              //ゲームのカウント

    let scoreCount = 0;         //スコアのカウント

    let timeTextContent;        //メイン部分のテキスト挿入部分の取得

    //各セクション
    let sectionTitle;     
    let sectionCountDown;     
    let sectionGameMain;
    let sectionResult;

    let endOverRay = document.querySelector('#gameMain .bg');

    let countDownText = document.querySelector('#countDown .bg p');

    let scoreText = document.querySelector('#result .bg .score');

    let resultText = document.querySelector('#result .bg .resultText');

    GetAttachId();

    //要素の取得
    function GetAttachId()
    {
        timeTextContent  = document.getElementById("headerPanel");
        sectionTitle     = document.getElementById("title");
        sectionCountDown = document.getElementById("countDown");
        sectionGameMain  = document.getElementById("gameMain");
        sectionResult    = document.getElementById("result");
    }

    //カウントダウン処理の挙動
    function StartCountDown()
    {
        setTimeout(InCountDownText, COUNT_DOWN_TIME, "3");
        setTimeout(InCountDownText, COUNT_DOWN_TIME * 2, "2");
        setTimeout(InCountDownText, COUNT_DOWN_TIME * 3, "1");
        setTimeout(InCountDownText, COUNT_DOWN_TIME * 4, "Start!");
        setTimeout(ToGameMain, COUNT_DOWN_TIME * 5);
    }

    //カウントダウンの制御
    function InCountDownText(countText)
    {
        countDownText.innerText = countText;
        countDownText.classList.add('textScaleUp');
        countDownText.classList.add('textFadeIn');
        setTimeout(OutCountDownText, 700)
    }
    function OutCountDownText()
    {
        countDownText.classList.remove('textFadeIn');
        countDownText.classList.add('textFadeOut');
        setTimeout(ClearCountText, 300)
    }
    function ClearCountText()
    {
        countDownText.classList.remove('textScaleUp');
        countDownText.classList.remove('textFadeOut');
    }

    //カウントダウンを前面に
    function ToCountDown()
    {
        StartCountDown();
        sectionCountDown.style.zIndex = 3;
        sectionGameMain.style.zIndex = 2;
        sectionResult.style.zIndex = 1;
        sectionTitle.style.zIndex = 0;
    }

    //ゲームメインを前面に
    function ToGameMain()
    {
        sectionGameMain.style.zIndex = 3;
        sectionResult.style.zIndex = 2;
        sectionTitle.style.zIndex = 1;
        sectionCountDown.style.zIndex = 0;

        //ゲームの初期化
        isPlayGame = true;
        timeCount = 30;
        scoreCount = 0;
        CreatePanel();
        CountDown();
    }

    //リザルトを前面に
    function ToResult()
    {
        //リザルトの更新
        DeletePanel();
        endOverRay.style.zIndex = -1;
        scoreText.innerText = "スコア：" + scoreCount;
        resultText.innerText = GetResultText();
        
        sectionResult.style.zIndex =3;
        sectionTitle.style.zIndex = 2;
        sectionCountDown.style.zIndex = 1;
        sectionGameMain.style.zIndex = 0;
    }

    //スコアに応じてリザルトのテキスト変更
    function GetResultText()
    {
        if(scoreCount <= 5)
        {
            return "がんば！";
        }
        else if(scoreCount > 5 && scoreCount <= 10)
        {
            return "いいね";
        }
        else if(scoreCount > 10 && scoreCount <= 15)
        {
            return "なかなかやるね";
        }
        else if(scoreCount > 15 && scoreCount <= 19)
        {
            return "センスある";
        }
        else
        {
            return "教祖の素質ある";
        }
    }

    //タイトルを前面に
    function ToTitle()
    {
        sectionTitle.style.zIndex = 3;
        sectionCountDown.style.zIndex = 2;
        sectionGameMain.style.zIndex = 1;
        sectionResult.style.zIndex = 0;
    }

    //パネルの初期配置
    function CreatePanel()
    {
        winner = Math.floor(Math.random() * PANEL_NUM);

        GetRandomColor();    //色の取得

        let parentContent = document.getElementById('panelbox');

        for(let i = 0; i < PANEL_NUM; i++)
        {
            const div = document.createElement('div');

            div.classList.add('box');
            setTimeout(FadeIn, 15);
            //div.classList.add('fadein');

            if(i === winner)
            {
                div.style.background = correctColor;
            }
            else
            {
                div.style.background = inCorrectColor;
            }

            div.addEventListener('click', function() 
            {
                if(i === winner)
                {
                    div.textContent = '◎';
                    div.classList.add('win');
                    //setTimeout(ResetPanel, 1000);
                    ClearPanel();
                    div.removeEventListener('click', arguments.callee, false);
                    scoreCount++;
                }
                else
                {
                    div.textContent = '✖︎';
                    div.classList.add('lose');
                    //div.removeEventListener('click', arguments.callee);
                }
            });

            //document.body.firstElementChild.appendChild(div);
            parentContent.appendChild(div);
        }
    }

    function FadeIn()
    {
        let divs =  document.querySelectorAll(".box");

        for(let i = 0; i < divs.length; i++)
        {
            divs[i].classList.add('fadein');
        }
    }

    function ClearPanel()
    {
        let divs =  document.querySelectorAll(".box");

        for(let i = 0; i < divs.length; i++)
        {
            divs[i].classList.add('clear');
        }

        setTimeout(DeletePanel, 515);
        setTimeout(CreatePanel, 515);
    }

    function DeletePanel()
    {
        let divs =  document.querySelectorAll(".box");

        for(let i = 0; i < divs.length; i++)
        {
            divs[i].parentNode.removeChild(divs[i]);
        }
    }

    function CountDown()
    {
        if(isPlayGame)
        {
            timeTextContent.innerHTML = "<p id = 'time'>Time<br>" + timeCount.toFixed(1) +
             "</p>" + "<p id='score'>Score<br>" + scoreCount + "</p>";
            timeCount -= 0.1.toFixed(1);
            //console.log(0.1.toFixed(2));
            setTimeout(CountDown, 100);
            if(timeCount < 0.0)
            {
                isPlayGame = false;
                timeCount = 0;
                timeTextContent.innerHTML = "<p id = 'time'>Time<br>" + timeCount.toFixed(1) +
                 "</p>" + "<p id='score'>Score<br>" + scoreCount + "</p>";
                 endOverRay.style.zIndex = 6;
                 setTimeout(ToResult, 2500);
            }
        }
    }

    function GetRandomColor()
    {
        let category = Math.floor(Math.random() * 3); //rgbどれの数値をいじるか

        switch(category)
        {
            case 0:
                red = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
                green = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
                blue = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
        
                correctColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                inCorrectColor = 'rgb(' + (red + DIFF_COLOR_NUM) + ', ' + green + ', ' + blue + ')';
            break;

            case 1:
                red = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
                green = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
                blue = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
        
                correctColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                inCorrectColor = 'rgb(' + red + ', ' + (green + DIFF_COLOR_NUM) + ', ' + blue + ')';
            break;

            case 2:
                red = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
                green = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
                blue = Math.floor(Math.random() * (COLOR_MAX - DIFF_COLOR_NUM) + DIFF_COLOR_NUM);
        
                correctColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                inCorrectColor = 'rgb(' + red + ', ' + green + ', ' + (blue + DIFF_COLOR_NUM) + ')';
            break;
        }
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // //パネルの初期化
    // function InitPanel()
    // {
    //     var divs =  document.querySelectorAll(".box");

    //     for(let i = 0; i < divs.length; i++)
    //     {
    //         divs[i].addEventListener('click', function()
    //         {
    //             if(i === winner)
    //             {
    //                 divs[i].textContent = 'Win';
    //                 divs[i].classList.add('win');
    //                 setTimeout(ResetPanel, 1000);
    //             }
    //             else
    //             {
    //                 divs[i].textContent = 'Lose';
    //                 divs[i].classList.add('lose');
    //                 //divs[i].removeEventListener('click', arguments.callee, false);
    //             }
    //         });
    //     }
    // }

    // //正解が押された時のリセット処理
    // function ResetPanel()
    // {
    //     winner = Math.floor(Math.random() * num);

    //     var divs =  document.querySelectorAll(".box");

    //     for(let i = 0; i < divs.length; i++)
    //     {
    //         divs[i].classList.remove('win');
    //         divs[i].classList.remove('lose');
    //         divs[i].textContent = "";
    //     }
        
    //     ChangeColor();
    //     InitPanel();
    // }

    // function UpdatePanel(i)
    // {
    //     var divs =  document.querySelectorAll(".box");

    //     if(i === winner)
    //     {
    //         divs[i].textContent = 'Win';
    //         div[i].classList.add('win');
    //         setTimeout(ResetPanel, 1000);
    //     }
    //     else
    //     {
    //         div[i].textContent = 'Lose';
    //         divs[i].classList.add('lose');
    //     }
    // }

    // function ChangeColor()
    // {
    //     var divs =  document.querySelectorAll(".box");

    //     GetRandomColor();

    //     for(let i = 0; i < num; i++)
    //     {
    //         if(i === winner)
    //         {
    //             divs[i].style.background = correctColor;
    //         }
    //         else
    //         {
    //             divs[i].style.background = inCorrectColor;
    //         }
    //     }
    // }

    