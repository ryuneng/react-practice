package com.example.mallapi.service;

import org.springframework.transaction.annotation.Transactional;

import com.example.mallapi.dto.PageRequestDTO;
import com.example.mallapi.dto.PageResponseDTO;
import com.example.mallapi.dto.ProductDTO;

@Transactional
public interface ProductService {

    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    Long register(ProductDTO productDTO);

    ProductDTO get(Long pno);

    void modify(ProductDTO productDTO);

    void remove(Long pno);

}
