import { useState } from "react";
import { createSearchParams, useNavigate
  // , useSearchParams 
} from 'react-router-dom'
import { ReactComponent as SearchLogo } from '../searchIcon.svg';

import {
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Form
} from 'reactstrap';

import Aliens from '../dataFiles/aliens.json';

export default function Home() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <Container>
      <section className="hero text-center">
        <h1 className="hero__title">The Praw</h1>
        <p className="hero__subtitle">A Fan-Made Website for <a href="https://futurepastimes.com/cosmic-encounter-board-game">Cosmic Encounter</a></p>
        <Form onSubmit={
            (event) => {
              event.preventDefault();
              let results = Object.entries(Aliens.aliens)
              results = results.filter((alien) => alien[1].original.name.toLowerCase().includes(searchQuery.toLowerCase()))
              if (results.length === 1) {
                navigate({
                  pathname: `/Aliens/${Object.keys(results)[0]}`
                });
              } else {
                navigate({
                  pathname: `/Aliens`,
                  search: `?${createSearchParams([['search', searchQuery]])}`
                });
              }
            }}>
          <InputGroup>
            <Input placeholder="Search the Cosmos"
              value = {searchQuery}
              onChange={(e) => {
                if (!/[^A-Za-z0-9\-,]/.test(e.target.value)){
                  setSearchQuery(e.target.value)
                }
              }} />
            <InputGroupText>
              <SearchLogo />
            </InputGroupText>
          </InputGroup>
        </Form>
      </section>
    </Container>
  );
}