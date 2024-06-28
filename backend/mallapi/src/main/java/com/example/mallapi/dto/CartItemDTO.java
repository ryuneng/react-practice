package com.example.mallapi.dto;

import lombok.Data;

// CartItemDTO가 사용되는 상황
// 1) 사용자가 자신의 장바구니에 상품을 추가하는 경우 (사용자의 이메일, 추가하고 싶은 상품의 번호, 수량 데이터 전달)
// 2) 장바구니 아이템 목록에서 상품 수량을 조정하는 경우 (이미 만들어진 장바구니 아이템 번호, 변경하고자 하는 수량 데이터 전달)
@Data
public class CartItemDTO {

    private String email;

    private Long pno;

    private int qty;

    private Long cino;

}
