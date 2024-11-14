import { useState } from "react";

const usePlaceholder = (initPlaceholder: string) => {
  const [placeholder, setPlaceholder] = useState<string>(initPlaceholder);

  const handleFocus = () => setPlaceholder("");
  const handleBlur = () => setPlaceholder(initPlaceholder);

  return { handleFocus, handleBlur, placeholder };
};

export default usePlaceholder;
