import mp from 'global/mp';
import rpc from "rage-rpc";
import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import "./style.scss";

function Prompt(props) {
  const [prompt, setPrompt] = useState(false);
  useEffect(() => {
    if (mp)
      rpc.register("cef:showPrompt", value => {
        setPrompt(value);
      })
  }, [])
  const transitions = useTransition(prompt, null, {
    from: { opacity: 0, transform: "translateY(50px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(50px)" },
  })
  return (
    transitions.map(({ item, key, props }) =>
      item && <animated.div key={key} style={props}>
        <div className="Prompt">
          {prompt}
        </div>
      </animated.div>
    )
  );
}

export default Prompt;