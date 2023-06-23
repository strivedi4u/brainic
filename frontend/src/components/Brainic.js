// import "./App.css";
import Typed from 'typed.js';
import "../assets/css/brainic.css";
import oneLinerJoke from 'one-liner-joke';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import YouTube from 'react-youtube';
import image from "../assets/images/image.png";
import listenImage from "../assets/images/listen.gif";
import generateImage from "../assets/images/generate.gif";
const Brainic = () => {
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [browserSupportsSpeechRecognition, setBrowserSupportsSpeechRecognition] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [display, setDisplay] = useState(["Hello, I am Branic Expert.", "How can I help you?", "Hello, Please Let me know"]);
  const [status, setStatus] = useState("mic closed");
  const [imageUrl, setImageUrl] = useState();
  const [generatedImage, setGeneratedImage] = useState("");
  const [buttonText, setButtonText] = useState("Start Listening");
  /* ************************** Listening Start******************************/

  var typingRef = useRef("");

  useEffect(() => {
    console.log(status);
    try {
      var typingElement = typingRef.current;
      if (typingElement) {
        var typed = new Typed(typingElement, {
          strings: display,
          typeSpeed: 45,
          backSpeed: 20,
          loop: status !== "generated"
        });

        return () => {
          typed.destroy();
        };
      }
    } catch (error) {
      console.error("Error occurred in the 'useEffect' block:", error);
    }
  }, [display, status]);

  // ...

  useEffect(() => {
    var processImageElement = document.querySelector('.processImage');
    if (processImageElement) {
      processImageElement.style.display = "none";
    }
  }, []);






  const URL = "/";
  useEffect(() => {
    const initializeSpeechRecognition = async () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-IN';
        setRecognition(recognition);
        setBrowserSupportsSpeechRecognition(true);
      } else {
        setBrowserSupportsSpeechRecognition(false);
      }
    };

    initializeSpeechRecognition();
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.onresult = handleResult;
      recognition.onstart = handleMicOpen;
      recognition.onend = handleMicClose;
    }
  }, [recognition]);

  /* ************************** Listening End ******************************/

  /* ********************** Recognition Start ************************** */

  const handleResult = (event) => {
    setStatus("")
    const result = event.results[0][0].transcript;
    // setTranscript(result);
    if (result.includes("Hello") || result.includes("hello") || result.includes("Expert") || result.includes("expert") || result.includes("Brainic") || result.includes("brainic") || result.includes("branic") || result.includes("Branic")) {
      setStatus("searching");
      setButtonText("Thinking Answer");
      const filteredResult = result.replace(/Brainic|brainic|branic|Branic|Hello|hello|Expert|expert/gi, "");
      processQuery(filteredResult)
    } else {
      setButtonText("Start Listening");
    }
  };



  /* ************************ Recognition End ************************** */



  // const getCommand = (query) => {
  //   const formData = {
  //     chats: [
  //       {
  //         role: "user",
  //         content: query + " In this statement, what does the user want? 'Play music,' 'play jokes,' weather information, 'play news,' stop' ,there are only these commands? Please respond with two words: 'commands' if you are very sure then responds correct command otherwise, or choose 'another thing' if you are not sure okay the command data is very critical so please mre more check. Format your response as follows: command:{two word command},"
  //       }
  //     ]
  //   };

  //   axios.post("http://localhost:8000/", formData)
  //     .then((response) => {
  //       const output = response.data.output;
  //       console.log(output.content);
  //       setCommand(output.content);
  //       processQuery(output.content, query)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // console.log(findQuery);

  const generateResponse1 = (query) => {
    query = query + " in very short";
    const formData = {
      chats: [
        {
          role: "user",
          content: query
        }
      ]
    };

    axios.post(URL + "gpt-1", formData)
      .then((response) => {
        var output = response.data.output.content;
        if (output.includes("sorry") || output.includes("as an AI") || output.includes("apologize") || output.includes("text-based model") || output.includes("I apologize") || output.includes("AI model") || output.includes("don't have")) {
          generateResponse2(query)
        } else {
          output = output.replace(/OpenAI|openai|Openai/gi, "Brainic Expert");
          setDisplay([output]);
          setStatus("generated");
          speakResult(output);
        }
      })
      .catch((error) => {
        console.error(error);
        generateResponse2(query);
      });
  };




  const generateResponse2 = (query) => {
    const formData = {
      input: query
    };
    axios.post(URL + "gpt-2", formData)
      .then((response) => {
        let output = response.data.response;
        output = output.replace(/Bard|LLC|support team/gi, "Brainic");
        output = output.replace(/Google AI/gi, "Shashank Trivedi");
        setDisplay([output]);
        setStatus("generated");
        speakResult(output);
        setButtonText("Start Listening")
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const generateImageResponse = (query) => {
    const formData = {
      prompt: query
    };

    axios.post(URL + "generate-image", formData)
      .then((response) => {

        let generatedImage = response.data.data;

        setStatus("generated")
        // // output = output.replaceAll('*', '');
        // setButtonText("Start Listening")
        console.log(generatedImage)
        setDisplay([""]);
        setButtonText("Start Listening")
        // speakResult(output);
        setGeneratedImage(generatedImage)
      })
      .catch((error) => {
        console.error(error);
      });
  };














































  /* ************************* Speak Start ****************************** */
  const speakResult = (text) => {
    const speechSynthesis = window.speechSynthesis;
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Stop the current speech
    }
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    // utterance.onend = () => {
    //   if (recognition && recognition.state !== "listening") {
    //     handleStartListening();
    //   }
    // };
  };

  /* ************************* Speak End ****************************** */





  /* ********************* Application On Off Start*************************/

  const handleStartListening = () => {


    setGeneratedImage("");
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Stop the current speech
    }
    setButtonText("Stop Branic");
    setStatus("listening");
    try {
      if (recognition) {
        setTranscript("");
        recognition.start();
        setIsListening(true);
        setStatus("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStopListening = () => {
    const speechSynthesis = window.speechSynthesis;
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Stop the current speech
    }

    if (recognition) {
      console.log(isListening)
      recognition.stop();
      setIsListening(false);
    }
    window.location.reload();
  };


  const handleMicOpen = () => {
    setDisplay([
      "Listening",
      "Listening.",
      "Listening..",
      "Listening...",
    ]);
    setStatus("listening");
    setIsMicOpen(true);
  };

  const handleMicClose = () => {
    // if(status == "mic closed"){
    //   setStatus("");
    // }
    // console.log("Hellolllllll")

    setIsMicOpen(false);
    // handleStartListening();
  };

  /* ********************* Application On Off End *************************/

  /* *********************** Process Query Start **************************/
  const processQuery = async (query) => {
    setButtonText("Stop Branic");
    if ((query.includes("play") || (query.includes("Play"))) && (query.includes("music") || query.includes("song"))) {
      query = query.replace('play', '');
      setDisplay(["Okay, I am finding the correct music.", "Please wait some time.", "Please wait some time..", "Please wait some time..."]);
      speakResult("Okay, I am finding the correct " + query + ". Please wait some time");
      playSong(query);
    }
    else if (query.includes("stop music")) {
      speakResult("Okay,I am stopping the music.");
      stopMusic();
    }
    else if (query.includes("joke")) {
      speakResult("Okay,I am finding the interesting joke.");
      getJoke();
    }
    else if (query.includes("generate") || query.includes("image") || query.includes("photo") || query.includes("picture")) {
      setDisplay(["Okay, I am generating the Image.", "Please wait some time.", "Please wait some time..", "Please wait some time..."]);
      speakResult("Okay,I am generating a image. Please wait some time");
      query = query.replace(/generate|Generate|image|Image|photo|Photo|picture|picture/gi, "");
      generateImageResponse(query);
    }
    else {
      setDisplay(["Okay, I am finding the correct answer.", "Please wait some time.", "Please wait some time..", "Please wait some time..."]);;
      speakResult(" I am finding the correct answer please wait some time")
      generateResponse1(query)
    }
    setTranscript(""); // Reset the transcript to null
  };
  /* *********************** Process Query End *************************** */

  /* **************************** Jokes Start **************************** */
  const getJoke = () => {
    const joke = oneLinerJoke.getRandomJoke().body;
    console.log(joke)
    setButtonText("Start Listening")
    setStatus("generated");
    setDisplay([joke]);
    speakResult(joke);


  };
  /* **************************** Jokes End ******************************* */

  /* *********************** Song Player Start **************************** */
  const playSong = (songName) => {
    const searchSong = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              q: songName + ' audio',
              part: 'snippet',
              key: 'AIzaSyAXxhiLDukJ-h5bcuSdxWhw7LEMJbm_BdU',
              type: 'video',
              maxResults: 1,
            },
          }
        );

        if (response.data.items.length > 0) {
          const videoId = response.data.items[0].id.videoId;
          console.log("video " + videoId)
          setVideoId(videoId);
          setIsMusicPlaying(true);
          setDisplay(["Music Singing.", "Music Singing..", "Music Singing...", "Music Singing....", "Music Singing.....",])
        }
      } catch (error) {
        console.error('Error searching for the song:', error);
      }
    };

    if (songName) {
      searchSong();
    }
  };

  const stopMusic = () => {
    setButtonText("Start Listening")
    setStatus("");
    setIsMusicPlaying(false);
    setVideoId('');
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };
  /* *********************** Song Player End **************************** */




  useEffect(() => {
    const contentElement = document.querySelector('.content');
    // const preElement = document.querySelector('pre');
    // const previousMargin = contentElement.style.margin;
    if (status === "generated") {
      setImageUrl("");
      document.querySelector('.processImage').style.display = "none";
      document.querySelector('.content').style.transform = "none";

      document.querySelector('.content').style.margin = "10px";
      contentElement.style.textAlign = "left";

    }
    else if (isMicOpen) {
      document.querySelector('.processImage').style.display = "block";
      if(document.querySelector('.content').style.transform == "none"){
        if(window.innerWidth <= 768){
          document.querySelector('.content').style.marginTop = "45%";
        }
        else{
          document.querySelector('.content').style.marginTop = "15%";
        }
        
      }
      // document.querySelector('.content').style.transform = "block";
      // contentElement.style.margin = previousMargin;
      contentElement.style.textAlign = "center";
      setImageUrl(listenImage);
    }
    else if (isMicOpen == false && status == "listening") {
      document.querySelector('.processImage').style.display = "block";
      if(document.querySelector('.content').style.transform == "none"){
        if(window.innerWidth <= 768){
          document.querySelector('.content').style.marginTop = "45%";
        }
        else{
          document.querySelector('.content').style.marginTop = "15%";
        }
      }
      // document.querySelector('.content').style.transform = "block";
      contentElement.style.textAlign = "center";
      // contentElement.style.margin = previousMargin;
      setDisplay(["Hello, I am Branic Expert.", "How can I help you?", "Hello, Please Let me know"])
      setButtonText("Start Listening");
      setImageUrl(image);
    }
    else if (status === "searching") {
      document.querySelector('.processImage').style.display = "block";
      if(document.querySelector('.content').style.transform == "none"){
        if(window.innerWidth <= 768){
          document.querySelector('.content').style.marginTop = "45%";
        }
        else{
          document.querySelector('.content').style.marginTop = "15%";
        }
      }
      // document.querySelector('.content').style.transform = "block";
      contentElement.style.textAlign = "center";
      // contentElement.style.margin = previousMargin;
      setImageUrl(generateImage);
    }
    else if (status === 'mic closed') {
      document.querySelector('.processImage').style.display = "block";
      if(document.querySelector('.content').style.transform == "none"){
        if(window.innerWidth <= 768){
          document.querySelector('.content').style.marginTop = "45%";
        }
        else{
          document.querySelector('.content').style.marginTop = "15%";
        }
      }
      // document.querySelector('.content').style.transform = "block";
      contentElement.style.textAlign = "center";
      // contentElement.style.margin = previousMargin;
      setDisplay(["Hello, I am Branic Expert.", "How can I help you?", "Hello, Please Let me know"])
      setImageUrl(image);
    }
    else {
      document.querySelector('.processImage').style.display = "block";
      if(document.querySelector('.content').style.transform == "none"){
        if(window.innerWidth <= 768){
          document.querySelector('.content').style.marginTop = "45%";
        }
        else{
          document.querySelector('.content').style.marginTop = "15%";
        }
      }
      // document.querySelector('.content').style.transform = "block";
      // contentElement.style.margin = previousMargin;
      setDisplay(["Hello, I am Branic Expert.", "How can I help you?", "Hello, Please Let me know"])
      contentElement.style.textAlign = "center";
      setImageUrl(image);
    }
  }, [status, isMicOpen]);




  return (
    <> <center>
      <div className="container">
        {/* <h2>Brainic Expert Assistant</h2>
        <br />
        <p></p> */}<br></br><br></br>
        {generatedImage != "" ? (<div className="content" >
          <img className="processImage" src={imageUrl} />
          {/* <pre style={{ whiteSpace: "pre-wrap", display: "inline", textAlign: "center", position: "relative" }} ref={typingRef}></pre> */}
          <img style={{ width: "100%" }} src={generatedImage} />
        </div>
        ) : (<div className="content">
          <img className="processImage" src={imageUrl} />
          {/* {transcript} */}
          {/* <div ref={typingRef}></div> */}
          <pre style={{ whiteSpace: "pre-wrap", display: "inline", position: "relative" }} ref={typingRef}
          // dangerouslySetInnerHTML={{ __html: display }}
          >
          </pre>
        </div>)}
        {/* <div className="mic-status">
          Microphone Status: {isMicOpen ? "Open" : "Closed"}
        </div> */}

        <div className="btn-style">
          {buttonText == "Stop Branic" ? (
            <button style={{backgroundColor:"tomato"}} onClick={handleStopListening}>{buttonText}</button>
          ) : (
            <button style={{backgroundColor:"#2ac9a4"}} onClick={handleStartListening}>{buttonText}</button>
          )}
          <br></br><br></br><br></br>
          {isMusicPlaying && videoId && <YouTube videoId={videoId} opts={opts} />}
        </div>
        <br></br><br></br>


      </div>  </center>


    </>
  );
};

export default Brainic;
