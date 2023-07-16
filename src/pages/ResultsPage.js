import { useSearchParams } from 'react-router-dom'
import {
  Card,
  CardBody,
  Badge

} from 'reactstrap';
import { Link } from "react-router-dom"
import GridBrowser from "../components/GridBrowser";
import Layout from '../components/Layout'

import Aliens from '../dataFiles/aliens.json';
import Evolutions from '../dataFiles/evolutions.json';
import Hazards from '../dataFiles/hazards.json';
import Lux from '../dataFiles/lux.json';
import Moons from '../dataFiles/moons.json';
import Objectives from '../dataFiles/objectives.json';
import Stations from '../dataFiles/stations.json';
import Technology from '../dataFiles/technology.json';

function Item(props) {
  const item = props.content
  return (
    <Card className='mb-5'>
      <Link className={"btn border border-5 btn-light border-" + 
            (
                item.expansion === "Base Set" ? "primary" : 
                item.expansion === "Cosmic Incursion" ? "indigo" : 
                item.expansion === "Cosmic Conflict" ? "info" : 
                item.expansion === "Cosmic Alliance" ? "warning" : 
                item.expansion === "Cosmic Storm" ? "danger" : 
                item.expansion === "Cosmic Dominion" ? "success" : 
                item.expansion === "Cosmic Eons" ? "pink" : 
                item.expansion === "Cosmic Odyssey" ? "purple" : 
                "dark"
            )
      } to={props.to} reloadDocument>
        <CardBody>
          <h2 className='text-dark'>{item.name}</h2>
          <h6 className="align-items-center">
            <Badge
              className={["Cosmic Alliance", "Cosmic Conflict"].includes(item.expansion) ? " text-dark" : ""}
              color={
                item.expansion === "Base Set" ? "primary" : 
                item.expansion === "Cosmic Incursion" ? "indigo" : 
                item.expansion === "Cosmic Conflict" ? "info" : 
                item.expansion === "Cosmic Alliance" ? "warning" : 
                item.expansion === "Cosmic Storm" ? "danger" : 
                item.expansion === "Cosmic Dominion" ? "success" : 
                item.expansion === "Cosmic Eons" ? "pink" : 
                item.expansion === "Cosmic Odyssey" ? "purple" : 
                "dark"
              }>
              {item.expansion}
            </Badge>
          </h6>
          {/* <strong>{item.short}</strong> */}
        </CardBody>
      </Link>
    </Card>
  )
}

function filterItems(search) {

  let filteredItems = Object.entries(Aliens.aliens)
  .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()))
  .map((entry) => ["Aliens/" + entry[0], entry[1]]);

  filteredItems = filteredItems.concat(Object.entries(Evolutions.evolutions)
  .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()))
  .map((entry) => ["Variants/Evolutions/" + entry[0], entry[1]])
  );

  filteredItems = filteredItems.concat(Object.entries(Hazards.hazards)
  .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()))
  .map((entry) => ["Variants/Hazards/" + entry[0], entry[1]])
  );

  filteredItems = filteredItems.concat(Object.entries(Lux.lux)
  .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()))
  .map((entry) => ["Variants/Lux/" + entry[0], entry[1]])
  );

  filteredItems = filteredItems.concat(Object.entries(Moons.moons)
  .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()))
  .map((entry) => ["Variants/Moons/" + entry[0], entry[1]])
  );

  filteredItems = filteredItems.concat(Object.entries(Objectives.objectives)
  .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()))
  .map((entry) => ["Variants/Objectives/" + entry[0], entry[1]])
  );

  filteredItems = filteredItems.concat(Object.entries(Stations.stations)
  .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()))
  .map((entry) => ["Variants/Stations/" + entry[0], entry[1]])
  );

  filteredItems = filteredItems.concat(Object.entries(Technology.technologies)
  .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()))
  .map((entry) => ["Variants/Techs/" + entry[0], entry[1]])
  );

  filteredItems.sort(function (a, b) {
    console.log(a)
      if (a[1].original.name < b[1].original.name) {
        return -1;
      }
      else if (a[1].original.name > b[1].original.name) {
        return 1;
      } else {
        return 0;
      }
  })

  return Object.fromEntries(filteredItems)

}

export default function ResultsPage() {
  const searchParams = useSearchParams()[0];
  const submittedQuery = (searchParams.get('search') || '');
//   const [searchQuery, setSearchQuery] = useState(submittedQuery);

//   const navigate = useNavigate();

  const filteredAliens = filterItems(submittedQuery)

  return (
    <Layout title="Search">
      <h1 className='mb-4'>Search</h1>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url=""
        content={filteredAliens}
        noSort
      />
    </Layout>
  );
}