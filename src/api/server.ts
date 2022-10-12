import {Settings} from '@settings';
import app from './app';

app.listen(Settings.port, () => {
  console.log(`server started at http://localhost:${Settings.port}`);
});
