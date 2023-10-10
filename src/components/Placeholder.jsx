import { useState } from 'react'

export default function Placeholder({text}) {
  
  return (
    <section id="placeholder" className="placeholder">
      <i className="fa-solid fa-film fa-5x"></i>
      <p id="placeholder-text">{text}</p>
    </section>
  );
}
