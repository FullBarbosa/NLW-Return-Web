import { ArrowLeft, Camera } from 'phosphor-react'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from '..'
import { CloseButton } from '../../CloseButton'
import { ScreenshotButton } from '../ScreenshotButton';

interface FeedBackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: ()=> void;
}

export const FeedBackContentStep = ({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedBackContentStepProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  const feedBackTypeInfo = feedbackTypes[feedbackType];

  const handleSubmitFeedback = (event:FormEvent) => {
    event.preventDefault()
    console.log(({
      screenshot,
      comment
    }))
    onFeedbackSent()
  }

  return (
    <>
    <header>
      <button 
        className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        onClick={onFeedbackRestartRequested}
        >
        <ArrowLeft weight="bold" className="w-4 h-4"/>
      </button>
      <span className="text-xl leading-6 flex items-center gap-2">
        <img
          src={feedBackTypeInfo.image.source} 
          alt={feedBackTypeInfo.image.alt}
          className="w-6 h-6"
        />
        {feedBackTypeInfo.title}
      </span>
      <CloseButton/>
    </header>
    
    <form className="my-4 w-full" onSubmit={(event)=>handleSubmitFeedback(event)}>
      <textarea 
        className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
        placeholder='Conte com detalhes o que está acontecendo...'
        onChange={({target})=>setComment(target.value)}
      />

      <footer className="flex gap-2 md-2">
      <ScreenshotButton onScreenshotTook={setScreenshot} screenshot={screenshot}/>
      <button 
        type="submit"
        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
        disabled={comment.length === 0}
      >
        Enviar FeedBack
      </button>
      </footer>
    </form>
  </>
  )
}