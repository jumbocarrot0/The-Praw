import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ReactComponent as SearchLogo } from '../searchIcon.svg';

import {
  Container,
  Input,
  InputGroup,
  InputGroupText
} from 'reactstrap';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <Container>
      <section className="hero text-center">
        <h1 className="hero__title">The Praw</h1>
        <p className="hero__subtitle">A Fan-Made Website for <a href="https://futurepastimes.com/cosmic-encounter-board-game">Cosmic Encounter</a></p>
        <form onSubmit={(event) => {
          event.preventDefault();
          navigate({
              pathname: `/Aliens`,
              search: `?${createSearchParams([['search', searchQuery]])}`
          });
        }}>
          <InputGroup>
            <Input placeholder="Search the Cosmos"
              onChange={(e) => setSearchQuery(e.target.value)} />
            <InputGroupText>
              <SearchLogo />
            </InputGroupText>
          </InputGroup>
        </form>
      </section>
    </Container>
  );
}