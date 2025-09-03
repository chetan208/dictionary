function playAudio() {
      let audio = document.getElementById("myAudio");
      audio.play();
    }

// let btn=document.querySelector("button");

// btn.addEventListener("click", ()=>{
//     playAudio();
// })


let url="https://api.dictionaryapi.dev/api/v2/entries/en/";
let inp=document.querySelector("input");

async function getmeaning(finalurl){
    try{
        let res= await axios.get(finalurl);
        return res.data[0].meanings[0].definitions[0].definition;
    }
    catch(e){
        return e;
    }
}

async function getaudio(finalurl){
    try{
        let res= await axios.get(finalurl);
        return res.data[0].phonetics[0].audio;
    }
    catch(e){
        alert("error",e)
        
    }
}

let btn=document.querySelector("button");
btn.addEventListener("click", async()=>{
    let finalurl=url+inp.value;
    let meaning= await getmeaning(finalurl);
    // console.log(meaning);
    let p=document.querySelector("p");
    p.innerText="";
    p.innerText=meaning;

    let btn1=document.createElement("button");
    btn1.innerText="play";
    p.appendChild(btn1);

    let audiourl=await getaudio(finalurl);
    let audio = document.getElementById("myAudio");
    audio.src=audiourl;

    btn1.addEventListener("click",async ()=>{
        playAudio();
    })
   
    
 })
