import styled from "styled-components";
import {Column, FlexBox} from "../components/styledComponents";

export const HomePage = () => {
    return (
        <HomePageContainer>
            <SearchContainer>
                <Column>
                    <SearchTitle>Enter Player's Name Here:</SearchTitle>
                    <StyledInput/>
                </Column>
            </SearchContainer>
        </HomePageContainer>
    )
}

const HomePageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
`

const SearchContainer = styled(FlexBox)`
  align-content: center;
  width: 50%;
  height: 100%;
  background-color: red;
`

const StyledInput = styled.input`
  width: 30rem;
  height: 2rem;
`

const SearchTitle = styled.div`
  font-size: 14px;
`
