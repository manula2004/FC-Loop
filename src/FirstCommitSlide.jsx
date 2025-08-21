import { useEffect, useState } from "react";
import "./FirstCommitSlide.css";

export default function FirstCommitSlide() {
  const codeLines = [
    <span><span className="kw">class</span> <span className="cls">SasnakaSansada</span>:</span>,
    <span>  <span className="kw">def</span> <span className="fn">__init__</span>(<span className="var">self</span>, <span className="var">name</span>):</span>,
    <span>    self.name = name</span>,
    <span>    self.mission = <span className="str">"Empowering the next generation of software engineers!"</span></span>,
    <span>    self.vision = [<span className="str">"Cloud"</span>, <span className="str">"AI"</span>, <span className="str">"Cybersecurity"</span>,</span>,
    <span>                 <span className="str">"Web Dev"</span>, <span className="str">"Data Science"</span> ...]</span>,
    <span>  <span className="kw">def</span> <span className="fn">execute</span>(<span className="var">self</span>):</span>,
    <span>    <span className="fn">print</span>(<span className="str">"Starting soon..."</span>)</span>,
    <span></span>,
    <span># Initialize the project</span>,
    <span>project = SasnakaSansada(<span className="str">"Project Nipayumai"</span>)</span>,
    <span>project.execute()</span>
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedLines((prev) => [...prev, codeLines[i]]);
      i++;
      if (i === codeLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayedLines([]);
          setLoop((prev) => prev + 1); // restart loop
        }, 2000);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [loop]);

  return (
    <div className="slide">
      <div className="content">
        {/* Left section */}
        <div className="left">
          <img src="commit.png" alt="Commit Logo" className="commit-logo" />

          <p className="subtitle">
            The Roadmap to Your Developer Journey
          </p>

          <div className="logos">
            <img src="logo2.png" alt="Logo 1" className="logo small" />
            <img src="logo1.png" alt="Logo 2" className="logo small2" />
          </div>
        </div>

        {/* Right section (code window) */}
        <div className="right">
          {displayedLines.map((line, index) => (
            <div key={index} className="line">{line}</div>
          ))}
          <span className="cursor">|</span>
        </div>
      </div>
    </div>
  );
}
