
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';
const About = () => {
  const a =useContext(noteContext);
  return (
    <div>speaking About {a.name} and goal{a.goal}</div> 
  )
}

export default About
