'use script';

    const num = 5;

    var winner = Math.floor(Math.random() * num);

    //パネルの色の乱数用
    var red;
    var green;
    var blue;

    var correctColor;   //正解の色
    var inCorrectColor; //不正解の色

    CreatePanel();

    //パネルの初期配置
    function CreatePanel()
    {
        winner = Math.floor(Math.random() * num);

        GetRandomColor();

        for(let i = 0; i < num; i++)
        {
            const div = document.createElement('div');

            div.classList.add('box');
            
            //ここで色更新
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
                    div.textContent = 'Win';
                    div.classList.add('win');
                    setTimeout(ResetPanel, 1000);
                    div.removeEventListener('click', arguments.callee);
                }
                else
                {
                    div.textContent = 'Lose';
                    div.classList.add('lose');
                    div.removeEventListener('click', arguments.callee);
                }
            });

            document.body.appendChild(div);
        }
    }

    //パネルの初期化
    function InitPanel()
    {
        var divs =  document.querySelectorAll(".box");

        for(let i = 0; i < divs.length; i++)
        {
            divs[i].addEventListener('click', function()
            {
                if(i === winner)
                {
                    divs[i].textContent = 'Win';
                    divs[i].classList.add('win');
                    setTimeout(ResetPanel, 1000);
                    for(let i = 0; i < divs.length; i++)
                    {
                        divs[i].removeEventListener('click', arguments.callee, false);
                    }
                }
                else
                {
                    divs[i].textContent = 'Lose';
                    divs[i].classList.add('lose');
                }
            });
        }
    }

    //正解が押された時のリセット処理
    function ResetPanel()
    {
        winner = Math.floor(Math.random() * num);

        var divs =  document.querySelectorAll(".box");

        for(let i = 0; i < divs.length; i++)
        {
            divs[i].classList.remove('win');
            divs[i].classList.remove('lose');
            divs[i].textContent = "";
        }
        
        ChangeColor();
        InitPanel();
        // window.open("http://www.yahoo.co.jp/", "yahoo");
    }

    function UpdatePanel(i)
    {
        var divs =  document.querySelectorAll(".box");

        if(i === winner)
        {
            divs[i].textContent = 'Win';
            div[i].classList.add('win');
            setTimeout(ResetPanel, 1000);
        }
        else
        {
            div[i].textContent = 'Lose';
            divs[i].classList.add('lose');
        }
    }

    function ChangeColor()
    {
        var divs =  document.querySelectorAll(".box");

        GetRandomColor();

        for(let i = 0; i < num; i++)
        {
            if(i === winner)
            {
                divs[i].style.background = correctColor;
            }
            else
            {
                divs[i].style.background = inCorrectColor;
            }
        }
    }

    function GetRandomColor()
    {
        const flg = Math.random() * 10 < 5 ? true : false
        console.log(flg);

        var category = Math.floor(Math.random() * (3) + 0); //rgbどれの数値をいじるか

        // red = Math.floor(Math.random() * 255);
        red = Math.floor(Math.random() * (225 - 30) + 30);
        green = Math.floor(Math.random() * (225 - 30) + 30);
        blue = Math.floor(Math.random() * (225 - 30) + 30);

        correctColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        inCorrectColor = 'rgb(' + (red + 40) + ', ' + green + ', ' + blue + ')';

        // console.log(correctColor);
        // console.log(inCorrectColor);
    }

    function hoge()
    {
        console.log("aaa");
    }