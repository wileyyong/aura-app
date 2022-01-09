import styled from 'styled-components';

export const Address = styled.button`
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 0 1px 1px #ccc;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  *:not(:last-child) {
    margin-right: 2rem;
  }

  a {
    text-decoration: none;
    padding: 0.1rem 0;
    border-bottom: 1px solid #ccc;
    color: #555;

    :hover {
      color: #222;
    }
  }
`;

export const Connect = styled.button`
  border-radius: 0.5rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.1);

  :hover {
    box-shadow: 0 0 1px 1px #ccc;
    transition: 0.25s all;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  align-items: center;
`;
