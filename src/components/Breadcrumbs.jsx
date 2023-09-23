import React from 'react'
import { useMatches } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Breadcrumbs(props) {

  // const breadcrumbs = useBreadcrumbs(routes);
  // console.log(breadcrumbs)

  const matches = useMatches();
  const crumbs = matches
  .filter((match) => Boolean(match.handle?.breadcrumb))
  .map((match) => match.handle.breadcrumb(match.data))

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