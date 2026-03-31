package com.example.Loginpj.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.example.Loginpj.model.RequestMessage;

@Mapper
public interface RequestMessageMapper {
    
    List<RequestMessage> getMessagesByClientId(@Param("clientId") String clientId);

    void insertMessage(RequestMessage message); // 기존 직접 designerId 받는 방식

    RequestMessage getMessageById(@Param("id") Long id);

    // contractId로 designerId를 contracts에서 자동 조회하여 insert
    void insertMessageByContract(@Param("contractId") Long contractId,
                                 @Param("clientId") String clientId,
                                 @Param("content") String content);
}
