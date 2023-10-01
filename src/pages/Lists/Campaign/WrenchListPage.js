import Wrenches from "../../../dataFiles/wrenches.json"
import { Link } from 'react-router-dom';
import GridBrowser from "../../../components/GridBrowser";
import Item from '../../../components/Item'

export default function WrenchPage() {
    return (
        <div>
            <h1 className='mb-4'>Wrench Cards</h1>
            <p className="text-light">Wrench Cards are an official component of the Campaign mode in Cosmic Odyssey. 11 Wrench cards are included in Cosmic Odyssey.
                <br /><br />
                For more details on how these fit into a campaign, read the rules on the <Link to="../">campagin page</Link>.
            </p>
            <hr className="border border-light border-2 opacity-100 mb-5" />
            <GridBrowser cardTemplate={Item}
                url="/Variants/Campaign/WrenchCards"
                content={Wrenches.wrench}
                border={() => "secondary"}
                type={() => { return null }}
                width={4}
            />
        </div>
    );
}