import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
type Props = {text:string};
export function ConfettiStars({text}:Props) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const handleClick = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  useEffect(()=>{
    if(buttonRef.current){
      buttonRef.current.click()
    }
  }, [])

  return (
    <div className="relative">
      <Button ref={buttonRef} onClick={handleClick} variant={"ghost"} size={"lg"} className="text-lg">{text}</Button>
    </div>
  );
}
