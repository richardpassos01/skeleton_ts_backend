import {Settings} from '@settings';

export default class Authentication {
  constructor(
    private readonly token: string,
    private readonly type: string = 'bearer',
    private readonly expiresIn: string = Settings.timeToExpireAccessToken
  ) {}
}
