import React, { Component } from 'react';
import io from 'socket.io-client';
import { Line, HorizontalBar, Bar, Pie, Doughnut } from 'react-chartjs-2';

import { Container, ChartContainer, Title } from './styles';

interface DataProps {
  id: string;
  address: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  device: {
    vendor: string;
    model: string;
    type: string;
  };
  engine: { name: string; version: string };
  language: string;
  os: { name: string; version: string };
  page: string;
}

interface StateProps {
  data: DataProps[];
}

class Home extends Component<{}, StateProps> {
  state = {
    data: [] as DataProps[],
  };

  componentDidMount(): void {
    const socket = io('http://localhost:3000');
    socket.on('updateData', (data: any) => {
      console.log('data', data);
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;

    const usersPerPage: any = {};
    const usersPerSO: any = {};
    const usersPerBrowser: any = {};
    const usersPerLanguage: any = {};

    data.forEach((d) => {
      // USERS PER PAGE
      if (!usersPerPage[d.page]) {
        usersPerPage[d.page] = 0;
      }
      usersPerPage[d.page] += 1;

      // USERS PER SO
      if (!usersPerSO[d.os.name]) {
        usersPerSO[d.os.name] = 0;
      }
      usersPerSO[d.os.name] += 1;

      // USERS PER BROWSER
      if (!usersPerBrowser[d.browser.name]) {
        usersPerBrowser[d.browser.name] = 0;
      }
      usersPerBrowser[d.browser.name] += 1;

      // USERS PER BROWSER
      if (!usersPerLanguage[d.language]) {
        usersPerLanguage[d.language] = 0;
      }
      usersPerLanguage[d.language] += 1;
    });

    return (
      <>
        <Title>Conectados: {data.length}</Title>

        {data.length > 0 && (
          <Container>
            <div>
              <ChartContainer>
                <HorizontalBar
                  data={{
                    labels: Object.keys(usersPerPage) as string[],
                    datasets: [
                      {
                        label: 'Usuários por página',
                        backgroundColor: 'rgba(243,113,43,0.2)',
                        borderColor: 'rgba(243,113,43,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(243,113,43,0.4)',
                        hoverBorderColor: 'rgba(243,113,43,1)',
                        data: Object.values(usersPerPage) as number[],
                      },
                    ],
                  }}
                  width={100}
                  height={50}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </ChartContainer>
              <ChartContainer>
                <Bar
                  data={{
                    labels: Object.keys(usersPerBrowser) as string[],
                    datasets: [
                      {
                        label: 'Usuários por Browser',
                        backgroundColor: 'rgba(243,113,43,0.2)',
                        borderColor: 'rgba(243,113,43,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(243,113,43,0.4)',
                        hoverBorderColor: 'rgba(243,113,43,1)',
                        data: Object.values(usersPerBrowser) as number[],
                      },
                    ],
                  }}
                  width={100}
                  height={50}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </ChartContainer>
            </div>
            <div>
              <ChartContainer>
                <Doughnut
                  data={{
                    labels: Object.keys(usersPerLanguage) as string[],
                    datasets: [
                      {
                        label: 'Usuários por Idioma',
                        backgroundColor: 'rgba(243,113,43,0.2)',
                        borderColor: 'rgba(243,113,43,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(243,113,43,0.4)',
                        hoverBorderColor: 'rgba(243,113,43,1)',
                        data: Object.values(usersPerLanguage) as number[],
                      },
                    ],
                  }}
                  width={100}
                  height={50}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </ChartContainer>
              <ChartContainer>
                <Pie
                  data={{
                    labels: Object.keys(usersPerSO) as string[],
                    datasets: [
                      {
                        data: Object.values(usersPerSO) as number[],
                        backgroundColor: ['#F37135', '#0B6E45', '#FFCE56'],
                        hoverBackgroundColor: ['#F37135', '#0B6E45', '#FFCE56'],
                      },
                    ],
                  }}
                  width={100}
                  height={50}
                />
              </ChartContainer>
            </div>
          </Container>
        )}
      </>
    );
  }
}

export default Home;
