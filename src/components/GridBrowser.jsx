import {
    Row,
    Col
} from 'reactstrap';

export default function GridBrowser(props) {

    console.log(props.content)

    let groupByN = (n, arr) => {
        let result = [];
        for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
        return result;
    };

    let sortedKeys = Object.keys(props.content)
  
    sortedKeys.sort(function(a, b) {
      const expansions = ["Base Set", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "42nd Anniversary Edition", "Cosmic Odyssey"]
      // console.log(a.expansion)
      if (expansions.findIndex((e) => e === props.content[a].original.expansion) < expansions.findIndex((e) => e === props.content[b].original.expansion)) {
        return -1;
      }
      else if (expansions.findIndex((e) => e === props.content[a].original.expansion) > expansions.findIndex((e) => e === props.content[b].original.expansion)) {
        return 1;
      } else {
        if (props.content[a].original.name < props.content[b].original.name) {
          return -1;
        }
        else if (props.content[a].original.name > props.content[b].original.name) {
          return 1;
        }
      }
      return 0;
    })

    return groupByN(3, sortedKeys).map((row) => {
        return (
            <Row>
                {row.map((cardIndex) => {
                    return (<Col lg={4}>
                        <props.cardTemplate content={props.content[cardIndex]} to={`${props.url}/${cardIndex}`} />
                    </Col>)
                })}
            </Row>
        )
    })
}