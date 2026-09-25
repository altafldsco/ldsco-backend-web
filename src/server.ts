import dotenv from 'dotenv';
dotenv.config({ override: true });
import { createApp } from './app';
import { sequelize } from './db/models';
import { UPLOAD_ROOT } from './middleware/upload';

const PORT = Number(process.env.PORT || 4000);

async function main() {
  await sequelize.authenticate();
  const app = createApp();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`LDSCO backend API listening on http://localhost:${PORT}`);
    // eslint-disable-next-line no-console
    console.log(`Saving uploads to ${UPLOAD_ROOT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err);
  process.exit(1);
});
