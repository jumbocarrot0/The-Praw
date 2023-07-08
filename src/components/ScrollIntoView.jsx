import { useEffect } from 'react'

export default function ScrollIntoView(props) {
  useEffect(() => {
    document.getElementById('root').scrollTo(0, 0);
  }, [])
  
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return props.children
}
