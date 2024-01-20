import './style.css';
import './styles/heading.css';
import './styles/searchAndFilter.css';
import './styles/infiniteHits.css';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import instantsearch from 'instantsearch.js';
import {
  configure,
  infiniteHits,
  refinementList,
} from 'instantsearch.js/es/widgets';

const adapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: import.meta.env.VITE_TYPESENSE_SEARCH_ONLY || 'xyz',
    nodes: [
      {
        host: import.meta.env.VITE_TYPESENSE_HOST || 'localhost',
        port: parseInt(import.meta.env.VITE_TYPESENSE_PORT || '8108'),
        protocol: import.meta.env.VITE_TYPESENSE_PROTOCOL || 'http',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'key,suffix',
    num_typos: 0,
  },
});

const search = instantsearch({
  indexName: 'guitar-chords',
  searchClient: adapter.searchClient,
  future: {
    preserveSharedStateOnUnmount: true,
  },
});

search.addWidgets([
  configure({
    hitsPerPage: 12,
    enablePersonalization: true,
  }),
  infiniteHits({
    container: '#infiniteHits',
    templates: {
      item(hit, { html, components }) {
        return html`
          <h2>
            ${components.Highlight({ attribute: 'key', hit })}${hit.suffix}
          </h2>
        `;
      },
    },
  }),
  // Refinement lists
  refinementList({
    container: '#key_refinementList',
    attribute: 'key',
    sortBy: ['name'],
  }),
  refinementList({
    container: '#suffix_refinementList',
    attribute: 'suffix',
    limit: 8,
    showMore: true,
    showMoreLimit: 100,
    searchable: true,
    searchablePlaceholder: 'Search suffixes...',
  }),
  refinementList({
    container: '#capo_refinementList',
    attribute: 'positions.capo',
  }),
]);

search.start();
