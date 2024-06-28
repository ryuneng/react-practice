package com.example.mallapi.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mallapi.dto.CartItemDTO;
import com.example.mallapi.dto.CartItemListDTO;
import com.example.mallapi.service.CartService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    // @PreAuthorize를 통해 현재 로그인한 사용자의 이메일과 파라미터로 전달된 CartItemDTO의 이메일 주소가 같아야만 호출 가능
    // - 만일 두 이메일 정보가 일치하지 않는다면 접근 권한이 없는(Access Denied) 상황으로 처리됨
    @PreAuthorize("#itemDTO.email == authentication.name")
    @PostMapping("/change")
    public List<CartItemListDTO> changeCart(@RequestBody CartItemDTO itemDTO) {

        log.info(itemDTO);

        // 수량이 0보다 작다면 실제로는 삭제로 처리하고, 장바구니 아이템 목록 반환
        if (itemDTO.getQty() <= 0) {
            return cartService.remove(itemDTO.getCino());
        }

        return cartService.addOrModify(itemDTO);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/items")
    public List<CartItemListDTO> getCartItems(Principal principal) {

        String email = principal.getName(); // Principal을 이용해 현재 사용자의 정보에 접근
        log.info("---------------------------------------------------------");
        log.info("email: " + email);

        return cartService.getCartItems(email);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{cino}")
    public List<CartItemListDTO> removeFromCart(@PathVariable("cino") Long cino) {

        log.info("cart item no: " + cino);

        return cartService.remove(cino);
    }

}
