import { useEffect, useState } from "react";
import "./FirstCommitSlide.css";

export default function FirstCommitSlide() {
  // Each line is made up of styled tokens
  const codeLines = [
    [<span className="kw">class</span>, " ", <span className="cls">SasnakaSansada</span>, ":"],
    ["  ", <span className="kw">def</span>, " ", <span className="fn">__init__</span>, "(", <span className="var">self</span>, ", ", <span className="var">name</span>, "):"],
    ["    self.name = ", <span className="var">name</span>],
    ["    self.mission = ", <span className="str">"Empowering the next generation of software engineers!"</span>],
    ["    self.vision = [", <span className="str">"Cloud"</span>, ", ", <span className="str">"AI"</span>, ", ", <span className="str">"Cybersecurity"</span>, ","],
    ["                 ", <span className="str">"Web Dev"</span>, ", ", <span className="str">"Data Science"</span>, " ...]"],
    ["  ", <span className="kw">def</span>, " ", <span className="fn">execute</span>, "(", <span className="var">self</span>, "):"],
    ["    ", <span className="fn">print</span>, "(", <span className="str">"Starting soon..."</span>, ")"],
    [""],
    ["# Initialize the project"],
    ["project = ", <span className="cls">SasnakaSansada</span>, "(", <span className="str">"Project Nipayumai"</span>, ")"],
    ["project.execute()"]
  ];

  const [typedTokens, setTypedTokens] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [tokenIndex, setTokenIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    if (lineIndex < codeLines.length) {
      const tokens = codeLines[lineIndex];
      if (tokenIndex < tokens.length) {
        const token = tokens[tokenIndex];
        const tokenStr = typeof token === "string" ? token : token.props.children;

        if (charIndex < tokenStr.length) {
          const timeout = setTimeout(() => {
            const newToken =
              typeof token === "string"
                ? token.slice(0, charIndex + 1)
                : { ...token, props: { ...token.props, children: tokenStr.slice(0, charIndex + 1) } };

            setTypedTokens((prev) => {
              const copy = [...prev];
              if (!copy[lineIndex]) copy[lineIndex] = [];
              copy[lineIndex][tokenIndex] = newToken;
              return copy;
            });

            setCharIndex((prev) => prev + 1);
          }, 50 + Math.random() * 80);

          return () => clearTimeout(timeout);
        } else {
          setCharIndex(0);
          setTokenIndex((prev) => prev + 1);
        }
      } else {
        const timeout = setTimeout(() => {
          setTokenIndex(0);
          setLineIndex((prev) => prev + 1);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setTypedTokens([]);
        setLineIndex(0);
        setTokenIndex(0);
        setCharIndex(0);
        setLoop((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, tokenIndex, charIndex, loop]);

  return (
    <div className="slide">
      <div className="content">
        {/* Left side */}
        <div className="left">
          <img src="/commit.png" alt="Commit Logo" className="commit-logo" />
          <p className="subtitle">The Roadmap to Your Developer Journey</p>
          <div className="logos">
            <img src="/logo2.png" alt="Logo 1" className="logo small" />
            <img src="/logo1.png" alt="Logo 2" className="logo small2" />
          </div>
        </div>

        {/* Right side */}
        <div className="right">
          <pre>
            {typedTokens.map((line, i) => (
              <div key={i} className="code-line">
                {Array.isArray(line)
                  ? line.map((token, j) => <span key={j}>{token}</span>)
                  : line}
                {i === typedTokens.length - 1 && <span className="cursor">|</span>}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}