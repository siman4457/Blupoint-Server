import { useState } from "react";

const UseModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle_modal = () => setIsShowing(!isShowing);

  return {
    isShowing,
    toggle_modal
  };
};

export default UseModal;
