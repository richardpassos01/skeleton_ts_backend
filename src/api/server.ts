import * as Config from '../config';
import app from './app';

const server = app.listen(Config.application.port, () => {
  console.log(`Server running on port ${Config.application.port}`);
});

export default server;
