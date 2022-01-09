import React, {
  FC,
  ReactElement,
  RefObject,
  useLayoutEffect,
  useRef,
} from 'react';

import useOnClickOutside from 'use-onclickoutside';
import {
  FixedContainer,
  Header,
  Title,
  CloseButton,
  Container,
} from './styles';

interface Props {
  className?: string;
  title: ReactElement | string;
  hideModal?(): void;
  onExited(): void;
}

export const Modal: FC<Props> = ({ children, title, className, hideModal }) => {
  const fixedRef = useRef<HTMLDivElement>(null as never);
  const modalRef = useRef<HTMLDivElement>(null as never);

  useOnClickOutside(modalRef as RefObject<HTMLDivElement>, event => {
    if (event.target === fixedRef.current) {
      hideModal?.();
    }
  });

  useLayoutEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hideModal?.();
    };
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [hideModal]);

  return (
    <FixedContainer ref={fixedRef}>
      <Container className={className} ref={modalRef}>
        <Header>
          <Title>{title}</Title>
          {hideModal && <CloseButton onClick={hideModal}>✕</CloseButton>}
        </Header>
        {children}
      </Container>
    </FixedContainer>
  );
};
