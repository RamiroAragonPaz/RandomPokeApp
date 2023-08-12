import './NavBar.scss'
import * as React from 'react';




export default function NavBar() {
  return (
    <div className='navBar'>
      
        <a href='/' >
        <div className='container'>
          <img className='imgNav' src='../../pokeball.png' alt='pokeball'/>
          <h1 className='text'>PokeApp</h1>
        </div>
        </a >
      
    </div>
  );
}
