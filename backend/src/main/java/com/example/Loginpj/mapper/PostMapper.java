package com.example.Loginpj.mapper;

import com.example.Loginpj.model.PostWhat;
import com.example.Loginpj.model.wishlist_client;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {
    void createPost(PostWhat post);
    List<PostWhat> getAllPosts();
    void addToWishlist(wishlist_client wishlist);
    List<PostWhat> getWishlistByClient(String clientId);
    void removeFromWishlist(wishlist_client wishlist);
}