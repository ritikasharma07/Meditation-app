const app = ()=> {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //sounds
    const sounds= document.querySelectorAll(".sound-picker button");
    //time display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
   
    //get the length of outline
    const outlineLength = outline.getTotalLength();

    //Duration
    const timeselect = document.querySelectorAll(".time-select button");
    let fakeduration = 600;

    //outline.style.strokeDasharray=100;
    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset=outlineLength;

    // selecting diff. sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function(){
            song.src= this.getAttribute("data-sound");
            video.src= this.getAttribute("data-video");
            checkPlaying(song);
        })
    })

    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    //selecting diff.  time durations
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
            fakeduration= this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeduration / 60)}:${Math.floor(fakeduration % 60
                )}`;
        });
    });

    //function to stop and play sounds
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }
        else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };
    //animating circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeduration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes =  Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime /fakeduration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // animating text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeduration){
            song.pause();
            song.currentTime = 0;
            play.src= "./svg/play.svg";
            video.pause();
        }
    };
};
app();


