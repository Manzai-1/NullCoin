import path from 'path';
import { fileURLToPath } from 'url';

export const APP_DIR = path.dirname(fileURLToPath(import.meta.url));
export const INITIAL_BALANCE = 100;
