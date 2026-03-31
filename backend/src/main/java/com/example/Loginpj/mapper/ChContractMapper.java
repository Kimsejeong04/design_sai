package com.example.Loginpj.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper

public interface ChContractMapper {
    void updateStatus(@Param("contractId") Long contractId, @Param("status") String status);
}
