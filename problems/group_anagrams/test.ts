import { groupAnagrams } from "./group_anagrams.ts";

const input = [
  'hos','jew','nub','cod','old','way','phd','sup',
  'fur','fla','cot','baa','leo','uzi','tho','pry',
  'tun','hex','fog','tad','eat','sow','cop','eke',
  'jam','arc','guy','tow','aid','ann','bus','ten',
  'ate','ewe','roy','leg','gas','bug','jay','net'
];

const result = groupAnagrams(input);

console.log({ input, result });
