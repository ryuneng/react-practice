package com.example.mallapi.service;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.mallapi.dto.PageRequestDTO;
import com.example.mallapi.dto.PageResponseDTO;
import com.example.mallapi.dto.TodoDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class TodoServiceTests {
    
    @Autowired
    private TodoService todoService;

    @Test
    public void testRegister() {

        TodoDTO todoDTO = TodoDTO.builder()
        .title("서비스 테스트")
        .writer("tester")
        .dueDate(LocalDate.of(2023,10,10))
        .build();

        Long tno = todoService.register(todoDTO);

        log.info("TNO: " + tno);

    }

    @Test
    public void testGet() {

        Long tno = 201L; // 실제 데이터베이스에 있는 값으로 테스트해야 함

        TodoDTO todoDTO = todoService.get(tno);

        log.info(todoDTO);
        
    }

    @Test
    public void testModify() {

        Long tno = 201L;

        TodoDTO todoDTO = TodoDTO.builder()
        .tno(tno)
        .title("수정된 제목")
        .dueDate(LocalDate.of(2024,06,02))
        .complete(true)
        .build();

        todoService.modify(todoDTO);
    }

    @Test
    public void testRemove() {

        Long tno = 201L;

        todoService.remove(tno);

    }

    @Test
    public void testList() {

        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                                        .page(2)
                                        .size(10)
                                        .build();

        PageResponseDTO<TodoDTO> response = todoService.list(pageRequestDTO);

        log.info(response);
    }
}
