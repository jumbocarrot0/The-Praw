import { Button } from "reactstrap"

export default function MultiColoredButton(props) {
    const propsClassName = props.className || ""
    const className = propsClassName + (props.border ? `border ${props.width ? "border-" + props.width : ""} ${"border-" + props.border}` : null)
    console.log(className)
    return (<Button className={className} {...props}>
        {props.children}
    </Button>)
}