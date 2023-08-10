import Sidebar from "../components/Sidebar";

import '../index.css';
import Tweet from "../components/Tweet";



const tweetsArray = [
  {
    user: {
      name: "Joshua Pony",
      image:
      "https://i.pinimg.com/736x/45/12/ff/4512ffe05188d18987e5edaa74fc6106--funny-horse-pictures-funny-horses.jpg",
      handle: "The horse guy",
    },
    timestamp: "1h ago",
    message:
      
      "Cheering for the Olympics is like trying to ride a horse: lots of anticipation not to fall off the emotional saddle on the first lap! 🐎🏅 #Olympics2023 #GoTeam",
  },
  {
    user: {
      name: "Mat Elons ",
      image:
        "https://wallpapers.com/images/hd/elon-musk-tesla-in-space-meme-xyp1t4unfxzslmo9.jpg",
      handle: "The Tesla guy",
    },
    timestamp: "2h ago",
    message:
      "When the car seat and the Tesla steering wheel get into an argument about who's in more control: 🤖💺🚗 #AIvsSafety",
  },
  {
    user: {
      name: "Eric's background ",
      image:
      "../images/eric.png",
      handle: "The background thief",
    },
    timestamp: "3h ago",
    message:
"This guy is so skilled at hijacking Zoom backgrounds, he's getting ready to 'steal' some amazing moments from the Olympics! 🕵️‍♂️📸🏅 #ZoomBanditGoesToOlympics",
  },
  {
    user: {
      name: "Caroline Fabri  ",
      image:
      "../images/carol.png",
      handle: "judoka",
    },
    timestamp: "1h ago",
    message:
      "Absolutely thrilled to dive into the excitement of the Olympics! 🏅🎉 Can't wait to cheer for our athletes and witness incredible moments of triumph! #Olympics2023 #GoTeam",
  },
  {
    user: {
      name: "Priscilla Riese",
      image:
        "../images/pri.png",
      handle: "Travel lover",
    },
    timestamp: "2h ago",
    message:
      "The anticipation is through the roof! The Olympics are finally here, and I'm ready to celebrate the dedication and talent of athletes from around the world. 🌍🏆 Get ready for intense emotions! #GoTeam #OlympicsFever",
  },
  {
    user: {
      name: "Brain Adamns",
      image:
      "../images/brian.png",
      handle: "Corinthiano",
    },
    timestamp: "3h ago",
    message:
"🎉 It's time to shine, athletes! Watching the Olympics is an absolute feast of inspiration and passion for sports. Let's cheer together and root for epic performances that will leave us breathless! 🤩🏅 #LiveTheOlympics #PureEmotion",
  },
];

const Community = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="tweets-container">
        <h1>Welcome to the Olympics Enthusiast Community!</h1>
        <p>Join fellow fans as we cheer on our favorite athletes and celebrate the spirit of the Olympics. <br></br>Let's share the excitement and passion together! 🏅🎉</p>
        {tweetsArray.map((tweet, index) => (
          <Tweet key={index} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Community;