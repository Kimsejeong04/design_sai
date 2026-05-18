package com.example.Loginpj.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // React 앱 주소
                .allowedMethods("*")
                .allowCredentials(true); // 세션 쿠키 포함
        
        registry.addMapping("/files/**")
                .allowedOrigins("http://localhost:3000") // React 앱 주소
                .allowedMethods("*")
                .allowCredentials(true); // 세션 쿠키 포함
        
        registry.addMapping("/**")
	        .allowedOrigins("http://localhost:3000")
	        .allowedMethods("GET", "POST", "PUT", "DELETE")
	        .allowCredentials(true);
	   }
    
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 브라우저에서 /images/어쩌구.png 로 요청이 오면
        // 실제 내 컴퓨터의 C:/capstone_images/ 폴더 안에서 파일을 찾아라!
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:///C:/capstone_images/");
    }
}
