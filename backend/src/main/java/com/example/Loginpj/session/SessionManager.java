package com.example.Loginpj.session;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
public class SessionManager {

    // 현재 유지 중인 세션을 저장하는 Map
    private static final Map<String, HttpSession> activeSessions = Collections.synchronizedMap(new HashMap<>());

    // 🔥 로그인 성공한 세션만 저장하도록 변경
    public void addSession(HttpSession session) {
        activeSessions.put(session.getId(), session);
    }

    // 세션 삭제
    public void removeSession(HttpSession session) {
        activeSessions.remove(session.getId());
    }

    // 현재 모든 세션 반환
    public Map<String, HttpSession> getActiveSessions() {
        return activeSessions;
    }
}