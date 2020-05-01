import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1,
  h2 {
    font-family: 'Roboto';
    text-align: center;
  }

  div {
    a {
      font-family: 'Roboto';
      display: block;
      font-size: 18px;
      text-align: center;
      color: #f37135;
      line-height: 2;
    }
  }
`;
