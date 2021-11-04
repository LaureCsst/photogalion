package fr.coussout.Photogalion.dto.station;

import lombok.Data;

import java.util.Date;

@Data
public class StationFormDto {
    public long id;
    public double longitude;
    public double lattitude;
}
