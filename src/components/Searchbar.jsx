import { useState } from "react";
import { createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { ReactComponent as SearchLogo } from '../svg/searchIcon.svg';

import {
    Input,
    InputGroup,
    Form,
    Button
} from 'reactstrap';

export default function Searchbar(props) {
    const searchParams = useSearchParams()[0];
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const navigate = useNavigate();

    return (
        <Form onSubmit={
            (event) => {
                event.preventDefault();
                navigate({
                    pathname: `/Search`,
                    search: `?${createSearchParams([['search', searchQuery]])}`
                });
            }}>
            <InputGroup>
                <Input
                    className="fs-5"
                    placeholder={props.placeholder}
                    value={searchQuery}
                    onChange={(e) => {
                        if (!/[^ \p{L}+|\p{M}+\d\-,'/+\\,:.!?]/.test(e.target.value)) {
                            setSearchQuery(e.target.value)
                        }
                    }} />
                {/* <InputGroupText>
                    <SearchLogo />
                </InputGroupText> */}
                <Button
                    aria-label="Submit search"
                    className="px-3"
                    color={searchQuery.length === 0 ? "secondary" : "primary"}
                    disabled={searchQuery.length === 0}>
                    <SearchLogo />
                </Button>
            </InputGroup>
        </Form>
    )
}