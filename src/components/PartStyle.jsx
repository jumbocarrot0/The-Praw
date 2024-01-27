const MODES = {
    "PLAIN": 0,
    "REVISION_EXPLAINATION": 1
}

export default function TextPart(props) {

    // const tab = props.tab
    const viewMode = props.viewMode

    // console.log(props.part)
    let style = {}
    let tooltip = null

    for (const tab of [props.tab, 'all']){
        if (props.part.style[tab]) {
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
                        if (props.part.revisionNote) {
                            tooltip = `${props.part.revisionNote?.note} (${props.part.revisionNote?.author})`;
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
                            tooltip = `${props.part.revisionNote?.note} (${props.part.revisionNote?.author})`;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // console.log(style)

    return <span style={style} title={tooltip}>
        {props.children}
    </span>

}