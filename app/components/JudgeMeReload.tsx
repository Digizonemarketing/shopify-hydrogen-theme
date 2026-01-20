import {useEffect} from 'react';
import {useLocation} from 'react-router';

export function JudgeMeReload({enabled = false}: {enabled?: boolean}) {
  const location = useLocation();

  useEffect(() => {
    if (!enabled) return;

    const w = window as any;
    const cacheServer = w?.jdgmCacheServer;

    if (typeof cacheServer?.reloadAllWidgets === 'function') {
      cacheServer.reloadAllWidgets();
      return;
    }

    if (typeof cacheServer?.reloadAll === 'function') {
      cacheServer.reloadAll();
    }
  }, [enabled, location.pathname, location.search]);

  return null;
}
