import Priviliges from "../../../dataFiles/privileges.json"
import { Link } from 'react-router-dom';
import GridBrowser from "../../../components/GridBrowser";
import Item from '../../../components/Item'

export default function PrivilegePage() {
    return (
        <div>
            <h1 className='mb-4'>Privilege Cards</h1>
            <p className="text-light">Privilege Cards are an official component of the Campaign mode in Cosmic Odyssey. 11 Privilege cards are included in Cosmic Odyssey.
                <br /><br />
                For more details on how these fit into a campaign, read the rules on the <Link to="../">campagin page</Link>.
            </p>
            <hr className="border border-light border-2 opacity-100 mb-5" />
            <GridBrowser cardTemplate={Item}
                url="/Variants/Campaign/PrivilegeCards"
                content={Priviliges.privilege}
                border={() => "success"}
                type={() => { return null }}
                width={4}
            />
        </div>
    );
}