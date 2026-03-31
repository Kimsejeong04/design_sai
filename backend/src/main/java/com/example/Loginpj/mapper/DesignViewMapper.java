package com.example.Loginpj.mapper;

import com.example.Loginpj.model.UserDesign;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DesignViewMapper {
	public List<UserDesign> getDesignsByUser(String username);
}
