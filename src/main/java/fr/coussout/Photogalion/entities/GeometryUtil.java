package fr.coussout.Photogalion.entities;

import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;

public class GeometryUtil {
    public static final int SRID = 4326; //LatLng
    private static WKTReader wktReader = new WKTReader();

    private static Geometry wktToGeometry(String wellKnownText) {
        Geometry geometry = null;

        try {
            geometry = wktReader.read(wellKnownText);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println("###geometry :"+geometry);
        return geometry;
    }
    public static Geometry parseLocation(double x,double y) {
        Geometry geometry = GeometryUtil.wktToGeometry(String.format("POINT (%s %s)",x,y));
        geometry.setSRID(4326);
        return geometry;
    }

}
