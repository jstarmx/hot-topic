import PropTypes from 'prop-types';
import React from 'react';
import { map } from 'lodash';

import ScoreBar from './score_bar';
import X from './icons/x';

const Topic = ({ id, topic, red, amber, green, remove }) => {
  const colors = { red, amber, green };
  const voteCount = red + amber + green;

  return (
    <tr>
      <td>
        <button className="dashboard__btn" onClick={() => remove(id)}>
          <X className="dashboard__x" />
        </button>
        {topic.replace(/%27/g, "'")}
      </td>
      {map(colors, (score, name) =>
        <td className={`dashboard__score dashboard__score--${name}`} key={name}>
          <ScoreBar voteCount={voteCount} score={score} color={name} />
          <span className="dashboard__score-text">
            {score}
          </span>
        </td>
      )}
    </tr>
  );
};

Topic.propTypes = {
  amber: PropTypes.number.isRequired,
  green: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  red: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};

export default Topic;
