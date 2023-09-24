import React from 'react'
import { useMatches } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Breadcrumbs(props) {

  // const breadcrumbs = useBreadcrumbs(routes);
  // console.log(breadcrumbs)

  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.breadcrumb))
    .map((match) => match.handle.breadcrumb(match.data))
  let title = matches
    .filter((match) => Boolean(match.handle?.title || match.handle?.breadcrumb))
    .map((match) => match.handle.title ? match.handle.title(match.data) :
      (
        <HelmetProvider>
          <Helmet>
            <title>The Praw - {match.handle.breadcrumb(match.data)}</title>
          </Helmet>
        </HelmetProvider>
      ))
    .at(-1)
  if (title === undefined) {
    title = (
      <HelmetProvider>
        <Helmet>
          <title>The Praw</title>
        </Helmet>
      </HelmetProvider>
    )
  }
  // console.log(title)

  return (
    <>
      {title}
      <Breadcrumb>
        {
          crumbs.map((crumb, index) => (
            <BreadcrumbItem key={index} active={Number(index) === crumbs.length - 1}>
              {
                Number(index) !== crumbs.length - 1 ? (
                  <Link to={matches[index].pathname}>
                    {crumb}
                  </Link>)
                  : <>
                    {crumb}
                  </>
              }
            </BreadcrumbItem>
          ))
        }
      </Breadcrumb>
    </>
  );
}