package com.example.Loginpj.controller;

import com.example.Loginpj.model.PostWhat;
import com.example.Loginpj.model.wishlist_client;
import com.example.Loginpj.service.PostService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class UsingSessionPrac {

    @Autowired
    private PostService postService;

    // 기존 글 생성 (JSON 기반)
    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody PostWhat post, HttpSession session) {
        String name = (String) session.getAttribute("username");

        if (name == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        
        post.setId(name);
        post.setPostnum(System.currentTimeMillis());
        System.out.println("들어오는거: " + post);

        postService.createPost(post);
        return ResponseEntity.ok("글이 저장되었습니다.");
    }

    // 이미지 포함 글 생성 (Multipart 기반)
    @PostMapping(value = "/with-images", consumes = "multipart/form-data")
    public ResponseEntity<String> createPostWithImages(
            @RequestParam("contents") String contents,
            @RequestParam(value = "image1", required = false) MultipartFile image1,
            @RequestParam(value = "image2", required = false) MultipartFile image2,
            @RequestParam(value = "image3", required = false) MultipartFile image3,
            @RequestParam(value = "image4", required = false) MultipartFile image4,
            HttpSession session) {

        String name = (String) session.getAttribute("username");

        if (name == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        PostWhat post = new PostWhat();
        post.setId(name);
        post.setContents(contents);
        post.setPostnum(System.currentTimeMillis());

        // 디버깅 로그 추가
        System.out.println("Received contents: " + contents);
        System.out.println("Image1: " + (image1 != null ? image1.getOriginalFilename() : "null"));
        System.out.println("Image2: " + (image2 != null ? image2.getOriginalFilename() : "null"));
        System.out.println("Image3: " + (image3 != null ? image3.getOriginalFilename() : "null"));
        System.out.println("Image4: " + (image4 != null ? image4.getOriginalFilename() : "null"));

        // C:/Portfolio 디렉토리에 이미지 저장
        Path portfolioDir = Paths.get("C:/Portfolio");
        if (!Files.exists(portfolioDir)) {
            try {
                Files.createDirectories(portfolioDir);
            } catch (IOException e) {
                return ResponseEntity.status(500).body("디렉토리 생성 실패: " + e.getMessage());
            }
        }

        // 이미지 업로드 및 경로 설정
        try {
            if (image1 != null && !image1.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + image1.getOriginalFilename();
                Path filePath = portfolioDir.resolve(fileName);
                image1.transferTo(filePath.toFile());
                post.setImage1("/api/posts/view/" + fileName);
            } else {
                post.setImage1(null);
            }
            if (image2 != null && !image2.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + image2.getOriginalFilename();
                Path filePath = portfolioDir.resolve(fileName);
                image2.transferTo(filePath.toFile());
                post.setImage2("/api/posts/view/" + fileName);
            } else {
                post.setImage2(null);
            }
            if (image3 != null && !image3.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + image3.getOriginalFilename();
                Path filePath = portfolioDir.resolve(fileName);
                image3.transferTo(filePath.toFile());
                post.setImage3("/api/posts/view/" + fileName);
            } else {
                post.setImage3(null);
            }
            if (image4 != null && !image4.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + image4.getOriginalFilename();
                Path filePath = portfolioDir.resolve(fileName);
                image4.transferTo(filePath.toFile());
                post.setImage4("/api/posts/view/" + fileName);
            } else {
                post.setImage4(null);
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
        }

        postService.createPost(post);
        return ResponseEntity.ok("포트폴리오가 저장되었습니다.");
    }

    @GetMapping
    public ResponseEntity<List<PostWhat>> getAllPosts() {
        List<PostWhat> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/like/{postnum}")
    public ResponseEntity<String> addToWishlist(@PathVariable Long postnum, HttpSession session) {
        String clientId = (String) session.getAttribute("username");
        System.out.println("찜하기 호출 - clientId: " + clientId + ", postnum: " + postnum);
        
        if (clientId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        wishlist_client wishlist = new wishlist_client();
        wishlist.setClientId(clientId);
        wishlist.setPostnum(postnum);

        postService.addToWishlist(wishlist);

        return ResponseEntity.ok("찜 목록에 추가되었습니다.");
    }

    @GetMapping("/wishlist")
    public ResponseEntity<List<PostWhat>> getWishlist(HttpSession session) {
        String clientId = (String) session.getAttribute("username");

        if (clientId == null) {
            return ResponseEntity.status(401).build();
        }

        List<PostWhat> wishlist = postService.getWishlistByClient(clientId);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/unlike/{postnum}")
    public ResponseEntity<?> unlikePost(@PathVariable Long postnum, HttpSession session) {
        String clientId = (String) session.getAttribute("username"); 

        System.out.println("unlike 요청 - clientId: " + clientId + ", postnum: " + postnum);

        if (clientId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        wishlist_client wishlist = new wishlist_client();
        wishlist.setClientId(clientId);
        wishlist.setPostnum(postnum);

        try {
            postService.removeFromWishlist(wishlist);
            return ResponseEntity.ok("찜 해제 완료");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("찜 해제 실패: " + e.getMessage());
        }
    }

    // 이미지 제공 API
    @GetMapping("/view/{fileName}")
    public ResponseEntity<byte[]> viewFile(@PathVariable String fileName) {
        Path filePath = Paths.get("C:/Portfolio").resolve(fileName).normalize();
        try {
            if (Files.exists(filePath) && Files.isReadable(filePath)) {
                byte[] fileContent = Files.readAllBytes(filePath);
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))//미디아파일하고 httpheaders 임포트 잘못됐을수도있따잉
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                        .body(fileContent);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}