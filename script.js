
const start = document.getElementById('start')
const stBtn = document.getElementById('start-btn')
const container = document.getElementById('container')
const quenum = document.getElementById('quenum')
const quest = document.getElementById('quest')
let optlist = document.getElementsByClassName('opt')
const nexBtn = document.getElementById('next')
const score = document.getElementById('score')
const optDiv = document.getElementById('optlist')

// variables

var currQue = 0;
var QueBank;


// Initialisation
container.style.display = 'none';
score.style.display = 'none';



//quiz start



async function startGame(){
    console.log('game started')
  
    start.innerHTML = `<span class="loader"></span>`

    QueBank = await fetch('https://opentdb.com/api.php?amount=20')
    .then(resp=>{return resp.json()})
    .then(msg=> {return msg.results})
    .catch(()=>{alert('Some error Occured!!')})
    currScore = 0;
    
    score.style.display = 'flex';
    start.style.display = 'none';
    score.innerHTML = `SCORE  ${currScore}/20`;
    takeQuiz(currQue)
}

stBtn.addEventListener('click',()=>{ startGame()
})


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
   
       
        var j = Math.floor(Math.random() * (i + 1));
                   
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}
function createChoices(options)
{
    options.forEach((ele)=>{
        let op = document.createElement('p')
        op.classList.add('opt')
        op.innerHTML = ele
        optDiv.appendChild(op)
        
    })
}
function takeQuiz(currQue)
{

    nexBtn.disabled = true;
    container.style.display = 'flex';
    quenum.innerHTML = currQue+1;
    quest.innerHTML = QueBank[currQue].question;
    options = shuffleArray([...QueBank[currQue].incorrect_answers,QueBank[currQue].correct_answer])
    let currScore = Number(score.innerHTML.split(' ')[1].split('/')[0])
    createChoices(options)
    console.log(options)
    Array.from(optlist).forEach((ele,index)=>{
        
        ele.style.display = 'block'
        ele.innerHTML = options[index]
        ele.classList.remove('right')
        ele.classList.remove('wrong')
        ele.addEventListener('click',()=>{
            nexBtn.disabled = false;
            if(isAnswer(ele.innerHTML))
            {
                
                ele.classList.add('right')
                currScore += 1;
                score.innerHTML = `SCORE ${currScore}/20`
            }
            else{

                ele.classList.add('wrong')
            }
            disableOpt(ele,optlist)
  
        })
        endgame(currScore)
    })
    
    console.log(container)
    
}

function isAnswer(option)
{
    if(option == QueBank[currQue].correct_answer ){
        return true
    }
    return false;
}


function disableOpt(curr,optlist)
{
    Array.from(optlist).forEach((ele)=>{
        if(ele.innerHTML !== curr.innerHTML )
        {
            ele.style.display = 'none'
           
       }
       if(ele.innerHTML === QueBank[currQue].correct_answer ){ele.style.display = 'block'; ele.classList.add('right')} 
    })
   
}

nexBtn.addEventListener('click',()=>{
    optDiv.innerHTML = [];
    currQue= currQue+1
    takeQuiz(currQue)
    
})



function endgame(currScore){

    
    
    let sts = '';
    let color = ''
    if(currScore<=6){sts = 'Better luck next time';color = 'red'}
    else if(currScore<=14){sts = 'Average';color  = '#0c8fec'}
    else{sts = 'Best🎉';color = '#0cec22'}
    if(currQue ===19)
    {
        score.style.display = 'none'

        container.innerHTML = '';
        const head = document.createElement('h1')
        head.innerHTML = 'SCORE'

        const marks  = document.createElement('p')
        marks.id = 'marks'
        marks.innerHTML = `${currScore}/20`

        const status = document.createElement('p')
        status.id = 'status'
        status.innerHTML = sts
        status.style.color = color

        container.appendChild(head);
        container.appendChild(marks);
        container.appendChild(status);
        // container.innerHTML = `
        // <h1>SCORE</h1>
        // <p id="marks">${currScore}/20</p>
        // <p id="status" style = "{color:${color};}">${sts}</p>`
    }
}

