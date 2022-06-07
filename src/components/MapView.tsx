import { useContext, useRef, useLayoutEffect } from 'react';
import { PlacesContext, MapContext } from '../context';
import { Loading } from './Loading';

//@ts-ignore
import { Map } from 'mapbox-gl';

export function MapView() {
  /* Context func */
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      setMap(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapDiv}
      style={{
        height: '100vh',
        left: '0',
        position: 'fixed',
        top: '0',
        width: '100vw',
      }}
    >
      {userLocation?.join(',')}
    </div>
  );
}