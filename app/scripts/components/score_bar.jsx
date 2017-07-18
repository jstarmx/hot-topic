import PropTypes from 'prop-types';
import { h } from 'preact';

const ScoreBar = ({ voteCount, score, color }) => {
  const classList = `dashboard__score-bg dashboard__score-bg--${color}`;
  const height = score / voteCount * 100;

  return <span className={classList} style={{ height: `${height}%` }} />;
};

ScoreBar.propTypes = {
  color: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  voteCount: PropTypes.number.isRequired,
};

export default ScoreBar;
