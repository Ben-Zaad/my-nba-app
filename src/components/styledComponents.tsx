import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  
  background-color: black;
`

export const FlexBox = styled.div`
  display: flex;
`

export const Row = styled(FlexBox)`
  flex-direction: row;
`

export const Column = styled(FlexBox)`
  flex-direction: column;
`

export const ScrollableContainer = styled.div`
  overflow-y: scroll;
`
