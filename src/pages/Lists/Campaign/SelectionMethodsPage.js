import Ages from '../../../dataFiles/ages.json';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function SelectionMethodsPage() {
  const { hash } = useLocation();

  const ref = useRef(null)

  useEffect(() => {
    if (hash) {
      document.documentElement.scrollTo({
        top: ref.current?.getBoundingClientRect().top - 100,
        left: 0,
        behavior: "smooth", // Optional if you want to skip the scrolling animation
      });
      // ref.current.scrollIntoView()
      console.log()
    }
  }, [hash])

  function SelectionMethod(props) {
    const method = props.method
    const i = props.i
    return <div
      className={ hash.slice(1) === method.original.name ? 'p-2 mb-2 border border-2 border-indigo' : 'p-2 mb-2'}
      style={hash.slice(1) === method.original.name ? { boxShadow: "0px 0px 10px #f600ff" } : null}
      ref={hash.slice(1) === method.original.name ? ref : null}
      key={i}
      id={method.original.name}
    >
      <h3>{method.original.name}</h3>
      <p>{method.revised?.body || method.original.body}</p>
    </div>
  }

  return (
    <div>
      <h1 className='mb-4'>Selection Methods</h1>
      <p className="text-light">Cosmic Odyssey official introduced 9 alternate ways to choose aliens at the beginning of the game in addition to the standard method. However, fans have been creating their own unique spin since the early days of Cosmic. This page is dedicated to listing all official and fan selection methods.</p>
      <h2>Trivia</h2>
      <ul>
        <li className="text-light">Many of the selection methods in Cosmic Odyssey can be traced back to The Warp.</li>
      </ul>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Official Selection Methods</h2>
      <p>These have been revised slightly to fix some oddities.</p>
      {
        Object.values(Ages.selectionMethods).filter((method) => method.original.expansion !== "Fan Made").map((method, i) => <SelectionMethod method={method} i={i} />)
      }
      <h2>Fan-made Selection Methods</h2>
      <p>These have been created by fans without a corresponding age card, and also includes the <Link to="https://futurepastimes.com/blog/2023/4/24/new-campaign-alien-selection-methods">"semi-official"</Link> methods posted on the Future Pastimes blog..</p>
      {
        Object.values(Ages.selectionMethods).filter((method) => method.original.expansion === "Fan Made").sort(function (a, b) {return a.original.name > b.original.name}).map((method, i) => <SelectionMethod method={method} i={i} />)
      }
    </div>
  );
}