const pool = require('./pool');

const error = (err) => {
  console.log(err); // eslint-disable-line no-console
  return { error: err.message };
};

const getTitle = (room) => {
  const id = room.replace('session', '');
  return pool.query(`SELECT * FROM sessions WHERE id = ${id}`)
    .then(res => res.rows[0].title);
};

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
    .then(() => fetch(room))
    .catch(err => error(err));

const newSession = id =>
  pool.query(`CREATE TABLE session${id} (id SERIAL, topic TEXT, red INTEGER, amber INTEGER, green INTEGER)`)
    .then(fetch('sessions'))
    .then(() => id);

const getId = () =>
  pool.query('SELECT * FROM sessions ORDER BY id DESC LIMIT 1')
    .then(res => newSession(res.rows[0].id));

const create = () =>
  pool.query("INSERT INTO sessions(title) VALUES ('')")
    .then(getId);

const destroy = id =>
  update(`DELETE FROM sessions WHERE id = ${id}`, 'sessions')
    .then(fetch('sessions'));

const rename = (id, room, name) =>
  update(`UPDATE sessions SET title = '${name}' WHERE id = ${id}`, room)
    .then(fetch('sessions'));

const add = (room, topic) =>
  update(`INSERT INTO ${room}(topic, red, amber, green) VALUES ('${topic}', 0, 0, 0)`, room);

const remove = (room, id) =>
  update(`DELETE FROM ${room} WHERE id = ${id}`, room);

const current = room =>
  pool.query(`SELECT * FROM ${room} ORDER BY id DESC LIMIT 1`)
    .catch(err => error(err));

const vote = (room, score) =>
  current(room)
    .then((res) => {
      const latest = res.rows[0].id;
      const query = `UPDATE ${room} SET ${score} = ${score} + 1 WHERE id = ${latest}`;
      update(query, room);
    })
    .catch(err => error(err));

exports.fetch = fetch;
exports.create = create;
exports.destroy = destroy;
exports.rename = rename;
exports.add = add;
exports.remove = remove;
exports.vote = vote;
