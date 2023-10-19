import { Link } from 'react-router-dom';
import GridBrowser from "../../../components/GridBrowser";
import Item from '../../../components/Item'
import { useRouteLoaderData } from 'react-router-dom';

export default function PrivilegePage() {

    const Privileges = useRouteLoaderData("privilegecards")

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
                content={Privileges}
                border={() => "success"}
                type={() => { return null }}
                width={4}
            />
        </div>
    );
}