import { Lottie } from "lottie-react";
import notFound from "@assets/animation/404error.json";
import empty from "@assets/animation/empty.json";
import loading from "@assets/animation/movingCart.json";
import error from "@assets/animation/error.json";
import wait from "@assets/animation/waiting.json";

const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
  wait,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
  className?: string;
};

const LottieHandler = ({ type, message, className }: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px" };

  return (
    <div className={`mx-auto flex min-h-[60%] max-w-2xl flex-col items-center justify-center px-4 text-center ${className}`}>
      <Lottie autoplay loop src={lottie} style={{width: "100%", maxWidth: "80%", margin: "0 auto"}}/>
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
