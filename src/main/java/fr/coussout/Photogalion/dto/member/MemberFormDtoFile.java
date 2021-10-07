package fr.coussout.Photogalion.dto.member;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
public class MemberFormDtoFile {
        public String firstName;
        public String name;
        public String pseudo;
        public String mail;
        public String password;
        public Date birthday;
        public String color;
        public MultipartFile thumbnail;
}
