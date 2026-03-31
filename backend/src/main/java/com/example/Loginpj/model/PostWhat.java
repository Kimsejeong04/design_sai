package com.example.Loginpj.model;

public class PostWhat {
    private Long postnum;
    private String id;
    private String contents;
    private String image1;
    private String image2;
    private String image3;
    private String image4;

    // Getters
    public Long getPostnum() { return postnum; }
    public String getId() { return id; }
    public String getContents() { return contents; }
    public String getImage1() { return image1; }
    public String getImage2() { return image2; }
    public String getImage3() { return image3; }
    public String getImage4() { return image4; }

    // Setters
    public void setPostnum(Long postnum) { this.postnum = postnum; }
    public void setId(String id) { this.id = id; }
    public void setContents(String contents) { this.contents = contents; }
    public void setImage1(String image1) { this.image1 = image1; }
    public void setImage2(String image2) { this.image2 = image2; }
    public void setImage3(String image3) { this.image3 = image3; }
    public void setImage4(String image4) { this.image4 = image4; }

    @Override
    public String toString() {
        return "PostWhat{" +
                "postnum='" + postnum + '\'' +
                ", id='" + id + '\'' +
                ", contents='" + contents + '\'' +
                ", image1='" + image1 + '\'' +
                ", image2='" + image2 + '\'' +
                ", image3='" + image3 + '\'' +
                ", image4='" + image4 + '\'' +
                '}';
    }
}