import { Button } from "reactstrap"

export default function MultiColoredButton(props) {
    return (<Button className={`border ${props.width ? "border-" + props.width : ""} ${props.border ? "border-" + props.border : ""}`} {...props}>
        {props.children}
    </Button>)
}