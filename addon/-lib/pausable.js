import { assert } from '@ember/debug';
import config from 'ember-get-config';

const { environment } = config;
const PAUSABLE = new Map();

export function _registerPauseOn(name, callback) {
  assert(`You cannot pause on the name '${name}' more than once`, !PAUSABLE.has(name));
  PAUSABLE.set(name, callback);
}

export function _reset() {
  PAUSABLE.clear();
}

export default function pausable(yieldable, name) {
  // Proceed if we're not testing or no pause was registered.
  if (environment !== 'test' || !PAUSABLE.has(name)) {
    return yieldable;
  }

  const callback = PAUSABLE.get(name);
  const result = callback(yieldable);

  return result;
}
