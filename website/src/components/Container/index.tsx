import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import { Container } from './styles';
import { getInfos } from '../../utils/getInfos';

interface ContainerProps {
  title: string;
  subtitle: string;
}

interface ContainerState {
  socket?: SocketIOClient.Socket;
}

class ContainerComponent extends Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    this.state = {
      // socket: {},
    };
  }

  componentDidMount(): void {
    const infos = getInfos(window);
    console.log('infos', infos);
    const socket = io('http://localhost:3000', {
      query: { infos: JSON.stringify(infos) },
    });
    this.setState({ socket });
  }

  componentWillUnmount(): void {
    const { socket } = this.state;
    if (socket) socket.disconnect();
  }

  render(): React.ReactChild {
    const { title, subtitle } = this.props;
    return (
      <Container>
        <img
          src="/images/caqui-logo.png"
          alt="Usando Socket IO na prática com NodeJS e ReactJS"
        />
        <h1>{title}</h1>
        <h2>{subtitle}</h2>

        <div>
          <Link to="/">Home</Link>
          <Link to="/pagina-1">Página 1</Link>
          <Link to="/pagina-2">Página 2</Link>
        </div>
      </Container>
    );
  }
}

export default ContainerComponent;
