import { useState } from "react";

export default function useCopy() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}

/* 
    const { copied, copy } = useCopy();
    <button onClick={() => copy(window.location.href)}>Copy Link</button>;
<button onClick={() => copy("DISCOUNT50")}>Copy Code</button>;
<button onClick={() => copy(user.id)}>Copy ID</button>;
<input value={text} onChange={(e) => setText(e.target.value)} />
<button onClick={() => copy(text)}>
  Copy
</button> */
