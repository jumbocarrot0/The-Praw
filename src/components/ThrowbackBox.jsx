export default function ThrowbackBox(props) {
    return (
        <div width="100%" className={"border border-white bg-purple " + props.className} style={{padding: "2px"}}>
            <div width="100%" className="border border-1 border-grey bg-purple" style={{padding: "2px"}}>
                <div width="100%" className="bg-black p-2">
                    {props.children}
                </div>
            </div>
        </div>
    )
    // return (
    //     <table width="100%" cellSpacing="2" cellPadding="2" border="1" bgcolor="#800080" className={props.className}>
    //         <tbody>
    //             <tr>
    //                 <td>
    //                     <table width="100%" cellSpacing="10" cellPadding="20" border="1" bgcolor="#000000">
    //                         <tbody>
    //                             <tr>
    //                                 <td>
    //                                     {props.children}
    //                                 </td>
    //                             </tr>
    //                         </tbody>
    //                     </table>
    //                 </td>
    //             </tr>
    //         </tbody>
    //     </table>
    // )
}