import { useState } from "react";
import FirstCommitSlide from "./FirstCommitSlide";
import EmailPortalSlide from "./EmailPortalSlide";

function App() {
  const [currentSlide, setCurrentSlide] = useState("ceremony");

  return (
    <div className="App">
      {currentSlide === "ceremony" ? (
        <FirstCommitSlide onNavigateEmail={() => setCurrentSlide("email")} />
      ) : (
        <EmailPortalSlide />
      )}
    </div>
  );
}

export default App;
