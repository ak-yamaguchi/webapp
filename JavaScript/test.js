
    const num = 16;

    var winner = Math.floor(Math.random() * num);

    const colorMax = 225;  //色の最大値

    //パネルの色の乱数用
    var red;
    var green;
    var blue;

    var correctColor;           //正解の色

    var inCorrectColor;         //不正解の色

    var isInputDelay = false;   //正解を押してから次を押せるようになるまでの時間

    const diffNum = 20;         //正解の色を生成するときの差異

    var isPlayGame = true;      //デバッグようにとりあえずtrue

    var timeCount = 30;         //ゲームのカウント

    var scoreCount = 0;         //スコアのカウント

    var timeTextContent;        //メイン部分のテキスト挿入部分の取得

    //各セクション
    var sectionTitle;     
    var sectionCountDown;     
    var sectionGameMain;
    var sectionResult;

    var endOverRay = document.querySelector('#gameMain .bg');

    var countDownText = document.querySelector('#countDown .bg p');

    var scoreText = document.querySelector('#result .bg .score');

    var resultText = document.querySelector('#result .bg .resultText');

    const countDownTime = 1100;

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
        setTimeout(InCountDownText, countDownTime, "3");
        setTimeout(InCountDownText, countDownTime * 2, "2");
        setTimeout(InCountDownText, countDownTime * 3, "1");
        setTimeout(InCountDownText, countDownTime * 4, "Start!");
        setTimeout(ToGameMain, countDownTime * 5);
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

        isPlayGame = true;
        timeCount = 30;
        scoreCount = 0;
        CreatePanel();
        CountDown();
    }

    //リザルトを前面に
    function ToResult()
    {
        DeletePanel();
        endOverRay.style.zIndex = -1;
        scoreText.innerText = "スコア：" + scoreCount;
        resultText.innerText = GetResultText();
        
        sectionResult.style.zIndex =3;
        sectionTitle.style.zIndex = 2;
        sectionCountDown.style.zIndex = 1;
        sectionGameMain.style.zIndex = 0;
    }

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
            return "教祖";
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
        winner = Math.floor(Math.random() * num);

        GetRandomColor();    //色の取得

        var parentContent = document.getElementById('panelbox');

        for(let i = 0; i < num; i++)
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
        var divs =  document.querySelectorAll(".box");

        for(let i = 0; i < divs.length; i++)
        {
            divs[i].classList.add('fadein');
        }
    }

    function ClearPanel()
    {
        var divs =  document.querySelectorAll(".box");

        for(let i = 0; i < divs.length; i++)
        {
            divs[i].classList.add('clear');
        }

        setTimeout(DeletePanel, 515);
        setTimeout(CreatePanel, 515);
    }

    function DeletePanel()
    {
        var divs =  document.querySelectorAll(".box");

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
        var category = Math.floor(Math.random() * 3); //rgbどれの数値をいじるか

        switch(category)
        {
            case 0:
                red = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
                green = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
                blue = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
        
                correctColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                inCorrectColor = 'rgb(' + (red + diffNum) + ', ' + green + ', ' + blue + ')';
            break;

            case 1:
                red = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
                green = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
                blue = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
        
                correctColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                inCorrectColor = 'rgb(' + red + ', ' + (green + diffNum) + ', ' + blue + ')';
            break;

            case 2:
                red = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
                green = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
                blue = Math.floor(Math.random() * (colorMax - diffNum) + diffNum);
        
                correctColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                inCorrectColor = 'rgb(' + red + ', ' + green + ', ' + (blue + diffNum) + ')';
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

    