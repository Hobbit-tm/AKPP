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

        const mapgl = await load();

        if (cancelled) return;

        mapInstanceRef.current = new mapgl.Map(mapNodeRef.current, {
          key: "YOUR_2GIS_API_KEY",
          center: [76.889709, 43.238293],
          zoom: 13,
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
