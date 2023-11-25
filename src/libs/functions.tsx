import { Word } from './types';

export function uniquePartsOfSpeech(dictionary: Word[]) {
  const result: Record<string, string> = {};
  const tmp: Record<string, string> = {};
  for (const word in dictionary) {
    if (dictionary[word].fl) tmp[dictionary[word].fl] = dictionary[word].fl;
  }
  Object.keys(tmp).sort().forEach(item => {
    result[item] = tmp[item];
  });
  return result;
}
