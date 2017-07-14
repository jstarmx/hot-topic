import { connect } from 'react-redux';

import Vote from '../components/vote';
import { fetchSession, vote } from '../actions/sessions';

const mapDispatchToProps = { fetchSession, vote };

export default connect(({ session }) => session, mapDispatchToProps)(Vote);
