import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { ApolloProvider } from 'react-apollo';
import enMessages from 'lang/en';
import { store } from 'core';
import Dashboard from 'containers/Main/Dashboard';
import Faucet from 'containers/Main/Faucet';
import Vote from 'containers/Main/Vote';
import STRK from 'containers/Main/STRK';
import Market from 'containers/Main/Market';
import MarketDetail from 'containers/Main/MarketDetail';
import VoteOverview from 'containers/Main/VoteOverview';
import ProposerDetail from 'containers/Main/ProposerDetail';
import VoterLeaderboard from 'containers/Main/VoterLeaderboard';
import Forbidden from 'containers/Main/Forbidden';
import Staking from 'containers/Main/Staking';
import Liquidator from 'containers/Main/Liquidator/Liquidator';
import Vault from 'containers/Main/Vault';
import { client } from '../apollo/client';
import Theme from './Theme';
import 'assets/styles/App.scss';
import History from './Main/History/History';

addLocaleData([...en]);
const initialLang = 'en';

const messages = {
  en: enMessages
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: initialLang
    };
  }

  render() {
    const { lang } = this.state;
    const message = messages[lang];
    return (
      <Theme>
        <ApolloProvider client={client}>
          <IntlProvider locale={lang} messages={message}>
            <Provider store={store}>
              <BrowserRouter>
                <Switch
                  atEnter={{ opacity: 0 }}
                  atLeave={{ opacity: 0.5 }}
                  atActive={{ opacity: 1 }}
                  className="switch-wrapper"
                >
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/vote" component={Vote} />
                  <Route exact path="/strk" component={STRK} />
                  <Route exact path="/market" component={Market} />
                  <Route exact path="/market/:asset" component={MarketDetail} />
                  <Route exact path="/forbidden" component={Forbidden} />
                  <Route exact path="/history" component={History} />
                  <Route exact path="/staking" component={Staking} />
                  <Route exact path="/liquidator" component={Liquidator} />
                  <Route exact path="/vault" component={Vault} />
                  <Route
                    exact
                    path="/vote/leaderboard"
                    component={VoterLeaderboard}
                  />
                  <Route
                    exact
                    path="/vote/proposal/:id"
                    component={VoteOverview}
                  />
                  <Route
                    exact
                    path="/vote/address/:address"
                    component={ProposerDetail}
                  />
                  {process.env.REACT_APP_ENV === 'prod' && (
                    <Route exact path="/faucet" component={Faucet} />
                  )}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </BrowserRouter>
            </Provider>
          </IntlProvider>
        </ApolloProvider>
      </Theme>
    );
  }
}

export default App;
