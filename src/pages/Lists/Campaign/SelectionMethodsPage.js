import { Link, useLoaderData } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PartStyle, { VERSIONS, MODES } from '../../../components/PartStyle'

function LinkIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
    </svg>
}

export default function SelectionMethodsPage() {

    const SelectionMethods = useLoaderData("selectionmethods");

    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={MODES.PLAIN} tab="revised">{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    const { hash } = useLocation();

    const ref = useRef(null)

    useEffect(() => {
        document.documentElement.scrollTo({
            top: ref.current?.getBoundingClientRect().top - 100,
            left: 0,
            behavior: "smooth", // Optional if you want to skip the scrolling animation
        });
    }, [])

    function SelectionMethod(props) {
        const method = props.method
        return <div
            className={hash.slice(1) === method.name.replaceAll(' ', '_') ? 'p-2 mb-2 border border-2 border-indigo' : 'p-2 mb-2'}
            style={hash.slice(1) === method.name.replaceAll(' ', '_') ? { boxShadow: "0px 0px 10px #f600ff" } : null}
            ref={hash.slice(1) === method.name.replaceAll(' ', '_') ? ref : null}
            id={method.name}
        >
            <Link to={`#${method.name.replaceAll(' ', '_')}`}>
                <h3>{method.name} <LinkIcon /></h3>
            </Link>
            <p>{method.body.map(handleParts)}</p>
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
                Object.values(SelectionMethods).filter((method) => method.expansion !== "Fan Made").map((method, i) => <SelectionMethod method={method} key={i} />)
            }
            <h2>Fan-made Selection Methods</h2>
            <p>These have been created by fans without a corresponding age card, and also includes the <Link to="https://futurepastimes.com/blog/2023/4/24/new-campaign-alien-selection-methods">"semi-official"</Link> methods posted on the Future Pastimes blog..</p>
            {
                Object.values(SelectionMethods).filter((method) => method.expansion === "Fan Made").sort(function (a, b) { return a.name > b.name }).map((method, i) => <SelectionMethod method={method} key={i} />)
            }
        </div>
    );
}