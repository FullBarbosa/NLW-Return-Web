import { CloseButton } from "../CloseButton"
import bugImageUrl from '../../assets/bug.svg'
import ideiaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react"
import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep"
import { FeedBackContentStep } from "./Steps/FeedBackContentStep"
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep"

export const feedbackTypes = {
  BUG:{
    title:'Problema',
    image:{
      source: bugImageUrl,
      alt:'Imagem de um inseto'
    }
  },
  IDEA:{
    title:"Idea",
    image:{
      source:ideiaImageUrl,
      alt:'imagem de uma lampada'
    }
  },
  OTHER:{
    title:"Outro",
    image:{
      source:thoughtImageUrl,
      alt:'imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes
  
export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false)

  const handleRestartFeedback = () => {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto"
    >
        {feedbackSent ? (
          <FeedBackSuccessStep
           onFeedbackRestartRequested={handleRestartFeedback}
          />
        ):(
          <>
            {!feedbackType ? (
              <FeedBackTypeStep onFeedBackTypeChanged={setFeedbackType} />
            ): (
              <FeedBackContentStep 
                feedbackType={feedbackType} 
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={()=> setFeedbackSent(true)}
              />
            )}
          </>
        )}
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-2" href="#">Rocketseat</a> 
      </footer>
    </div>
  )
}
