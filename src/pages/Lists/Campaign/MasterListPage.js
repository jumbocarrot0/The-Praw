import Ages from '../../../dataFiles/ages.json';
import { Link } from 'react-router-dom';
import GridBrowser from "../../../components/GridBrowser";
import Item from '../../../components/Item'

export default function MasterPage() {
    return (
        <div>
            <h1 className='mb-4'>Master Cards</h1>
            <p className="text-light">Master Cards are an official component of the Campaign mode in Cosmic Odyssey. 13 Master cards are included in Cosmic Odyssey, 10 of which correspond to an age card in the same expansion.
                <br /><br />
                For more details on how these fit into a campaign, read the rules on the <Link to="../">campagin page</Link>.
            </p>
            <hr className="border border-light border-2 opacity-100 mb-5" />
            <GridBrowser cardTemplate={Item}
                noSort={true}
                url="/Variants/Campaign/MasterCards"
                content={Ages.master}
                border={() => "secondary"}
                type={() => { return null }}
                width={4}
            />
        </div>
    );
}