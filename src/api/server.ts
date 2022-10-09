import Settings from '../settings/Settings';
import app from './app';

const server = app.build();
server.listen(Settings.port, () => {
  console.log(`server started at http://localhost:${Settings.port}`);
});
