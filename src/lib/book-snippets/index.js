import CountOfMonteCristo from 'app/lib/book-snippets/CountOfMonteCristo.js';
import PictureOfDorianGray from 'app/lib/book-snippets/PictureOfDorianGray.js';
import PrideAndPrejudice from 'app/lib/book-snippets/PrideAndPrejudice.js';
import ScandalInBohemia from 'app/lib/book-snippets/ScandalInBohemia.js';
import TaleOfTwoCities from 'app/lib/book-snippets/TaleOfTwoCities.js';

const snippets = {
  'count-of-monte-cristo': {
    title: 'The Count of Monte Cristo',
    component: CountOfMonteCristo,
  },
  'picture-of-dorian-gray': {
    title: 'The Picture of Dorian Gray',
    component: PictureOfDorianGray,
  },
  'pride-and-prejudice': {
    title: 'Pride and Prejudice',
    component: PrideAndPrejudice,
  },
  'scandal-in-bohemia': {
    title: 'A Scandal in Bohemia',
    component: ScandalInBohemia,
  },
  'tale-of-two-cities': {
    title: 'A Tale of Two Cities',
    component: TaleOfTwoCities,
  },
};

export default snippets;
