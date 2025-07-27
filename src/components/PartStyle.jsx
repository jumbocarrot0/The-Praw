import { useState, useRef } from "react";
import { Tooltip } from "reactstrap"

export const MODES = {
    "PLAIN": 0,
    "REVISION_EXPLAINATION": 1
}

export const VERSIONS = {
    "original": "Original",
    "revised": "Revised",
    "homebrew": "House Rules"
}

export default function TextPart(props) {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const toggle = () => setTooltipOpen(!tooltipOpen)
    const ref = useRef(null)

    // const tab = props.tab
    const viewMode = props.viewMode

    let style = {}
    let className = []
    let tooltip = null
    let author = null
    let bar = false

    for (const tab of [props.tab, 'all']) {
        if (props.part.style && props.part.style[tab]) {
            if (props.part.style[tab].includes('bar')) {
                bar = true
            }
            if (props.part.style[tab].includes('bold')) {
                style.fontWeight = "bold"
            }
            if (props.part.style[tab].includes('italic')) {
                style.fontStyle = "italic"
            }
            if (props.part.style[tab].includes('removed')) {
                switch (viewMode) {
                    case MODES.PLAIN:
                        style.display = "none"
                        break;
                    case MODES.REVISION_EXPLAINATION:
                        style.textDecoration = "line-through"
                        className.push('text-danger-emphasis')
                        break;
                    default:
                        style.display = "none"
                }
            }
            if (props.part.style[tab].includes('danger')) {
                className.push("text-danger")
            }
            if (props.part.style[tab].includes('warning')) {
                className.push("text-warning")
            }
            if (props.part.style[tab].includes('none')) {
                style.display = "none"
            }
            if (props.part.style[tab].includes('added')) {
                switch (viewMode) {
                    case MODES.PLAIN:
                        break;
                    case MODES.REVISION_EXPLAINATION:
                        style.textDecoration = "dashed underline"
                        // if (props.part.revisionNote) {
                        //     tooltip = props.part.revisionNote?.note;
                        //     author = props.part.revisionNote?.author;
                        // }
                        break;
                    default:
                        break;
                }
            }
            if (viewMode === MODES.REVISION_EXPLAINATION && props.part.revisionNote){
                tooltip = props.part.revisionNote?.note;
                author = props.part.revisionNote?.author;
            }
        }
    }

    let inner = props.children

    if (bar) {
        inner = <span className='text-decoration-underline'>
            <span className="text-light">{inner}</span>
        </span>
    }

    if (tooltip) {

        return <>
            <span className={className.join(' ')} style={style} ref={ref}>
                {inner}
            </span>
            <Tooltip
                isOpen={tooltipOpen}
                target={ref}
                toggle={toggle}
            >
                {tooltip}<br />
                ({author})
            </Tooltip>
        </>
    } else if (Object.keys(style).length > 0 || className.length > 0) {
        return <>
            <span className={className.join(' ')} style={style}>
                {inner}
            </span>
        </>
    } else {
        return <>
            {inner}
        </>
    }

}