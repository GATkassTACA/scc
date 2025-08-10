"use client";

import { useEffect, useState } from "react";
import { useTransition } from "react";
import { getGeminiResponse } from "./actions";

export default function AIGenerator() {
  let [isPending, startTransition] = useTransition();
  const [output, setOutput] = useState("");

  useEffect(() => {
    const prompt = `You are Scarlett, an AI care copilot. Respond as an advocate with empathy and guidance to answer questions accurately and guide users through senior care.\n
RESPOND IN LANGUAGE. YOU MUST RESPOND UNMISTAKABLY IN LANGUAGE.\n
A user asks: \"What are the first steps I should take when considering senior care for my parents?\"`;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("prompt", prompt);
      const result = await getGeminiResponse(null, formData);
      console.log(result);
      setOutput(JSON.stringify(result));
    });
  }, [startTransition]);

  return (
    <div>
      {output ? (
        <div>{output}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
