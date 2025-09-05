

async function playAudio(url) {
  try {
    let audio =document.querySelector("audio");
    audio.src=url;
    await audio.play();
    console.log("Playing:", url);
  } catch (err) {
    alert("Unable to play:", err);
  }
}



// let btn=document.querySelector("button");

// btn.addEventListener("click", ()=>{
//     playAudio();
// })


let url="https://api.dictionaryapi.dev/api/v2/entries/en/";
let inp=document.querySelector("input");
let btn=document.querySelector("button");

inp.addEventListener("input",()=>{
    if (inp.value.trim() !== "") {
      btn.style.opacity = "1";   // Visible
      let p=document.querySelector("p");
      p.innerText="";

      let playbutton=document.querySelector(".play");
      playbutton.style.display="none";

      let h5=document.querySelector(".h5")
      h5.innerText="";

       let phenotic=document.querySelector(".phenotic");
        phenotic.innerText="";

        let phenotics_pera=document.querySelector(".phenotics_pera");
        phenotics_pera.innerText="";

    } else {
      btn.style.opacity = "0.5"; // Faded again if empty
    }
})



async function getmeaning(finalurl){
    try{
        let res= await axios.get(finalurl);
        let meaning= res.data[0].meanings[0].definitions[0].definition;

      
        
        let h5=document.querySelector(".h5")
        h5.innerText="meaning";

        let p=document.querySelector("p");
        p.innerText="";
        p.innerText=meaning;
        p.style.color="black";

        let phenotic=document.querySelector(".phenotic");
        phenotic.innerText="Phonetics";

        let phenotics_pera=document.querySelector(".phenotics_pera");
        phenotics_pera.innerText=res.data[0].phonetics[0].text;
    }
    catch(e){
        let p=document.querySelector("p");
        p.innerText="";
        p.innerText=e;
        p.style.color="red";
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


btn.addEventListener("click", async()=>{


    if(inp.value.trim() === ""){
        let p=document.querySelector("p");
        p.innerText="";
        p.innerText="enter a word first!!";
        p.style.color="red";
    }
    else{
    
    let finalurl=url+inp.value;
    await getmeaning(finalurl);
    
    

    let btn1=document.createElement("button");
    btn1.innerHTML='<i class="fa-solid fa-volume-high"></i>';
    btn1.classList.add("play");
    let mainbox=document.querySelector(".mainbox");
    mainbox.lastElementChild.remove();
    mainbox.appendChild(btn1);

    

    btn1.addEventListener("click",async ()=>{
        let finalurl=url+inp.value;
        let audiourl = await getaudio(finalurl);
        await playAudio(audiourl);
        
    })
}
   
    
 })
