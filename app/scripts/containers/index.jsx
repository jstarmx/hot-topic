import { connect } from 'react-redux';

import Index from '../components/index';
import {
  createSession,
  destroySession,
} from '../actions/sessions';

const mapDispatchToProps = {
  createSession,
  destroySession,
};

export default connect(state => state, mapDispatchToProps)(Index);
