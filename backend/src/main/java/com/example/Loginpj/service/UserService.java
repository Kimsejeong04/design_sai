package com.example.Loginpj.service;

import com.example.Loginpj.mapper.UserMapper;
import com.example.Loginpj.model.User;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;
    
	public boolean isTelDuplicate(String tel) {
		return userMapper.findByTel(tel) != null;
	}
	
	public boolean isUsernameDuplicate(String username) {
		return userMapper.findByUsername(username) != null;
	}
	
	public boolean isValidPassword(String password) {
		if(password == null || password.trim().isEmpty()) {
			return false;
		}
		
		String regx = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$";
		return Pattern.matches(regx, password);
	}
	
    public boolean createUser(User user) {
        try {
        	userMapper.insertUser(user);
        	return true;
        } catch(Exception e) {
        	e.printStackTrace();
        	return false;
        }
    }
    
    public User login(String username, String password) {
        User user = userMapper.findByUsername(username); // findById 사용
        System.out.println("User fetched from DB: " + user);

        if (user != null && user.getPassword().equals(password)) {
            return user; // 로그인 성공
        }
        return null; // 로그인 실패
    }
	
}