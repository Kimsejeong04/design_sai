package com.example.Loginpj.controller;

import com.example.Loginpj.model.User;
import com.example.Loginpj.service.UserService;
import com.example.Loginpj.session.SessionManager;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SessionManager sessionManager;
    
    private static final Path PROFILE_UPLOAD_DIR =
       Paths.get("C:/Portfolio/profile-images").toAbsolutePath().normalize();

    // 로그인 API (세션 저장)
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginUser, HttpSession session) {
        User user = userService.login(loginUser.getUsername(), loginUser.getPassword());

        if (user != null) {
            session.setAttribute("username", user.getUsername());
            session.setAttribute("usertype", user.getUsertype());
            session.setAttribute("name", user.getName()); 
            
            session.setMaxInactiveInterval(1800); // 30분 후에 세션 만료

            sessionManager.addSession(session);

            Map<String, String> response = new HashMap<>();
            response.put("message", "로그인 성공!");
            response.put("username", user.getUsername());
            response.put("usertype", user.getUsertype());
            response.put("name", user.getName());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    // 회원가입

    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> signup(
	        @RequestPart("user") User user,
	        @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
	
	
	System.out.println("========== 회원가입 API 진입 ==========");
    System.out.println("username: " + user.getUsername());
    System.out.println("프로필 사진 존재 여부: "
            + (profileImage != null && !profileImage.isEmpty()));
    
	    try {
	        System.out.println("회원가입 요청 데이터: " + user);
	
	        if (userService.isUsernameDuplicate(user.getUsername())) {
	            return ResponseEntity.badRequest()
	                    .body("{\"message\": \"아이디가 이미 존재합니다.\"}");
	        }
	
	        if (userService.isTelDuplicate(user.getTel())) {
	            return ResponseEntity.badRequest()
	                    .body("{\"message\": \"전화번호가 이미 존재합니다.\"}");
	        }
	
	        if (!userService.isValidPassword(user.getPassword())) {
	            return ResponseEntity.badRequest()
	                    .body("{\"message\": \"비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.\"}");
	        }
	
	        // 프로필 사진은 선택 사항
	        if (profileImage != null && !profileImage.isEmpty()) {
	
	            // 이미지 파일만 허용하고, 파일 크기는 5MB 이하로 제한
	            if (profileImage.getContentType() == null
	                    || !profileImage.getContentType().startsWith("image/")) {
	                return ResponseEntity.badRequest()
	                        .body("{\"message\": \"이미지 파일만 업로드할 수 있습니다.\"}");
	            }
	
	            if (profileImage.getSize() > 5 * 1024 * 1024) {
	                return ResponseEntity.badRequest()
	                        .body("{\"message\": \"프로필 사진은 5MB 이하만 가능합니다.\"}");
	            }
	
	            Files.createDirectories(PROFILE_UPLOAD_DIR);
	
	            // 원본 파일명을 사용하지 않고 고유한 이름 생성
	            String originalFilename = profileImage.getOriginalFilename();
	            String extension = "";
	
	            if (originalFilename != null) {
	                int dotIndex = originalFilename.lastIndexOf(".");
	                if (dotIndex >= 0) {
	                    extension = originalFilename.substring(dotIndex).toLowerCase();
	                }
	            }
	
	            String fileName = UUID.randomUUID() + extension;
	            Path filePath = PROFILE_UPLOAD_DIR.resolve(fileName).normalize();
	
	            // 지정된 업로드 폴더 내부에만 저장
	            if (!filePath.startsWith(PROFILE_UPLOAD_DIR.toAbsolutePath().normalize())) {
	                return ResponseEntity.badRequest()
	                        .body("{\"message\": \"잘못된 파일 경로입니다.\"}");
	            }
	
	            profileImage.transferTo(filePath.toFile());
	
	            // DB에는 실제 파일 경로가 아닌 조회용 URL을 저장
	            user.setProfileImageUrl("/api/profile-images/" + fileName);
	        }
	
	        boolean isCreated = userService.createUser(user);
	
	        if (isCreated) {
	            return ResponseEntity.ok()
	                    .body("{\"message\": \"회원가입 성공!\"}");
	        }
	
	        return ResponseEntity.status(500)
	                .body("{\"message\": \"회원가입 처리에 실패했습니다.\"}");
	
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(500)
	                .body("{\"message\": \"프로필 사진 저장에 실패했습니다.\"}");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(500)
	                .body("{\"message\": \"서버 오류가 발생했습니다.\"}");
	    }
	}

//    @PostMapping("/signup")
//    public ResponseEntity<String> signup(@RequestBody User user) {
//        try {
//            System.out.println("회원가입 요청 데이터: " + user);
//            
//            if(userService.isUsernameDuplicate(user.getUsername())) {
//            	return ResponseEntity.badRequest().body("{\"message\": \"아이디가 이미 존재합니다.\"}");
//            }
//            
//            if (userService.isTelDuplicate(user.getTel())) {
//                return ResponseEntity.badRequest().body("{\"message\": \"전화번호가 이미 존재합니다.\"}");
//            }
//            
//            if (!userService.isValidPassword(user.getPassword())) {
//                return ResponseEntity.badRequest().body("{\"message\": \"비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.\"}");
//            }
//            
//            boolean isCreated = userService.createUser(user);
//            if (isCreated) {
//                return ResponseEntity.ok().body("{\"message\": \"회원가입 성공!\"}");
//            } else {
//            	return ResponseEntity.status(500).body("{\"message\": \"회원가입 처리에 실패했습니다.\"}");
//            } 
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("{\"message\": \"서버 오류가 발생했습니다.\"}");
//        }
//    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session, HttpServletResponse response) {
        session.invalidate();

        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setMaxAge(0);  // 🔥 즉시 삭제
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.ok("로그아웃 성공!");
    }

    // 현재 로그인된 세션 정보
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUserSession(HttpSession session) {
        Map<String, Object> sessionData = new HashMap<>();
        session.getAttributeNames().asIterator().forEachRemaining(name ->
                sessionData.put(name, session.getAttribute(name))
        );

        if (sessionData.isEmpty()) {
            return ResponseEntity.status(401).body(null);
        }

        return ResponseEntity.ok(sessionData);
    }

    // 관리자용 - 모든 세션 조회
    @GetMapping("/all-sessions")
    public ResponseEntity<Map<String, Map<String, Object>>> getAllSessions() {
        Map<String, Map<String, Object>> allSessionsData = new HashMap<>();

        for (Map.Entry<String, HttpSession> entry : sessionManager.getActiveSessions().entrySet()) {
            HttpSession session = entry.getValue();
            Map<String, Object> sessionInfo = new HashMap<>();

            session.getAttributeNames().asIterator().forEachRemaining(name ->
                    sessionInfo.put(name, session.getAttribute(name))
            );

            allSessionsData.put(entry.getKey(), sessionInfo);
        }

        return ResponseEntity.ok(allSessionsData);
    }

    // 세션 존재 여부 확인
    @GetMapping("/checkSession")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String username = (String) session.getAttribute("username");
        System.out.println("세션에서 가져온 usernmae: " + username);

        if (username != null) {
            return ResponseEntity.ok(Map.of("username", username));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인 필요"));
        }
    }

    // 현재 로그인된 사용자 ID 조회
    @GetMapping("/current-user")
    public ResponseEntity<Map<String, String>> getCurrentUser(HttpSession session) {
        String username = (String) session.getAttribute("username");
        System.out.println("세션에서 가져온 username: " + username);

        Map<String, String> response = new HashMap<>();

        if (username != null) {
            response.put("username", username);
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "사용자 정보가 없습니다.");
            return ResponseEntity.status(401).body(response);
        }
    }
    

	@GetMapping("/profile-images/{fileName}")
	public ResponseEntity<Resource> getProfileImage(
	        @PathVariable String fileName) throws IOException {
	
	    // 파일명에 경로가 들어오는 것을 방지
	    if (!fileName.matches("[a-zA-Z0-9._-]+")) {
	        return ResponseEntity.badRequest().build();
	    }
	
	    Path filePath = PROFILE_UPLOAD_DIR.resolve(fileName).normalize();
	
	    if (!filePath.startsWith(PROFILE_UPLOAD_DIR)
	            || !Files.isRegularFile(filePath)) {
	        return ResponseEntity.notFound().build();
	    }
	
	    String contentType = Files.probeContentType(filePath);
	
	    if (contentType == null || !contentType.startsWith("image/")) {
	        return ResponseEntity.status(415).build();
	    }
	
	    Resource resource = new FileSystemResource(filePath);
	
	    return ResponseEntity.ok()
	            .contentType(MediaType.parseMediaType(contentType))
	            .header(HttpHeaders.CACHE_CONTROL, "public, max-age=86400")
	            .body(resource);
	}

}
