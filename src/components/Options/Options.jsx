import css from "./Options.module.css"
export default function Options({feedbackGood, feedbackNeutral, feedbackBad, reset, totalFeedback }) {
    return (
        
            <ul  className={css.list}>
                 <li>
                    <button onClick={feedbackGood}  >Good</button>
                </li>
                <li>
                     <button onClick={feedbackNeutral}  >Neutral</button>
                 </li>
                 <li>
                     <button onClick={feedbackBad} >Bad</button>
                </li>
                 {!!totalFeedback &&( <li><button onClick={reset} >Reset</button></li>)}
        
             </ul>
           
        
    )
}