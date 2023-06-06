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

  let content = props.content;
  let sortedKeys = Object.keys(content)

  if (content[sortedKeys[0]].original) {
    content = Object.entries(content)
    content = content.map((item) => [item[0], item[1].original])
    console.log(content)
    content = Object.fromEntries(content)
  }

  if (!props.noSort) {
    sortedKeys.sort(function (a, b) {
      const expansions = ["Base Set", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "42nd Anniversary Edition", "Cosmic Odyssey"]
      // console.log(a.expansion)
      if (expansions.findIndex((e) => e === content[a].expansion) < expansions.findIndex((e) => e === content[b].expansion)) {
        return -1;
      }
      else if (expansions.findIndex((e) => e === content[a].expansion) > expansions.findIndex((e) => e === content[b].expansion)) {
        return 1;
      } else {
        if (content[a].name < content[b].name) {
          return -1;
        }
        else if (content[a].name > content[b].name) {
          return 1;
        }
      }
      return 0;
    })
  }

  return groupByN(props.width || 3, sortedKeys).map((row) => {
    return (
      <Row>
        {row.map((cardIndex) => {
          return (<Col lg={12 / (props.width || 3)}>
            <props.cardTemplate content={content[cardIndex]} to={`${props.url}/${cardIndex}`} border={props.border} type={props.type} />
          </Col>)
        })}
      </Row>
    )
  })
}