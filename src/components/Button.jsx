import { Button } from "reactstrap"

export default function MultiColoredButton(props) {
    return (<Button className={props.className + (props.border ? `border ${props.width ? "border-" + props.width : ""} ${"border-" + props.border}` : null)} {...props}>
        {props.children}
    </Button>)
}