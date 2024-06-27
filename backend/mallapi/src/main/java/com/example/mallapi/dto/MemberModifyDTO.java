package com.example.mallapi.dto;

import lombok.Data;

// MemberDTO는 스프링 시큐리티와 관련된 생성자 함수가 존재하므로
// 컨트롤러에서 파라미터 수집 시 불편하기 때문에 별도의 MemberModifyDTO 생성
@Data
public class MemberModifyDTO {

    private String email;

    private String pw;

    private String nickname;

}
