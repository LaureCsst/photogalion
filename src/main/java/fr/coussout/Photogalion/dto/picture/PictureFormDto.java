package fr.coussout.Photogalion.dto.picture;

import lombok.Data;
import java.util.Date;

@Data
public class PictureFormDto {
    public String name;
    public Date date;
    public String image;
    public Long memberId;
    public Long stationId;
    public Long eventId;
}
