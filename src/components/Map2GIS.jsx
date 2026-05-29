import { useEffect, useRef } from "react";
import { load } from "@2gis/mapgl";

export default function Map2GIS() {
  const mapNodeRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      try {
        if (!mapNodeRef.current) return;

        const key = import.meta.env.VITE_2GIS_KEY;
        if (!key) {
          console.error("2GIS key is missing: VITE_2GIS_KEY");
          return;
        }

        const mapgl = await load();
        if (cancelled) return;

        mapInstanceRef.current = new mapgl.Map(mapNodeRef.current, {
          key,
          center: [76.839419, 43.198872],
          zoom: 17,
        });
      } catch (error) {
        console.error("2GIS map error:", error);
      }
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapNodeRef} style={{ width: "100%", height: "400px" }} />;
}
