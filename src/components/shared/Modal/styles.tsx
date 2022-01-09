import styled from 'styled-components';

export const Title = styled.div`
  font-size: 1.25rem;
  flex: 1;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  position: relative;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px black solid;

  > div:last-child {
    position: absolute;
    right: 1rem;
  }
`;

export const CloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
`;

export const Container = styled.div`
  position: absolute;
  width: inherit;
  max-width: inherit;
  transition: all ease-in;
  background: grey;
  border: 1px solid ${({ theme }) => theme.color.black};
  overflow: hidden;

  width: 32rem;
  padding: 1rem 1rem 1.5rem;
  > *:not(:last-child) {
    margin-bottom: 0;
  }
`;

export const FixedContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  @supports (backdrop-filter: blur(0.25em)) {
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(0.25em);
  }
`;
