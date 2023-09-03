import React from 'react';
import {useState,useEffect} from 'react';

function Practice() {
const [click,setClick] =useState(0);
   useEffect(() => {
     document.title = `you clicked ${click} times`;
   },[]);

  return (
    
    <div>
        <button onClick ={()=>
        setClick((click) =>
click+1
        )}>
            click me{click}
            </button>
  
</div>

 
  );
}
export default Practice