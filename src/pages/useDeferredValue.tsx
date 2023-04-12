import { Suspense, useState, use, useDeferredValue } from "react";

// useDeferredValue lets you defer re-rendering a non-urgent part of the tree.
// It is similar to debouncing, but has a few advantages compared to it.
// There is no fixed time delay, so React will attempt the deferred render right after the first render is reflected on the screen.
// The deferred render is interruptible and doesn’t block user input.

export default function Search() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <div className="p-4">
      <div className="form-control max-w-sm">
        <label className="label" htmlFor="query">
          Search albums
        </label>
        <input
          className="input input-bordered"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Suspense fallback={<h2 className="text-2xl m-4">Loading...</h2>}>
        <SearchResults
          // query={query}
          query={deferredQuery}
        />
      </Suspense>
    </div>
  );
}

function SearchResults({ query }: { query: string }) {
  if (query === "") {
    return null;
  }
  const albums = use<Album[]>(fetchData(`/search?q=${query}`));
  if (albums.length === 0) {
    return (
      <p className="text-lg my-4">
        No matches for <i>{query}</i>
      </p>
    );
  }
  return (
    <ul className="text-lg my-4">
      {albums.map((album: { id: number; title: string; year: number }) => (
        <li className="mb-1" key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}

let cache = new Map();

export function fetchData(url: string) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url: string) {
  if (url.startsWith("/search?q=")) {
    return await getSearchResults(url.slice("/search?q=".length));
  } else {
    throw Error("Not implemented");
  }
}

interface Album {
  id: number;
  title: string;
  year: number;
}

// mock api
async function getSearchResults(query: string): Promise<Album[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  const allAlbums = [
    {
      id: 13,
      title: "Let It Be",
      year: 1970,
    },
    {
      id: 12,
      title: "Abbey Road",
      year: 1969,
    },
    {
      id: 11,
      title: "Yellow Submarine",
      year: 1969,
    },
    {
      id: 10,
      title: "The Beatles",
      year: 1968,
    },
    {
      id: 9,
      title: "Magical Mystery Tour",
      year: 1967,
    },
    {
      id: 8,
      title: "Sgt. Pepper's Lonely Hearts Club Band",
      year: 1967,
    },
    {
      id: 7,
      title: "Revolver",
      year: 1966,
    },
    {
      id: 6,
      title: "Rubber Soul",
      year: 1965,
    },
    {
      id: 5,
      title: "Help!",
      year: 1965,
    },
    {
      id: 4,
      title: "Beatles For Sale",
      year: 1964,
    },
    {
      id: 3,
      title: "A Hard Day's Night",
      year: 1964,
    },
    {
      id: 2,
      title: "With The Beatles",
      year: 1963,
    },
    {
      id: 1,
      title: "Please Please Me",
      year: 1963,
    },
  ];

  const lowerQuery = query.trim().toLowerCase();
  return allAlbums.filter((album) => {
    const lowerTitle = album.title.toLowerCase();
    return (
      lowerTitle.startsWith(lowerQuery) ||
      lowerTitle.indexOf(" " + lowerQuery) !== -1
    );
  });
}
