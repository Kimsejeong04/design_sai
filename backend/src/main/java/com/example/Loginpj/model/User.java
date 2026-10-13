package com.example.Loginpj.model;


public class User {
	private String username;
	private String password;
	private String email;
	private String usertype;
	private String birthdate;
	private String tel;
	private String name;
	private String gender;
	private String profileImageUrl;
	
	//getter
	public String getUsername() {
		return username;
	}
	
	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}
	
	public String getUsertype() {
		return usertype;
	}
	
	public String getBirthdate() {
		return birthdate;
	}
	
	public String getTel() {
		return tel;
	}
	
	public String getName() {
		return name;
	}
	
	public String getGender() {
		return gender;
	}
	
	public String getProfileImageUrl() {
		return profileImageUrl;
	}
	

	//setter
	
	public void setUsername(String username) {
		this.username= username;
	}
	
	public void setPassword(String password) {
		this.password= password;
	}
	
	public void setEmail(String email) {
		this.email= email;
	}

	public void setUserType(String usertype) {
		this.usertype= usertype;
	}
	
	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}


	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}

	
	
	@Override
	public String toString() {
	    return "User{" +
	            "username='" + username + '\'' +
	            ", password='" + password + '\'' +
	            ", email='" + email + '\'' +
	            ", usertype='" + usertype + '\'' +
	            ", birthdate='" + birthdate + '\'' +
	            ", tel='" + tel + '\'' +
	            ", name='" + name + '\'' +
	            ", gender='" + gender + '\'' +
	            '}';
	}
}