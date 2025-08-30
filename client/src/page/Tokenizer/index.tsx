import { TextInput, TokenizedBox, Toolbar } from "@/components/page/tokenizer"
import { useMemo, useState } from "preact/hooks"


const predefinedTexts = {
  simple: "Hello world! How are you today?",
  greeting: "My favorite color is red.",
  medium: "The quick brown fox jumps over the lazy dog. Natural language processing is fascinating!",
  complex:
    "Artificial intelligence and machine learning are transforming how we interact with technology, enabling computers to understand and generate human language with remarkable accuracy.",
  technical:
    "React components use hooks like useState and useEffect to manage state and side effects in functional components, providing a more intuitive development experience.",
  react: `
    import React, { useState, useEffect } from 'react';

    export function ExampleComponent() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        document.title = \`You clicked \${count} times\`;
      }, [count]);

      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
  `,
  long: "In the realm of computational linguistics, tokenization serves as a fundamental preprocessing step that breaks down text into smaller, manageable units called tokens. These tokens can represent words, subwords, or even individual characters, depending on the tokenization strategy employed. Modern language models like GPT and BERT rely heavily on sophisticated tokenization schemes such as Byte Pair Encoding (BPE) or WordPiece to handle out-of-vocabulary words and achieve better performance across diverse linguistic contexts.",
}

const tokenizer = {
  encode: (text: string) => {
    const tokens = text.split(/(\s+|[^\w\s])/).filter((t) => t.length > 0)
    return tokens.map((token, index) => ({
      token,
      id: Math.abs(token.split("").reduce((a, b) => a + b.charCodeAt(0), 0) + index * 1000) % 50000,
    }))
  },

  decode: (tokenIds: number[], originalTokens: { token: string; id: number }[]) => {
    const idToToken = new Map(originalTokens.map((t) => [t.id, t.token]))
    return tokenIds.map((id) => idToToken.get(id) || `[UNK_${id}]`).join("")
  },
}

export const Tokenizer = () => {

  const [inputText, setInputText] = useState("My favorite color is red.")
  const [tokenIds, setTokenIds] = useState("")
  const [showWhitespace, setShowWhitespace] = useState(false)
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [encodeView, setEncodeView] = useState<"text" | "tokenIds">("text")

  const encodedTokens = useMemo(() => {
    if (mode === "encode" && inputText) {
      return tokenizer.encode(inputText)
    }
    return []
  }, [inputText, mode])

  const [originalTokens, setOriginalTokens] = useState<{ token: string; id: number }[]>([])

  const decodedText = useMemo(() => {
    if (mode === "decode" && tokenIds) {
      try {
        const ids = tokenIds
          .split(/[,\s]+/)
          .map((id) => Number.parseInt(id.trim()))
          .filter((id) => !isNaN(id))

        return tokenizer.decode(ids, originalTokens)
      } catch {
        return "Invalid token IDs"
      }
    }
    return ""
  }, [tokenIds, mode, originalTokens])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // toast.success("Copied to clipboard", {
      //   description: "Content has been copied successfully.",
      // })
    } catch {
      // toast.error("Copy failed", {
      //   description: "Failed to copy to clipboard.",
      // })
    }
  }

  const reset = () => {
    setInputText("")
    setTokenIds("")
    setOriginalTokens([])
  }

  const handleModeSwitch = (newMode: "encode" | "decode") => {
    if (newMode === "decode" && mode === "encode" && encodedTokens.length > 0) {
      // Store current tokens for decoding
      setOriginalTokens(encodedTokens)
      setTokenIds(encodedTokens.map((t) => t.id).join(", "))
    }
    setMode(newMode)
  }

  const handlePredefinedTextSelect = (value: string) => {
    if (value && predefinedTexts[value as keyof typeof predefinedTexts]) {
      setInputText(predefinedTexts[value as keyof typeof predefinedTexts])
    }
  }


  return (<>
    <section>
      <div className="max-w-6xl mx-auto h-full flex flex-col space-y-4 pb-4">
        <Toolbar
          mode={mode}
          handleModeSwitch={handleModeSwitch}
          handlePredefinedTextSelect={handlePredefinedTextSelect}
          showWhitespace={showWhitespace}
          setShowWhitespace={setShowWhitespace}
          reset={reset}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <TextInput
          mode={mode}
          tokenIds={tokenIds}
          inputText={inputText}
          copyToClipboard={copyToClipboard}
          setInputText={setInputText}
          setTokenIds={setTokenIds}
        />
        <TokenizedBox
          mode={mode}
          encodedTokens={encodedTokens}
          decodedText={decodedText}
          encodeView={encodeView}
          setEncodeView={setEncodeView}
          showWhitespace={showWhitespace}
          copyToClipboard={copyToClipboard}
        />
      </div>
    </section>
  </>)
}