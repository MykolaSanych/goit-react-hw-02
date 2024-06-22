import css from "./Options.module.css"
export default function Options({ updateFeedback, totalFeedback }) {
    return (
        <div className={css.list}>
            <ul onClick={updateFeedback} className={css.list}>
                 <li>
                    <button name ="good">Good</button>
                </li>
                <li>
                     <button name="neutral" >Neutral</button>
                 </li>
                 <li>
                     <button name="bad" >Bad</button>
                </li>
                 {!!totalFeedback &&( <li><button name="reset" >Reset</button></li>)}
        
             </ul>
           
        </div>
    )
}