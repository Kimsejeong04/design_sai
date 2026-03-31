package com.example.Loginpj.service;

import com.example.Loginpj.mapper.PostMapper;
import com.example.Loginpj.model.PostWhat;
import com.example.Loginpj.model.wishlist_client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostMapper postMapper;

    // 글 저장
    public void createPost(PostWhat post) {
        postMapper.createPost(post);
    }
    
    // 모든 글 조회
    public List<PostWhat> getAllPosts() {
        return postMapper.getAllPosts();
    }
    
    // 찜 추가 
    public void addToWishlist(wishlist_client wishlist) {
    	System.out.println("addToWishlist 호출됨: " + wishlist);
    	postMapper.addToWishlist(wishlist);
    }

    public List<PostWhat> getWishlistByClient(String clientId) {
        return postMapper.getWishlistByClient(clientId);
    }
    
    @Transactional
    public void removeFromWishlist(wishlist_client wishlist) {
        postMapper.removeFromWishlist(wishlist);
    }

}
