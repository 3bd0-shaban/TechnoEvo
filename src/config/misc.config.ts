import { ConfigType, registerAs } from '@nestjs/config';

import { env } from '~/global/env';

export const MiscRegToken = 'misc';

export const MiscConfig = registerAs(MiscRegToken, () => ({
  upload_path: env('UPLOAD_PATH'),
}));

export type IMiscConfig = ConfigType<typeof MiscConfig>;
