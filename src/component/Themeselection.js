import {useAuthContext} from  "../hooks/useAuthContext"
import React from 'react';
import modeIcon from "../images/mode.svg"

export default function Themeselection() {
    const { changeMode, mode} = useAuthContext()

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }
    console.log(mode)
  return <div className="mode-toggle  container">
      <img
        src={modeIcon}
        alt="mode images"
        className= 'mode-icon'
        onClick={toggleMode}
        style= {{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}
      />
  </div>;
}
