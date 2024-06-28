package com.example.mallapi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemListDTO {

    private Long cino;

    private int qty;

    private Long pno;

    private String pname;

    private int price;

    private String imageFile;

    // JPQL을 이용해서 직접 DTO 객체를 생성하는 Projection 방식을 이용하기 위해 직접 생성자 정의
    public CartItemListDTO(Long cino, int qty, Long pno, String pname, int price, String imageFile) {
        this.cino = cino;
        this.qty = qty;
        this.pno = pno;
        this.pname = pname;
        this.price = price;
        this.imageFile = imageFile;
    }

}
