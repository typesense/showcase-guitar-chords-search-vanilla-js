import { renderToString } from 'react-dom/server';
import Chord from '@tombatossals/react-chords/lib/Chord';

export default function RenderChord(chord) {
  return renderToString(
    Chord({
      chord,
      instrument: {
        strings: 6,
        fretsOnChord: 4,
        name: 'Guitar',
        keys: [],
        tunings: {
          standard: ['E', 'A', 'D', 'G', 'B', 'E'],
        },
      },
    })
  );
}
