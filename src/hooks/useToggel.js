import { useCallback, useState } from "react";

export default function useToggle(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return { isOpen, toggle, setIsOpen };
}
