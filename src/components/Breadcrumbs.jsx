import React from 'react'
import { useMatches } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Breadcrumbs(props) {

  // const breadcrumbs = useBreadcrumbs(routes);
  // console.log(breadcrumbs)

  const matches = useMatches();
  console.log(matches)
  const crumbs = matches
  // first get rid of any matches that don't have handle and crumb
  .filter((match) => Boolean(match.handle?.breadcrumb))
  // now map them into an array of elements, passing the loader
  // data to each one
  .map((match) => match.handle.breadcrumb(match.data));
  console.log(crumbs)

  return (
      <Breadcrumb>
        {
          crumbs.map((crumb, index) => (
            <BreadcrumbItem key={index} active={Number(index) === crumbs.length - 1}>
              {
                Number(index) !== crumbs.length - 1 ? (
                  <Link to={matches[index].pathname}>
                    {crumb}
                  </Link>)
                  : (crumb)
              }
            </BreadcrumbItem>
          ))
        }
      </Breadcrumb>
  );
}