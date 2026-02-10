import moduleAlias from 'module-alias';
import { join } from 'node:path';

moduleAlias.addAlias('@', join(__dirname, '..'));
