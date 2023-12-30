import { Link, useLoaderData } from 'react-router-dom';
import { useEffect, useRef } from 'react';
// import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { Toast, ToastBody, ToastHeader } from 'reactstrap';

function LinkIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
  </svg>
}

// function CopyIcon() {
//   return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
//     <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z" />
//   </svg>
// }

export default function SelectionMethodsPage() {

  const SelectionMethods = useLoaderData("selectionmethods");

  const { 
    // pathname, 
    hash } = useLocation();

  const ref = useRef(null)

  useEffect(() => {
    // if (hash) {
      document.documentElement.scrollTo({
        top: ref.current?.getBoundingClientRect().top - 100,
        left: 0,
        behavior: "smooth", // Optional if you want to skip the scrolling animation
      });
      // ref.current.scrollIntoView()
    // }
  }, [])

  function SelectionMethod(props) {
    const method = props.method
    // const [toastOpen, setToastOpen] = useState(false)
    // const toggle = () => setToastOpen(!toastOpen);

    return <div
      className={hash.slice(1) === method.original.name.replaceAll(' ', '_') ? 'p-2 mb-2 border border-2 border-indigo' : 'p-2 mb-2'}
      style={hash.slice(1) === method.original.name.replaceAll(' ', '_') ? { boxShadow: "0px 0px 10px #f600ff" } : null}
      ref={hash.slice(1) === method.original.name.replaceAll(' ', '_') ? ref : null}
      id={method.original.name}
    >
      <Link
        // onClick={() => {
        //   navigator.clipboard.writeText(`${window.location.host}${pathname}#${method.original.name.replaceAll(' ', '_')}`);
        //   setToastOpen(true)
        // }
        // }
        to={`#${method.original.name.replaceAll(' ', '_')}`}
      >
        <h3>{method.original.name} <LinkIcon /></h3>
      </Link>
      {/* <Toast isOpen={toastOpen}>
        <ToastHeader toggle={toggle}>
          Toast title
        </ToastHeader>
        <ToastBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ToastBody>
      </Toast> */}
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
        Object.values(SelectionMethods).filter((method) => method.original.expansion !== "Fan Made").map((method, i) => <SelectionMethod method={method} key={i} />)
      }
      <h2>Fan-made Selection Methods</h2>
      <p>These have been created by fans without a corresponding age card, and also includes the <Link to="https://futurepastimes.com/blog/2023/4/24/new-campaign-alien-selection-methods">"semi-official"</Link> methods posted on the Future Pastimes blog.</p>
      {
        Object.values(SelectionMethods).filter((method) => method.original.expansion === "Fan Made").sort(function (a, b) { return a.original.name > b.original.name }).map((method, i) => <SelectionMethod method={method} key={i} />)
      }
    </div>
  );
}