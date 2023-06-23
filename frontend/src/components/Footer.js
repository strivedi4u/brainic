import React from 'react';
import "../assets/css/footer.css";

const Footer = () => {
  const shareText = `Ask Brainic Expert: Discover Real-Time Insights | Explore a Wealth of Knowledge | Unleash Your Creativity with Image Generation | Delight in Humorous Jokes and Captivating Music!

  Examples of questions you can ask Brainic Expert:
  - What is the capital of France?
  - Can you generate an image of a sunset?
  - Play the song "Shape of You" by Ed Sheeran.
  - Tell me a joke.
  - What is the weather forecast for tomorrow in New York City?
  - Who won the Nobel Prize in Physics in 2020?
  - Convert 10 miles to kilometers.
  - What is the square root of 144?
  - How do I make a chocolate cake?
  - Translate "Hello" to French.
  - What is the population of Tokyo?
  - Can you recommend a good movie to watch?
  - Who is the author of "To Kill a Mockingbird"?
  
  Brainic Expert is a smart assistant that can respond to any question you have. Try it now!
  👇👇👇👇👇👇👇👇👇👇👇👇
  https://brainic.azurewebsites.net`;

  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://brainic.azurewebsites.net")}&quote=${encodeURIComponent(shareText)}`;
  const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const whatsappShareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
  const linkedinShareURL = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent("https://brainic.azurewebsites.net")}&title=Brainic%20Expert&summary=${encodeURIComponent(shareText)}`;
  const instagramShareURL = `https://www.instagram.com/?url=${encodeURIComponent("https://brainic.azurewebsites.net")}`;

  return (
    <div className="footer" style={{ position: 'fixed', zIndex: 999, bottom: 0, backgroundColor: 'brown', display: 'inline-block', padding: 0, width: '100%' }}>
      <center>
        <a href={facebookShareURL} target="_blank" rel="noopener noreferrer" className="facebook">
          <i style={{ marginTop: 15 }} className="fa fa-facebook"></i>
        </a>

        <a href={twitterShareURL} target="_blank" rel="noopener noreferrer" className="twitter">
          <i style={{ marginTop: 15 }} className="fa fa-twitter"></i>
        </a>

        <a href={whatsappShareURL} className="whatsapp">
          <i style={{ marginTop: 15 }} className="fa fa-whatsapp"></i>
        </a>
        <a href={linkedinShareURL} target="_blank" rel="noopener noreferrer" className="linkedin">
          <i style={{ marginTop: 15 }} className="fa fa-linkedin"></i>
        </a>
        <a href={instagramShareURL} className="instagram">
          <i style={{ marginTop: 15 }} className="fa fa-instagram"></i>
        </a>

      </center>
    </div>
  );
};

export default Footer;
