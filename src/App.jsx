import { useState, useEffect } from 'react'
import Description from './components/description/Description.jsx'
import Options from './components/options/Options.jsx'
import Feedback from './components/feedback/Feedback.jsx'
import Notification from './components/notification/Notification.jsx'
import './App.css'

function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('feedbaack-idx');
    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback)
    }
    return {
	good: 0,
	neutral: 0,
	bad: 0
  }
  }
    
  )
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
   if (feedbackType == "reset") {
      setFeedback({ good: 0, neutral: 0, bad: 0 });
      
      return;
    } 
 setFeedback((feedback) => ({
   ...feedback,
   
      [feedbackType]: feedback[feedbackType] + 1,
 }));
    
  }
  useEffect(() => {
    localStorage.setItem('feedbaack-idx', JSON.stringify(feedback))
  }, [feedback])

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={ totalFeedback} />
      {totalFeedback > 0 ? <Feedback feedback={feedback} positiveFeedback={positiveFeedback } totalFeedback={ totalFeedback}/> : <Notification/>}
    </>
  )
}

export default App
