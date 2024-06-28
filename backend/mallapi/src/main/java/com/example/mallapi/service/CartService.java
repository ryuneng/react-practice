package com.example.mallapi.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.example.mallapi.dto.CartItemDTO;
import com.example.mallapi.dto.CartItemListDTO;

@Transactional
public interface CartService {

    // 메서드들의 리턴 타입이 모두 List<CartItemListDTO>인 이유는
    // 장바구니 아이템을 처리한 후에 화면에 새로 갱신해야 하는 장바구니 아이템들의 데이터가 필요하기 때문

    // 장바구니 아이템 추가 혹은 변경
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);

    // 모든 장바구니 아이템 목록
    public List<CartItemListDTO> getCartItems(String email);

    // 아이템 삭제
    public List<CartItemListDTO> remove(Long cino);

}
