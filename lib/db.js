const pool = require('./pool');

const error = (err) => {
  console.error(err); // eslint-disable-line no-console
  return { error: err.message };
};

const roomId = room => room.replace('session', '');

const getTitle = room =>
  pool.query(`SELECT * FROM sessions WHERE id = ${roomId(room)}`)
    .then(res => res.rows[0].title);

const fetch = (room) => {
  const payload = { room };

  return pool.query(`SELECT * FROM ${room}`)
    .then((res) => {
      payload.data = res.rows;
      return room !== 'sessions' ? getTitle(room) : Promise.resolve;
    })
    .then((title) => {
      payload.title = title;
      return payload;
    })
    .catch(err => error(err));
};

const update = (query, room) =>
  pool.query(query)
    .then(() => (room ? fetch(room) : Promise.resolve))
    .catch(err => error(err));

const newSession = id =>
  pool.query(`CREATE TABLE session${id} (id SERIAL, topic TEXT, red INTEGER, amber INTEGER, green INTEGER)`)
    .then(() => id)
    .catch(err => error(err));

const getId = () =>
  pool.query('SELECT * FROM sessions ORDER BY id DESC LIMIT 1')
    .then(res => newSession(res.rows[0].id))
    .catch(err => error(err));

const create = () =>
  pool.query("INSERT INTO sessions(title, created) VALUES ('', CURRENT_TIMESTAMP)")
    .then(getId)
    .catch(err => error(err));

const destroy = id =>
  update(`DELETE FROM sessions WHERE id = ${id}`)
  .then(() => update(`DROP TABLE session${id}`, 'sessions'));

const rename = (room, id, name) =>
  update(`UPDATE sessions SET title = '${name}' WHERE id = ${id}`, room);

const add = (room, topic) =>
  update(`INSERT INTO ${room}(topic, red, amber, green) VALUES ('${topic}', 0, 0, 0)`, room);

const remove = (room, id) =>
  update(`DELETE FROM ${room} WHERE id = ${id}`, room);

const vote = (room, id, score) =>
  update(`UPDATE ${room} SET ${score} = ${score} + 1 WHERE id = ${id}`, room);

exports.fetch = fetch;
exports.create = create;
exports.destroy = destroy;
exports.rename = rename;
exports.add = add;
exports.remove = remove;
exports.vote = vote;
