package fr.coussout.Photogalion.dto.picture;

import lombok.Data;
import java.util.Date;

@Data
public class PictureFormDto {
    public long id;
    public String name;
    public Date date;
    public String image;
    public long memberId;
    public double[] stations;
    public long eventId;
}
