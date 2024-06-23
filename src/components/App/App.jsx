import { useState, useEffect} from "react"
import Description from "../Descripton/Description"
import Options from "../Options/Options"
import Feedback from "../Feedback/Feedback"
import Notification from "../Notification/Notification"
import css from "./App.module.css"


export default function App() {
  const [feedback, feedbackSet] = useState(() => {
    const savedFeedback = window.localStorage.getItem("saved-feedback");  
    if (savedFeedback !== null) {
      const objectFeedback = JSON.parse(savedFeedback);
      const { good, neutral, bad } = objectFeedback.feedback;
      return (
        {
          good,
          neutral,
          bad
        })
        
    }
    else {
      return {
        good: 0,
        neutral: 0,
        bad: 0
      };
    }
  })


  useEffect(() => {
    window.localStorage.setItem("saved-feedback", JSON.stringify({feedback}) );
  }, [feedback]);

 
  const updateFeedback = (feedbackType) => {
    console.log(feedbackType);
    feedbackSet({
      
      ...feedback,
      [feedbackType]: feedback[feedbackType]+1,
      }
      )
    };

  
  
  const feedbackGood = () => {
    updateFeedback("good");
  };
  const feedbackNeutral = () => {
    updateFeedback("neutral");
  };
  const feedbackBad = () => {
    updateFeedback("bad");
  };
  const reset = () => {
    feedbackSet({
      ...feedback,
      good: 0,
      neutral: 0,
      bad: 0,
    }
    )
  };



  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback = Math.round((good / totalFeedback) * 100);


  return (
    <div className={css.box}>
      <Description />
      <Options feedbackGood = {feedbackGood} feedbackNeutral = {feedbackNeutral} feedbackBad = {feedbackBad} reset = {reset} totalFeedback={ totalFeedback} />
      {(totalFeedback) ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={ positiveFeedback} />:<Notification/> }
    </div>
  
)
}