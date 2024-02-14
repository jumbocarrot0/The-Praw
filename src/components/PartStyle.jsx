import { useState, useRef } from "react";
import { Tooltip } from "reactstrap"

const MODES = {
    "PLAIN": 0,
    "REVISION_EXPLAINATION": 1
}

export default function TextPart(props) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const ref = useRef(null)

    // const tab = props.tab
    const viewMode = props.viewMode

    // console.log(props.part)
    let style = {}
    let className = []
    let tooltip = null
    let author = null

    for (const tab of [props.tab, 'all']) {
        if (props.part.style && props.part.style[tab]) {
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
                        if (props.part.revisionNote) {
                            tooltip = props.part.revisionNote?.note;
                            author = props.part.revisionNote?.author;
                        }
                        break;
                    default:
                        style.display = "none"
                }
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
                        if (props.part.revisionNote) {
                            tooltip = props.part.revisionNote?.note;
                            author = props.part.revisionNote?.author;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // console.log(style)

    if (tooltip) {

        // style.whiteSpace = 'nowrap'

        return <>
            <span className={className.join(' ')} style={style} ref={ref}>
                {props.children}
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
                {props.children}
            </span>
        </>
    } else {
        return <>
            {props.children}
        </>
    }

}