package com.example.mallapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.mallapi.domain.CartItem;
import com.example.mallapi.dto.CartItemListDTO;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("select " +
            "     new com.example.mallapi.dto.CartItemListDTO(ci.cino, ci.qty, p.pno, p.pname, p.price, pi.fileName)" +
            " from " +
            "     CartItem ci inner join Cart mc on ci.cart = mc " +
            "     left join Product p on ci.product = p " +
            "     left join p.imageList pi" +
            " where " +
            "     mc.owner.email = :email and pi.ord = 0 " +
            " order by ci desc")
    // JPQL Projection을 이용해서 직접 CartItemListDTO 타입의 객체 반환
    public List<CartItemListDTO> getItemsOfCartDTOByEmail(@Param("email") String email);

    @Query("select " +
            "     ci " +
            " from " +
            "     CartItem ci inner join Cart c on ci.cart = c " +
            " where " +
            "     c.owner.email = :email and ci.product.pno = :pno")
    public CartItem getItemOfPno(@Param("email") String email, @Param("pno") Long pno);

    @Query("select " +
            "     c.cno " +
            " from " +
            "     Cart c inner join CartItem ci on ci.cart = c " +
            " where " +
            "     ci.cino = :cino")
    public Long getCartFromItem(@Param("cino") Long cino);

    @Query("select new com.example.mallapi.dto.CartItemListDTO(ci.cino, ci.qty, p.pno, p.pname, p.price, pi.fileName )"
            +
            " from " +
            "     CartItem ci inner join Cart mc on ci.cart = mc " +
            "     left join Product p on ci.product = p " +
            "     left join p.imageList pi " +
            " where " +
            "     mc.cno = :cno and pi.ord = 0 " +
            " order by ci desc")
    // JPQL Projection을 이용해서 직접 CartItemListDTO 타입의 객체 반환
    public List<CartItemListDTO> getItemsOfCartDTOByCart(@Param("cno") Long cno);

}
