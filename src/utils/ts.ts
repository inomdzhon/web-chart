import { now } from './now';

export function ts(): number {
  return Math.ceil(now() / 1000);
}
