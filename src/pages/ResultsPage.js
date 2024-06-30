import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import {
  Card,
  CardBody,
  Badge,
  // Button,
  Row,
  Col

} from 'reactstrap';
import { Link } from "react-router-dom"
import GridBrowser from "../components/GridBrowser";
import Searchbar from '../components/Searchbar'
import Loading from '../components/Loading'

import Evolutions from '../dataFiles/evolutions.json';
import Hazards from '../dataFiles/hazards.json';
import Lux from '../dataFiles/lux.json';
import Moons from '../dataFiles/moons.json';
import Objectives from '../dataFiles/objectives.json';
import Stations from '../dataFiles/stations.json';
import Technology from '../dataFiles/technology.json';

import Ages from "../dataFiles/ages.json"
import Envoys from "../dataFiles/envoys.json"
import SpecialShips from "../dataFiles/specialShips.json"

import Fuse from 'fuse.js'

import { getAllAliens } from "../supabaseAPI/getAlien"

import InfiniteScroll from 'react-infinite-scroll-component';


function Item(props) {
  const item = props.content

  // console.log(item)
  // console.log(props.to)

  let previewBody;
  let previewName = item.name;

  if (props.to.includes('/Aliens/')) {
    previewBody = <>
      <div className='fs-4 text-light'>{item.short}</div>
      <strong>{item.powerName}</strong> {item.powerBody.slice(0, 280).replaceAll('\n$')}{item.powerBody.length > 280 ? '...' : ''}
    </>

  } else if (props.to.includes('/Variants/Campaign/Envoys/')) {
    previewBody = <p>{`${item.powerBody} ${item.history}`.slice(0, 260)}</p>

  } else if (props.to.includes('/Variants/SpecialShips/')) {
    previewBody = <p>{`${item.powerBody} ${item.specialName} ${item.specialBody}`.slice(0, 260)}</p>

  } else if (props.to.includes('/Variants/Evolutions/')) {
    previewBody = <ul>
      {item.body.map((row) => {
        return (row.cost ? <li key={row.cost}>{row.cost}: {row.text}</li> : <li key="noCost">{row.text}</li>)
      })}
    </ul>
  } else if (props.to.includes('Ages') && item.type === "Standard") {
    previewName = `${item.name} ${item.name2}`
    previewBody = <>{`Use the following alien selection method: ${Ages.selectionMethods[item?.selectionMethodID].original.name}; Add the following variant(s): ${item.variants.map((variant, index) => `${index !== 0 ? variant.Subvariant ? " with " : " and " : ""}${variant.Name}`
    )}`.slice(0, 260)}</>
  } else {
    previewBody = <p>{item.body.slice(0, 260)}</p>
  }



  return (
    <Card className='mb-5'>
      <Link className="border border-2 border-secondary link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to={props.to} reloadDocument>
        <CardBody className='text-body-emphasis'>
          {item.thumbnail ?
            props.to.includes('/Aliens/') ? <img alt={item.name + " Thumbnail"}
              className='float-end'
              src={require(`../images/alien icons/${item.thumbnail}`)}
            /> :
              <img alt={previewName + " Thumbnail"}
                className='float-end'
                src={require(`../images/${item.thumbnail}`)}
              /> : null
          }
          <h2>{previewName}</h2>
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
          <Badge
            color="dark">
            {props.to.split(/[/#]/).at('-2')}
          </Badge>
          <div className='mt-3 link-underline-opacity-0-hover'>{previewBody}</div>
          {/* <strong>{item.short}</strong> */}
        </CardBody>
      </Link>
    </Card>
  )
}

async function GetallItems() {

  let items = Object.entries(await getAllAliens())
    .map((entry) => ["Aliens/" + entry[0], entry[1]]);

  items = items.concat(Object.entries(Evolutions.evolutions)
    .map((entry) => ["Variants/Evolutions/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Hazards.hazards)
    .map((entry) => ["Variants/Hazards/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Lux.lux)
    .map((entry) => ["Variants/Lux/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Moons.moons)
    .map((entry) => ["Variants/Moons/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Objectives.objectives)
    .map((entry) => ["Variants/Objectives/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Stations.stations)
    .map((entry) => ["Variants/Stations/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Technology.technologies)
    .map((entry) => ["Variants/Techs/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Ages.ages)
    .map((entry) => ["Variants/Campaign/Ages#" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(SpecialShips.ships)
    .map((entry) => ["Variants/SpecialShips/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Envoys.envoys)
    .map((entry) => ["Variants/Campaign/Envoys/" + entry[0], entry[1]])
  );

  items = items.concat(Object.entries(Ages.selectionMethods)
    .map((entry) => ["Variants/Campaign/SelectionMethods#" + entry[1].original.name.replaceAll(' ', '_'), entry[1]])
  );

  return Object.fromEntries(items)

}

// function filterItems(search, limit) {

//   let filteredItems = Object.entries(GetallItems())
//     .filter((entry) => entry[1].original.name.toLowerCase().includes(search.toLowerCase()));

//   filteredItems.sort(function (a, b) {
//     if (a[1].original.name.toLowerCase().match(new RegExp(`^${search}`)) && !b[1].original.name.toLowerCase().match(new RegExp(`^${search}`))){
//       return -1;

//     } else if (!a[1].original.name.toLowerCase().match(new RegExp(`^${search}`)) && b[1].original.name.toLowerCase().match(new RegExp(`^${search}`))) {
//       return 1;

//     } else if (a[1].original.name < b[1].original.name) {
//       return -1;
//     }
//     else if (a[1].original.name > b[1].original.name) {
//       return 1;
//     } else {
//       return 0;
//     }
//   })

//   return Object.fromEntries(filteredItems.slice(0, limit))

// }

export default function ResultsPage() {

  const resultsPerPage = 10
  const [resultsShown, setResultsShown] = useState(resultsPerPage)

  const searchParams = useSearchParams()[0];
  const submittedQuery = (searchParams.get('search') || '');
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    GetallItems().then(data => {
      const allItems = Object.entries(data);
      // console.log(allItems)

      const options = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.6,
        keys: [
          {
            name: 'name', getFn: (item) => {
              if (item[0].includes('Ages')) {
                return item[1].original.name + item[1].original.name2
              } else {
                return item[1].original.name
              }
            }, weight: 1
          },
          {
            name: 'body', getFn: (item) => {
              if (item[0].includes('Alien')) {
                return (`${item[1].original.gameSetup} ${item[1].original.powerName} ${item[1].original.powerBody} ${item[1].original.history} ${item[1].original.wildBody} ${item[1].original.superBody}`)
              } else if (item[0].includes('Envoy')) {
                return (`${item[1].original.powerBody} ${item[1].original.history}`)
              } else if (item[0].includes('SpecialShips')) {
                return (`${item[1].original.powerBody} ${item[1].original.specialName} ${item[1].original.specialBody}`)
              } else if (item[0].includes('Ages') && item[1].original.type === "Standard") {
                // console.log(item[0])
                const body = (`Use the following alien selection method: ${Ages.selectionMethods[item[1].original?.selectionMethodID].original.name} Add the following variant(s): ${item[1].original.variants.map((variant, index) =>
                  `${index !== 0 ? variant.Subvariant ? " with " : " and " : ""}${variant.Name}`
                )}`)
                // console.log(body)
                return body
              } else if (item[0].includes('Evolution')) {
                return (item[1].original.body)
              } else {
                return (item[1].original.body)
              }
            }, weight: 1
          }
        ]
      }
      const fuse = new Fuse(allItems, options)
      const fuseQuery = `${submittedQuery}`
      // console.log(fuseQuery)
      // console.log(fuse.search(fuseQuery))
      // console.log(fuse.search(fuseQuery).map(result => [result.item[0], Object.fromEntries(allItems)[result.item[0]]]))
      setSearchResults(fuse.search(fuseQuery)
        .map(result => [result.item[0], Object.fromEntries(allItems)[result.item[0]]]))
    }).then(_ => setLoading(false))
  }, [submittedQuery])

  return (
    <div>
      <h1 className='mb-4'>Search</h1>
      <Row>
        <Col sm={8}>
          <Searchbar />
          <hr className="border border-light border-2 opacity-100 mb-5" />
          {loading ? <Loading color="light" /> :
            // <GridBrowser cardTemplate={Item}
            //   url=""
            //   content={Object.fromEntries(searchResults.slice(0, resultsShown))}
            //   noSort
            //   width={1}
            // />
            <InfiniteScroll
              dataLength={resultsShown}
              next={() => setResultsShown(resultsShown + resultsPerPage)}
              hasMore={resultsShown < searchResults.length}
              loader={<Loading />}
              className="overflow-hidden"
            >
              <GridBrowser cardTemplate={Item}
                url=""
                content={Object.fromEntries(searchResults.slice(0, resultsShown))}
                noSort
                width={1}
              />
            </InfiniteScroll>
          }
          {/* {resultsShown < searchResults.length ?
            <Button color="secondary" className='w-100 fs-2' onClick={() => setResultsShown(resultsShown + resultsPerPage)}>
              More Results
            </Button>
            : null
          } */}
          {searchResults.length === 0 && !loading ?
            <div>
              <h3>Sorry! We couldn't find anything!</h3>
              <p></p>
              <ul>
                <li>Make sure that all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
              </ul>
            </div>
            : null
          }
        </Col>
        <Col sm={4}>
        </Col>
      </Row>
    </div>
  );
}