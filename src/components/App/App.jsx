import { useState, useEffect} from "react"
import Description from "../Descripton/Description"
import Options from "../Options/Options"
import Feedback from "../Feedback/Feedback"
import Notification from "../Notification/Notification"
import css from "./App.module.css"


export default function App() {
  const [feedback, feedbackSet] = useState(() => {
    // Зчитуємо значення за ключем
    const savedFeedback =JSON.parse( window.localStorage.getItem("saved-feedback"));

    // Якщо там щось є, повертаємо це 
    // значення як початкове значення стану
    const { good, neutral, bad }=savedFeedback.feedback;
    
    if (good||neutral||bad) {
      return(
        {
          good,
          neutral,
          bad
        })
        
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0
    };
  })


  useEffect(() => {
    window.localStorage.setItem("saved-feedback", JSON.stringify({feedback}) );
  }, [feedback]);

 
  const updateFeedback = feedbackType => {
    const type = feedbackType.target.getAttribute('name');
    if (type === "reset") {
      feedbackSet({
        ...feedback,
          good: 0,
          neutral: 0,
          bad:0,
          }
        )
    }
    else {
      feedbackSet({
     
        ...feedback,
        [type]: feedback[type] + 1,
      }
      )
    };
  };


  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback = Math.round((good / totalFeedback) * 100);


  return (
    <div className={css.box}>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={ totalFeedback} />
      {(totalFeedback) ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={ positiveFeedback} />:<Notification/> }
    </div>
  
)
}