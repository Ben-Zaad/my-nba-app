import {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {SketchPicker} from 'react-color'
import Switch from "react-switch";

import {Column, FlexBox, Row, ScrollableContainer} from "../components/styledComponents";
import {PlayerContext} from "../context/PlayerContext";

import BasketBallIcon from "../assets/basket_ball_icon.svg";
import GrayBasketBallIcon from "../assets/gray_basket_ball_icon.svg";
import RightArrow from "../assets/right_arrow_icon.svg"
import LeftArrow from "../assets/left_arrow_icon.svg"
import StarIcon from "../assets/star-icon.svg";


interface ColoredListProps {
    color: string;
}

export const HomePage = () => {
    const playersContext = useContext(PlayerContext);
    const {
        players,
        favorites,
        addFavorite,
        removeFavorite,
        isLoading,
        page,
        totalPages,
        setPlayerPage,
    } = playersContext;
    const [searchValue, setSearchValue] = useState("")
    const [listColor, setListColor] = useState("darkred")
    const [showPalette, setShowPalette] = useState(false)

    const TABLE_HEADERS = ['First Name', 'Last Name', 'Height', 'Position', 'Team']

    const handleKeys = (event: Partial<{ key: string; repeat: any; }>) => {
        if (event.key === "Enter" && !event.repeat && !isLoading) {
            setPlayerPage(1, searchValue)
        }
    }

    useEffect(() => {
        const inputElement = document;
        inputElement.addEventListener("keydown", handleKeys);
        return () => {
            inputElement.removeEventListener("keydown", handleKeys);
        };
    });

    const RenderTableTitle = (values: string[], key: string) => {
        return (<StyledRow key={key}>
            <StyledImage src={StarIcon}/>
            {values.map((value, index) => (
                <StyledListBox key={value + index}>{value}</StyledListBox>
            ))}
        </StyledRow>)
    }

    return (
        <HomePageContainer>
            <Row>
                <HalfScreenContainer>
                    <ColorCotainer >
                    <SearchContainer>
                        <SearchTitle>Enter Player's Name Here:</SearchTitle>
                        <StyledInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                        <SearchFieldButtonRow>
                            {page > 1 && players.length > 0 && totalPages &&
                              <ArrowButton onClick={() => setPlayerPage(page - 1, searchValue)}><StyledImage src={LeftArrow}/></ArrowButton>}
                            <SearchButton onClick={() => setPlayerPage( 1, searchValue)}>Search</SearchButton>
                            {page < totalPages &&
                              <ArrowButton onClick={() => setPlayerPage(page + 1, searchValue)}><StyledImage src={RightArrow}/></ArrowButton>}
                        </SearchFieldButtonRow>
                        Page {page} out of {totalPages}
                    </SearchContainer>
                    {RenderTableTitle(TABLE_HEADERS, 'title')}
                    <CustomScrollableContainer>
                        {isLoading ? <>Loading...</> : players?.map((player) => {
                            return (<StyledRow onClick={() => addFavorite(player)} key={player.key}>
                                <StyledImage src={favorites.filter(fav=>fav.id === player.id)?.length > 0 ? BasketBallIcon : GrayBasketBallIcon}/>
                                <StyledListBox>{player.firstName}</StyledListBox>
                                <StyledListBox>{player.lastName}</StyledListBox>
                                <StyledListBox>{player.height}</StyledListBox>
                                <StyledListBox>{player.position}</StyledListBox>
                                <StyledListBox>{player?.team?.teamName}</StyledListBox>
                            </StyledRow>)
                        })}
                    </CustomScrollableContainer>
                    </ColorCotainer>
                </HalfScreenContainer>
                <HalfScreenContainer>
                    <ColoredList color={listColor}>
                        <InputListColor>
                            <ColorListPadding>
                                <CenteredColumn>
                                    <SearchTitle>Type Here To Change This List Background Color:</SearchTitle>
                                    <StyledInput value={listColor} onChange={(e) => setListColor(e.target.value)}/>
                                    {showPalette &&
                                      <PaletteContainer>
                                        <SketchPicker color={listColor}
                                                      disableAlpha={true}
                                                      onChange={(a, b) => {
                                                          setListColor(a?.hex)
                                                      }
                                                      }
                                        />
                                      </PaletteContainer>
                                    }
                                    <SearchTitle>Or Press here to open a color palette:</SearchTitle>
                                    <Switch onChange={setShowPalette} checked={showPalette} />
                                </CenteredColumn>
                            </ColorListPadding>
                            {favorites.length > 0 &&
                                RenderTableTitle(TABLE_HEADERS, 'title')}
                            <FavoritesContainer>
                            {favorites.map((player => {
                                return (
                                    <StyledRow onClick={() => removeFavorite(player.id)} key={player.key + 'favorites'}>
                                        <StyledImage
                                            src={favorites.includes(player) ? BasketBallIcon : GrayBasketBallIcon}/>
                                        <StyledListBox>{player.firstName}</StyledListBox>
                                        <StyledListBox>{player.lastName}</StyledListBox>
                                        <StyledListBox>{player.height}</StyledListBox>
                                        <StyledListBox>{player.position}</StyledListBox>
                                        <StyledListBox>{player?.team?.teamName}</StyledListBox>
                                    </StyledRow>)
                            }))}
                            </FavoritesContainer>
                        </InputListColor>
                    </ColoredList>
                </HalfScreenContainer>
            </Row>
        </HomePageContainer>
    )
}

const HomePageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightslategray;
  overflow: hidden;
`

const CenteredColumn = styled(Column)`
  align-content: center;
  align-items: center;
  justify-content: space-between;
`

const SearchContainer = styled(CenteredColumn)`
  width: 100%;
  min-height: 10rem;
`

const InputListColor = styled(Column)`
  align-content: center;
  align-items: center;
  width: 100%;
  min-height: 8rem;
`

const StyledInput = styled.input`
  width: 20rem;
  height: 2rem;
  border-radius: 8px;
  padding: 0 0 0 1rem;
  border-width: 1px;

  &:focus {
    outline: none;
  }

`

const SearchTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 5px;
`

const SearchButton = styled.button`
  height: 30px;
  width: 80px;
  border-radius: 8px;
  border-width: 1px;
  background: linear-gradient(burlywood, whitesmoke, burlywood);
`

const StyledRow = styled(Row)`
  width: 100%;
  height: 2rem;
  align-items: center;
  background: linear-gradient(royalblue, cornflowerblue, royalblue);
  border-bottom: 1px solid darkblue;
  justify-content: space-around;
  text-align: left;
  cursor: pointer;
`

const SearchFieldButtonRow = styled(Row)`
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const StyledListBox = styled.div`
  width: 25%;
`

const HalfScreenContainer = styled(Column)`
  width: 50%;
`

const StyledImage = styled.img`
  width: 20px;
  height: 20px;
  padding-left: 1rem;
  padding-right: 1rem;
`
const ArrowButton = styled(FlexBox)`
  cursor: pointer;
  align-items: center;
`

const CustomScrollableContainer = styled(ScrollableContainer)`
  max-height: 70vh;
`

const ColoredList = styled(FlexBox)<ColoredListProps>`
  //background-color: ${p => p.color};
  background: linear-gradient(${p => p.color}, whitesmoke 80%, ${p => p.color});
  min-height: 100rem;
`

const ColorListPadding = styled.div`
  min-height: 10rem;
  text-align: center;
`

const PaletteContainer = styled.div`
  position: absolute;
  margin-left: 14rem;
  margin-top: 8rem;
//z-index: 2;
`

const ColorCotainer = styled.div`
  background: linear-gradient(darkred, whitesmoke 80%, darkred);
  height: 100%;
`

const FavoritesContainer = styled.div`
  width: 100%;
  overflow: scroll;
  max-height: 71.8vh;
`
