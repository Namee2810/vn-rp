import mp from 'global/mp';
import rpc from "rage-rpc";
import React, { useEffect, useState } from 'react';
import { default as parse } from 'react-html-parser';
import { CSSTransition } from 'react-transition-group';
import "./style.scss";

function Prompt(props) {
  const [show, setShow] = useState(false)
  const [prompt, setPrompt] = useState(null);

  const showPrompt = (value) => {
    setPrompt(parse(value));
    setShow(true);
  }
  const hidePrompt = () => {
    setShow(false);
    setTimeout(() => {
      setPrompt(null);
    }, 500);
  }

  useEffect(() => {
    if (mp) {
      rpc.register("cef:showPrompt", showPrompt)
      rpc.register("cef:hidePrompt", hidePrompt)
    }
  }, [])
  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames='Prompt_anim'
      unmountOnExit
    >
      <div className="Prompt">
        {prompt}
      </div>

    </CSSTransition>
  )
}

export default Prompt;