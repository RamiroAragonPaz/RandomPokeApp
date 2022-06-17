import '../NavBar/NavBar.css'
import * as React from 'react';



export default function NavBar() {
  return (
    <div className='navBar'>
      <div className='bar'>
        <a href='index.html' className='imgNav'><img className='imgNav' src='../../favicon.png' alt='pokeball'/></a>
        <h1>PokeApp</h1>
        </div>
    </div>
  );
}
