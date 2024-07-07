// GeneratedMessages.tsx

import React from "react"

interface GeneratedMessagesProps {
  generatedMessages: { input: string; response: string }[]
}

const GeneratedMessages: React.FC<GeneratedMessagesProps> = ({
  generatedMessages
}) => {
  return (
    <>
      {generatedMessages.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex justify-end items-center my-2">
            <p className="max-w-[80%] p-2 bg-[#DFE1E7] font-normal text-[#666D80] rounded-xl text-2xl leading-9 break-words">
              {item.input}
            </p>
          </div>
          <div className="flex justify-start items-center my-2">
            <p className="max-w-[80%] p-2 bg-[#DBEAFE] font-normal text-[#666D80] rounded-xl text-2xl leading-9 break-words">
              {item.response}
            </p>
          </div>
        </React.Fragment>
      ))}
    </>
  )
}

export default GeneratedMessages
