import styled from 'styled-components';

export const Title = styled.h1`
  font-family: 'Roboto';
`;

export const Container = styled.div`
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  height: 80vh;

  display: flex;
  flex-direction: row;
  /* align-items: center;
  justify-content: center; */

  h1,
  h2 {
    font-family: 'Roboto';
  }

  div {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;

    /* background-color: blue; */
    a {
      font-family: 'Roboto';
      display: block;
      font-size: 18px;
      text-align: center;
      color: #f37135;
      /* text-decoration: none; */
      line-height: 2;
    }
  }
`;

export const ChartContainer = styled.div`
  width: 400px;
  height: 300px;
`;
