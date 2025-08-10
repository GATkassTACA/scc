"use client";

import { useTransition } from "react";
import { getGeminiResponse } from "./actions";

export default function AIGenerator() {
  let [isPending, startTransition] = useTransition();
  return (
    <form action={async (formData) => {
      startTransition(async () => {
        const result = await getGeminiResponse(null, formData);
        console.log(result);
      });
    }}>
      <input type="text" name="prompt" />
      <button type="submit" aria-disabled={isPending}>
        Generate
      </button>
    </form>
  );
}
