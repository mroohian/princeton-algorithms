import { apartmentSelection, Block, Requirement } from './apartment_selection.ts';

const blocks: Block[] = [
  {
    gym: false,
    school: true,
    store: false,
  },
  {
    gym: true,
    school: false,
    store: false,
  },
  {
    gym: true,
    school: true,
    store: false,
  },
  {
    gym: false,
    school: true,
    store: false,
  },
  {
    gym: false,
    school: true,
    store: true,
  },
];

const requirements: Requirement[] = ['gym', 'school', 'store'];

const minBlock = apartmentSelection(blocks, requirements);

console.log(minBlock);