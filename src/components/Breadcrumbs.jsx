import React from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { routes } from "../routes"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <React.Fragment>
      <Breadcrumb>
        {
          Object.keys(breadcrumbs).map((index) => (
            <BreadcrumbItem key={breadcrumbs[index].match.pathname} active={Number(index) === breadcrumbs.length - 1}>
              {
                Number(index) !== breadcrumbs.length - 1 ? (
                  <Link to={breadcrumbs[index].match.pathname}>
                    {breadcrumbs[index].breadcrumb}
                  </Link>)
                  : (breadcrumbs[index].breadcrumb)
              }
            </BreadcrumbItem>
          ))
        }
      </Breadcrumb>
    </React.Fragment>
  );
}