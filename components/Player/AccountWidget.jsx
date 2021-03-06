import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import { REDUCER_KEY } from '../../reducers';
import { getPlayer } from '../../actions';
import { Link } from 'react-router';

const AccountWidget = ({ loading, error, player }) => {
  return (
    <div>
      { loading && !error && <Spinner />}
      { error && <div >Error</div>}
      { !error && !loading && player ? (
          <div>
            <li><Link to={`/players/${player.account_id}`}>Profile</Link></li>
            <li><a href='/logout'>Logout</a></li>
          </div>
        )
        : <li><a href='/login'>Login</a></li>
      }
    </div>
  );
};

class AccountWidgetWrapper extends React.Component {
  componentDidMount() {
    this.props.getPlayer(this.props.playerId);
  }

  render() {
    return <AccountWidget { ...this.props } />;
  }
};

export { AccountWidget };

const mapStateToProps = (state) => {
  const { error, loading, player } = state[REDUCER_KEY].gotPlayer;
  
  return {
    loading,
    error,
    player
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayer: (playerId) => dispatch(getPlayer(playerId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidgetWrapper);
