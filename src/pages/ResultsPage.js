import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import {
  Card,
  CardBody,
  Badge,
  Button,
  Row,
  Col

} from 'reactstrap';
import { Link } from "react-router-dom"
import GridBrowser from "../components/GridBrowser";
import Layout from '../components/Layout'
import Searchbar from '../components/Searchbar'
import Loading from '../components/Loading'

import Evolutions from '../dataFiles/evolutions.json';
import Hazards from '../dataFiles/hazards.json';
import Lux from '../dataFiles/lux.json';
import Moons from '../dataFiles/moons.json';
import Objectives from '../dataFiles/objectives.json';
import Stations from '../dataFiles/stations.json';
import Technology from '../dataFiles/technology.json';

import Fuse from 'fuse.js'

import { getAllAliens } from "../supabaseAPI/getAlien"


function Item(props) {
  const item = props.content

  let previewBody;

  if (props.to.includes('Alien')) {
    previewBody = <span>
      <strong>{item.powerName}</strong> {item.powerBody.slice(0, 280).replaceAll('\n$')}{item.powerBody.length > 280 ? '...' : ''}
    </span>

  } else if (props.to.includes('Evolution')) {
    previewBody = <ul>
      {item.body.map((row) => {
        return (row.cost ? <li key={row.cost}>{row.cost}: {row.text}</li> : <p key="noCost">{row.text}</p>)
      })}
    </ul>
  } else {
    previewBody = item.body.slice(0, 260)
  }



  return (
    <Card className='mb-5'>
      <Link className="border border-2 border-secondary link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to={props.to} reloadDocument>
        <CardBody className='text-body-emphasis'>
          {item.thumbnail ?
            <img alt={item.name + " Thumbnail"}
              className='float-end'
              src={require(`../images/alien icons/${item.thumbnail}`)}
            /> : null
          }
          <h2>{item.name}</h2>
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
            {props.to.split('/').at('-2')}
          </Badge>
          <p className='mt-3 link-underline-opacity-0-hover'>{previewBody}</p>
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

  // useEffect(() => {
  //   const allItems = Object.entries(GetallItems());
  //   const idx = lunr(function () {

  //     this.ref('id')
  //     this.field('name')
  //     this.field('body')

  //     allItems.forEach(function (doc) {
  //       if (doc[0].includes('Alien')) {
  //         this.add({
  //           'id': doc[0], 'name': doc[1].original.name, 'body':
  //             (doc[1].original.gameSetup +
  //             doc[1].original.powerName +
  //             doc[1].original.powerBody +
  //             doc[1].original.history +
  //             doc[1].original.wildBody +
  //             doc[1].original.superBody)
  //         })

  //       } else if (doc[0].includes('Evolution')) {
  //         this.add({ 'id': doc[0], 'name': doc[1].original.name.replaceAll('æ', 'ae'), 'body': doc[1].original.body })
  //       } else {
  //         this.add({ 'id': doc[0], 'name': doc[1].original.name, 'body': doc[1].original.body })
  //       }
  //     }, this)
  //   })

  //   const lunrQuery = `name:${submittedQuery} name:*${submittedQuery}* ${submittedQuery} ${submittedQuery}* *${submittedQuery}* *${submittedQuery}`
  //   // const lunrQuery = `*${submittedQuery.replace(' ', '* *')}*`
  //   console.log(lunrQuery)
  //   setSearchResults(idx.search(lunrQuery)
  //     .map(result => [result.ref, Object.fromEntries(allItems)[result.ref]]))
  // }, [submittedQuery])

  useEffect(() => {
    GetallItems().then(data => {
      const allItems = Object.entries(data);

      const options = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.6,
        keys: [
          { name: 'name', getFn: (item) => item[1].original.name },
          {
            name: 'body', getFn: (item) => {
              if (item[0].includes('Alien')) {
                return (
                  (item[1].original.gameSetup +
                    item[1].original.powerName +
                    item[1].original.powerBody +
                    item[1].original.history +
                    item[1].original.wildBody +
                    item[1].original.superBody))

              } else if (item[0].includes('Evolution')) {
                return (item[1].original.body)
              } else {
                return (item[1].original.body)
              }
            }
          }
        ]
      }
      const fuse = new Fuse(allItems, options)
      const fuseQuery = { name: `${submittedQuery}` }
      // const lunrQuery = `*${submittedQuery.replace(' ', '* *')}*`
      // console.log(fuseQuery)
      console.log(fuse.search(fuseQuery))
      // console.log(fuse.search(fuseQuery).map(result => [result.item[0], Object.fromEntries(allItems)[result.item[0]]]))
      setSearchResults(fuse.search(fuseQuery)
        .map(result => [result.item[0], Object.fromEntries(allItems)[result.item[0]]]))
    }).then(_ => setLoading(false))
  }, [submittedQuery])

  return (
    <Layout title="Search">
      <h1 className='mb-4'>Search</h1>
      <Row>
        <Col sm={8}>
          <Searchbar />
          <hr className="border border-light border-2 opacity-100 mb-5" />
          {loading ? <Loading color="light" /> :
            <GridBrowser cardTemplate={Item}
              url=""
              content={Object.fromEntries(searchResults.slice(0, resultsShown))}
              noSort
              width={1}
            />
          }
          {resultsShown < searchResults.length ?
            <Button color="secondary" className='w-100 fs-2' onClick={() => setResultsShown(resultsShown + resultsPerPage)}>
              More Results
            </Button>
            : null
          }
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
    </Layout>
  );
}