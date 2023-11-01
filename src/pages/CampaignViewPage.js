import React, { useState, useEffect } from "react";
import { Await, useRouteLoaderData, Link } from "react-router-dom"
import { Button, Table } from 'reactstrap'

import Loading from "../components/Loading";

const campaignPage = (campaign) => {
  const colors = ["table-primary",
    'table-danger',
    'table-success',
    'table-warning',
    'table-indigo',
    'table-orange',
    'table-black',
    'table-white',
    'table-pink']

  return (
    <>
      <h1>{campaign.name}</h1>
      <Table>
        <thead>
          <tr>
            <th>
              Player
            </th>
            <th>
              Coalition Name
            </th>
            <th>
              Coalition Members
            </th>
            <th colSpan={8}>
              Ranking
            </th>
          </tr>
        </thead>
        <tbody>
          {
            campaign.CampaignPlayers.map(player =>
              <tr key={player.color} className={colors[player.color]}>
                <td>
                  {player.name}
                </td>
                <td>
                  {player.coalitionName}
                </td>
                <td>
                  {player.CampaignCoalitions.map((alien, i) => {
                    return <span key={i}>{i === 0 ? null : ', '}<Link className="dark-link d-inline">{alien.alienData.name}</Link></span>
                  })}
                </td>
                <td>
                  {player.CampaignRankings[0]}
                </td>
                <td>
                  {player.CampaignRankings[1]}
                </td>
                <td>
                  {player.CampaignRankings[2]}
                </td>
                <td>
                  {player.CampaignRankings[3]}
                </td>
                <td>
                  {player.CampaignRankings[4]}
                </td>
                <td>
                  {player.CampaignRankings[5]}
                </td>
                <td>
                  {player.CampaignRankings[6]}
                </td>
                <td>
                  {player.CampaignRankings[7]}
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </>
  )
}

export default function CampaignViewPage() {

  const campaign = useRouteLoaderData("campaignID")

  return (
    <React.Suspense fallback={<Loading />}>
      <Await
        resolve={campaign.campaign}
        errorElement={
          <p>Error loading campaign!</p>
        }
      >
        {(campaign) => campaignPage(campaign)}
      </Await>
    </React.Suspense>
  );
}