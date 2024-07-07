import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { ChangeEvent, useEffect, useState } from "react"

import GeneratedMessages from "~components/GeneratedMessages/GeneratedMessages"

import DownArrow from "../assets/downarrow.svg"
import GenerateIcon from "../assets/generateArrow.svg"
import MagicIcon from "../assets/magic.svg"
import Regenerate from "../assets/regenerate.svg"

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector<HTMLElement>(".msg-form__contenteditable")

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}
export const getStyle = (): HTMLStyleElement => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [generatedMessages, setGeneratedMessages] = useState<
    { input: string; response: string }[]
  >([])
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const openPopup = (): void => {
    setShowPopup(true)
  }

  const closePopup = (): void => {
    setInputValue("")
    setShowPopup(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const handleGenerate = (): void => {
    if (generatedMessages.length > 0) {
      return
    }

    if (inputValue.trim().length > 0) {
      const response: string =
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
      setGeneratedMessages((prevMessages) => [
        ...prevMessages,
        { input: inputValue, response }
      ])
      setInputValue("")
    }
  }

  const handleInsert = (): void => {
    const messageInputBox: HTMLElement | null = document.querySelector(
      ".msg-form__contenteditable"
    )
    const placeHolder: HTMLElement | null = document.querySelector(
      ".msg-form__placeholder"
    )

    if (messageInputBox && generatedMessages.length > 0) {
      messageInputBox.setAttribute("aria-label", "")

      const lastGeneratedMessage: string =
        generatedMessages[generatedMessages.length - 1].response
      const existingParagraph: HTMLElement | null =
        messageInputBox.querySelector("p")

      if (existingParagraph) {
        existingParagraph.textContent = lastGeneratedMessage
        placeHolder?.removeAttribute("data-placeholder")
      }

      setShowPopup(false)
    }
  }

  useEffect(() => {
    const messageInputBox: HTMLElement | null = document.querySelector(
      ".msg-form__contenteditable"
    )

    if (messageInputBox) {
      messageInputBox.style.position = "relative"
    }

    const handleFocus = (): void => {
      setIsFocused(true)
    }

    const handleBlur = (): void => {
      setTimeout(() => {
        setIsFocused(false)
      }, 500)
    }

    if (messageInputBox) {
      messageInputBox.addEventListener("focus", handleFocus)
      messageInputBox.addEventListener("blur", handleBlur)
    }

    return () => {
      if (messageInputBox) {
        messageInputBox.removeEventListener("focus", handleFocus)
        messageInputBox.removeEventListener("blur", handleBlur)
      }
    }
  }, [])

  return (
    <>
      {showPopup && (
        <div
          onClick={closePopup}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[32%] p-6 bg-[#F9FAFB] rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closePopup}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            {/* Render generated messages using the new component */}
            <GeneratedMessages generatedMessages={generatedMessages} />

            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full h-16 text-2xl font-normal leading-7 mt-5 px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Your prompt"
              style={{ boxShadow: "0px 2px 4px 0px #0000000F inset" }}
            />
            <div className="flex justify-end items-center gap-2">
              {generatedMessages &&
                generatedMessages.length > 0 &&
                generatedMessages[generatedMessages.length - 1].input && (
                  <button
                    className="px-4 py-2 flex font-semibold text-2xl leading-6 justify-center items-center gap-2 text-[#666D80] border border-[#666D80] bg-transparent rounded-lg focus:outline-none mr-2"
                    onClick={handleInsert}>
                    <img
                      src={DownArrow}
                      alt="downarrow-icon"
                      className="max-h-[13px] max-w-[13px]"
                    />
                    Insert
                  </button>
                )}
              <button
                className={`px-4 py-3 text-white flex font-semibold text-2xl leading-6 justify-center items-center gap-2 bg-[#3B82F6] rounded-lg hover:bg-blue-600 focus:outline-none ${
                  inputValue.trim().length === 0
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={handleGenerate}
                disabled={inputValue.trim().length === 0}>
                <img
                  src={
                    generatedMessages && generatedMessages.length > 0
                      ? Regenerate
                      : GenerateIcon
                  }
                  alt="generate-icon"
                  className="max-h-[13px] max-w-[13px]"
                />
                {generatedMessages && generatedMessages.length > 0
                  ? "Regenerate"
                  : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isFocused && (
        <div
          onClick={openPopup}
          className="cursor-pointer absolute top-[70px] min-w-[30px] left-[380px]">
          <img
            src={MagicIcon}
            alt="Magic Icon"
            className="flex items-center p-2"
          />
        </div>
      )}
    </>
  )
}

export default PlasmoOverlay
