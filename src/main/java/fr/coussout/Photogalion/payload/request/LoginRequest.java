package fr.coussout.Photogalion.payload.request;


import javax.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank
    private String membername;

    @NotBlank
    private String password;

    public String getMembername() {
        return membername;
    }

    public void setMembername(String membername) {
        this.membername = membername;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}