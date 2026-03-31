package com.example.Loginpj.model;

public class Request {
    private Long requestId;
    private String title;
    private String categoryTags;
    private String style;
    private String amount;
    private String deadline;
    private String description;
    private String image1Url;
    private String image2Url;
    private String image3Url;   
    private String username; //user_info테이블에 있는 username을 join하기 위해 추가 
    private String requesterName; // user_info.name을 담을 필드

    public Request() {}

    public String getRequesterName() {
		return requesterName;
	}

	public void setRequesterName(String requesterName) {
		this.requesterName = requesterName;
	}

	public Request(Long requestId, String title, String categoryTags, String style, String amount, String deadline,
                   String description, String image1Url, String image2Url, String image3Url) {
        this.requestId = requestId;
        this.title = title;
        this.categoryTags = categoryTags;
        this.style = style;
        this.amount = amount;
        this.deadline = deadline;
        this.description = description;
        this.image1Url = image1Url;
        this.image2Url = image2Url;
        this.image3Url = image3Url;
    }

    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getRequestId() {
        return requestId;
    }
    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategoryTags() {
        return categoryTags;
    }
    public void setCategoryTags(String categoryTags) {
        this.categoryTags = categoryTags;
    }

    public String getStyle() {
        return style;
    }
    public void setStyle(String style) {
        this.style = style;
    }

    public String getAmount() {
        return amount;
    }
    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getDeadline() {
        return deadline;
    }
    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage1Url() {
        return image1Url;
    }
    public void setImage1Url(String image1Url) {
        this.image1Url = image1Url;
    }

    public String getImage2Url() {
        return image2Url;
    }
    public void setImage2Url(String image2Url) {
        this.image2Url = image2Url;
    }

    public String getImage3Url() {
        return image3Url;
    }
    public void setImage3Url(String image3Url) {
        this.image3Url = image3Url;
    }

    @Override
    public String toString() {
        return "Request{" +
                "requestId=" + requestId +
                ", title='" + title + '\'' +
                ", categoryTags='" + categoryTags + '\'' +
                ", style='" + style + '\'' +
                ", amount='" + amount + '\'' +
                ", deadline='" + deadline + '\'' +
                ", description='" + description + '\'' +
                ", image1Url='" + image1Url + '\'' +
                ", image2Url='" + image2Url + '\'' +
                ", image3Url='" + image3Url + '\'' +
                '}';
    }
}

